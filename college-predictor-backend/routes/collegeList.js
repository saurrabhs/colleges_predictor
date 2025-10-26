const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const CollegeList = require("../models/CollegeList");
const College = require("../models/College");
const mongoose = require("mongoose");

// Helper function to populate college data
async function populateCollegeData(collegeList) {
  if (
    !collegeList ||
    !collegeList.colleges ||
    collegeList.colleges.length === 0
  ) {
    return collegeList;
  }

  const populatedColleges = [];

  for (let i = 0; i < collegeList.colleges.length; i++) {
    const entry = collegeList.colleges[i];
    // Get the college ID as string
    const collegeId =
      typeof entry.college === "object"
        ? entry.college.toString()
        : entry.college;

    // Fetch college data using code field (since colleges use code as unique identifier)
    const college = await College.findOne({ code: collegeId });

    if (college) {
      populatedColleges.push({
        college: {
          _id: college._id,
          code: college.code,
          name: college.name,
          location: college.location,
          type: college.type,
        },
        branch: entry.branch,
        rank: entry.rank,
        cutoffPercentile: entry.cutoffPercentile,
        category: entry.category,
        addedAt: entry.addedAt,
      });
    } else {
      // If college not found, keep the original entry
      populatedColleges.push({
        college: entry.college,
        branch: entry.branch,
        rank: entry.rank,
        cutoffPercentile: entry.cutoffPercentile,
        category: entry.category,
        addedAt: entry.addedAt,
      });
    }
  }

  return {
    _id: collegeList._id,
    user: collegeList.user,
    colleges: populatedColleges,
    createdAt: collegeList.createdAt,
    updatedAt: collegeList.updatedAt,
  };
}

// Get user's college list
router.get("/", auth, async (req, res) => {
  try {
    console.log("Get college list request for user:", req.user.userId);

    let collegeList = await CollegeList.findOne({ user: req.user.userId });

    if (!collegeList) {
      console.log(
        "No college list found, creating new one for user:",
        req.user.userId
      );
      // Create an empty list if it doesn't exist
      collegeList = new CollegeList({
        user: req.user.userId,
        colleges: [],
      });
      await collegeList.save();
    }

    // Populate college data
    const populatedList = await populateCollegeData(collegeList);

    console.log(
      "College list retrieved:",
      JSON.stringify(populatedList, null, 2)
    );
    res.json(populatedList);
  } catch (error) {
    console.error("Error fetching college list:", error);
    res
      .status(500)
      .json({ message: "Error fetching college list", error: error.message });
  }
});

// Add college to user's list
router.post("/add", auth, async (req, res) => {
  try {
    const { collegeId, branch, cutoffPercentile, category } = req.body;

    console.log("Add college request:", {
      collegeId,
      branch,
      cutoffPercentile,
      category,
      userId: req.user.userId,
    });

    // Validate college exists using code field
    const college = await College.findOne({ code: collegeId });
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // Find or create user's college list
    let collegeList = await CollegeList.findOne({ user: req.user.userId });

    if (!collegeList) {
      console.log(
        "No college list found, creating new one for user:",
        req.user.userId
      );
      collegeList = new CollegeList({
        user: req.user.userId,
        colleges: [],
      });
    }

    // Check if college with this branch is already in the list
    const existingEntry = collegeList.colleges.find(
      (entry) => entry.college === collegeId && entry.branch === branch
    );

    if (existingEntry) {
      return res
        .status(400)
        .json({ message: "College with this branch is already in your list" });
    }

    // Add college to list with next rank
    const rank = collegeList.colleges.length + 1;
    collegeList.colleges.push({
      college: collegeId,
      branch,
      rank,
      cutoffPercentile,
      category,
    });

    await collegeList.save();

    // Populate college data for response
    const populatedList = await populateCollegeData(collegeList);

    res.json(populatedList);
  } catch (error) {
    console.error("Error adding college to list - Full error:", error);
    console.error("Error stack:", error.stack);
    res
      .status(500)
      .json({ message: "Error adding college to list", error: error.message });
  }
});

// Remove college from user's list
router.delete("/remove/:collegeId/:branch", auth, async (req, res) => {
  try {
    const { collegeId, branch } = req.params;

    const collegeList = await CollegeList.findOne({ user: req.user.userId });

    if (!collegeList) {
      return res.status(404).json({ message: "College list not found" });
    }

    // Find the entry to remove
    const entryIndex = collegeList.colleges.findIndex(
      (entry) => entry.college === collegeId && entry.branch === branch
    );

    if (entryIndex === -1) {
      return res
        .status(404)
        .json({ message: "College not found in your list" });
    }

    // Remove the entry
    collegeList.colleges.splice(entryIndex, 1);

    // Re-rank the remaining colleges
    collegeList.colleges.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    await collegeList.save();

    // Populate college data for response
    const populatedList = await populateCollegeData(collegeList);

    res.json(populatedList);
  } catch (error) {
    console.error("Error removing college from list:", error);
    res.status(500).json({
      message: "Error removing college from list",
      error: error.message,
    });
  }
});

// Update college ranking
router.put("/rank", auth, async (req, res) => {
  try {
    const { collegeId, branch, newRank } = req.body;

    console.log("Update rank request:", {
      collegeId,
      branch,
      newRank,
      userId: req.user.userId,
    });

    const collegeList = await CollegeList.findOne({ user: req.user.userId });

    if (!collegeList) {
      return res.status(404).json({ message: "College list not found" });
    }

    // Find the entry to update
    // Convert collegeId to string for comparison since it's stored as string in DB
    const entryIndex = collegeList.colleges.findIndex((entry) => {
      const entryCollegeId =
        typeof entry.college === "object"
          ? entry.college.toString()
          : entry.college;
      return entryCollegeId === collegeId.toString() && entry.branch === branch;
    });

    console.log("Entry index found:", entryIndex);
    console.log(
      "College list entries:",
      collegeList.colleges.map((e) => ({
        college:
          typeof e.college === "object" ? e.college.toString() : e.college,
        branch: e.branch,
      }))
    );

    if (entryIndex === -1) {
      return res
        .status(404)
        .json({ message: "College not found in your list" });
    }

    const oldRank = collegeList.colleges[entryIndex].rank;
    const actualNewRank = Math.max(
      1,
      Math.min(newRank, collegeList.colleges.length)
    );

    console.log("Old rank:", oldRank, "New rank:", actualNewRank);

    // If the rank is the same, no need to update
    if (oldRank === actualNewRank) {
      const populatedList = await populateCollegeData(collegeList);
      return res.json(populatedList);
    }

    // Create a new array with the item moved to the new position
    const newColleges = [...collegeList.colleges];
    
    // Remove the item from its current position
    const [movedItem] = newColleges.splice(entryIndex, 1);
    
    // Insert it at the new position (actualNewRank - 1 because array is 0-indexed)
    newColleges.splice(actualNewRank - 1, 0, movedItem);
    
    // Update all ranks based on new positions
    newColleges.forEach((entry, index) => {
      entry.rank = index + 1;
    });
    
    // Update the college list
    collegeList.colleges = newColleges;
    await collegeList.save();

    // Populate college data for response
    const populatedList = await populateCollegeData(collegeList);

    console.log(
      "Updated college list:",
      JSON.stringify(populatedList, null, 2)
    );
    res.json(populatedList);
  } catch (error) {
    console.error("Error updating college rank:", error);
    res
      .status(500)
      .json({ message: "Error updating college rank", error: error.message });
  }
});

// Clear entire college list
router.delete("/clear", auth, async (req, res) => {
  try {
    const collegeList = await CollegeList.findOne({ user: req.user.userId });

    if (!collegeList) {
      return res.status(404).json({ message: "College list not found" });
    }

    collegeList.colleges = [];
    await collegeList.save();

    res.json({ message: "College list cleared successfully" });
  } catch (error) {
    console.error("Error clearing college list:", error);
    res
      .status(500)
      .json({ message: "Error clearing college list", error: error.message });
  }
});

module.exports = router;
