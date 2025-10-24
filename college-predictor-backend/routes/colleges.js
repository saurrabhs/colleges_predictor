// routes/colleges.js
const express = require("express");
const router = express.Router();
const College = require("../models/College");

// Branch normalization mapping
const branchMappings = {
  // Computer Science related branches
  'computer': 'Computer Engineering',
  'computer engineering': 'Computer Engineering',
  'computer science': 'Computer Science and Engineering',
  'computer science and engineering': 'Computer Science and Engineering',
  'computer science & engineering': 'Computer Science and Engineering',
  'cse': 'Computer Science and Engineering',
  'cs': 'Computer Science and Engineering',
  'comp': 'Computer Engineering',
  
  // Information Technology
  'information technology': 'Information Technology',
  'it': 'Information Technology',
  
  // Electronics related branches
  'electronics': 'Electronics Engineering',
  'electronics engineering': 'Electronics Engineering',
  'electronics and telecommunication': 'Electronics and Telecommunication Engineering',
  'electronics and telecommunication engineering': 'Electronics and Telecommunication Engineering',
  'ece': 'Electronics and Communication Engineering',
  'electronics and communication': 'Electronics and Communication Engineering',
  'electronics and communication engineering': 'Electronics and Communication Engineering',
  'extc': 'Electronics and Telecommunication Engineering',
  
  // Electrical
  'electrical': 'Electrical Engineering',
  'electrical engineering': 'Electrical Engineering',
  
  // Mechanical
  'mechanical': 'Mechanical Engineering',
  'mechanical engineering': 'Mechanical Engineering',
  
  // Civil
  'civil': 'Civil Engineering',
  'civil engineering': 'Civil Engineering',
  
  // Chemical
  'chemical': 'Chemical Engineering',
  'chemical engineering': 'Chemical Engineering',
  
  // Artificial Intelligence and related
  'artificial intelligence': 'Artificial Intelligence and Data Science',
  'ai': 'Artificial Intelligence and Data Science',
  'artificial intelligence and data science': 'Artificial Intelligence and Data Science',
  'ai and data science': 'Artificial Intelligence and Data Science',
  'ai & data science': 'Artificial Intelligence and Data Science',
  'data science': 'Data Science',
  
  // Biotechnology
  'bio technology': 'Bio Technology',
  'biotechnology': 'Bio Technology',
  
  // Instrumentation
  'instrumentation': 'Instrumentation Engineering',
  'instrumentation engineering': 'Instrumentation Engineering',
  'instrumentation and control': 'Instrumentation and Control Engineering',
  'instrumentation and control engineering': 'Instrumentation and Control Engineering',
  
  // Automobile
  'automobile': 'Automobile Engineering',
  'automobile engineering': 'Automobile Engineering',
  
  // Aeronautical
  'aeronautical': 'Aeronautical Engineering',
  'aeronautical engineering': 'Aeronautical Engineering',
  
  // Production
  'production': 'Production Engineering',
  'production engineering': 'Production Engineering',
  
  // Industrial
  'industrial': 'Industrial Engineering',
  'industrial engineering': 'Industrial Engineering',
  
  // Textile
  'textile': 'Textile Engineering',
  'textile engineering': 'Textile Engineering',
  
  // Mining
  'mining': 'Mining Engineering',
  'mining engineering': 'Mining Engineering',
  
  // Metallurgy
  'metallurgy': 'Metallurgical Engineering',
  'metallurgical': 'Metallurgical Engineering',
  'metallurgical engineering': 'Metallurgical Engineering',
  
  // Biomedical
  'biomedical': 'Bio Medical Engineering',
  'bio medical': 'Bio Medical Engineering',
  'bio medical engineering': 'Bio Medical Engineering',
  'biomedical engineering': 'Bio Medical Engineering',
  
  // Chemical related
  'petro chemical': 'Petro Chemical Engineering',
  'petro chemical engineering': 'Petro Chemical Engineering',
  
  // Robotics
  'robotics': 'Robotics Engineering',
  'automation and robotics': 'Automation and Robotics'
};

function normalizeBranchName(branchName) {
  if (!branchName) return 'Unknown';
  
  // Convert to lowercase for comparison
  const lowerBranch = branchName.toLowerCase().trim();
  
  // Check for exact matches first
  for (const [key, value] of Object.entries(branchMappings)) {
    if (lowerBranch.includes(key)) {
      return value;
    }
  }
  
  // If no match found, return the original name
  return branchName;
}

// Get all colleges with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;
    
    const colleges = await College.find({}).skip(skip).limit(limit).lean(); // Use lean() for plain JS objects
    const totalColleges = await College.countDocuments({});
    
    res.json({
      colleges,
      currentPage: page,
      totalPages: Math.ceil(totalColleges / limit),
      totalColleges,
      hasNextPage: page < Math.ceil(totalColleges / limit),
      hasPrevPage: page > 1
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching colleges", error: error.message });
  }
});

// Get colleges based on prediction criteria with pagination
router.post("/predict", async (req, res) => {
  try {
    const { percentile, branch, category, city, collegeType, page = 1, limit = 15 } = req.body;
    const skip = (page - 1) * limit;
    
    // Build query based on provided criteria
    let query = {};
    
    // Filter by city if provided
    if (city) {
      query["location.city"] = new RegExp(city, 'i'); // Case insensitive match
    }
    
    // Filter by college type if provided and not "All Types"
    if (collegeType && collegeType !== "All Types") {
      query["type"] = collegeType;
    }
    
    // Find colleges based on query
    const allColleges = await College.find(query).lean(); // Use lean() for plain JS objects
    
    // If "Any" branch is selected, return all colleges that match other criteria
    if (branch === "Any") {
      // Apply pagination to all matching colleges
      const paginatedColleges = allColleges.slice(skip, skip + limit);
      
      res.json({
        colleges: paginatedColleges,
        currentPage: page,
        totalPages: Math.ceil(allColleges.length / limit),
        totalColleges: allColleges.length,
        hasNextPage: page < Math.ceil(allColleges.length / limit),
        hasPrevPage: page > 1
      });
      return;
    }
    
    // Normalize the user's branch preference
    const normalizedUserBranch = normalizeBranchName(branch);
    
    // Filter colleges based on percentile and other criteria
    const matchingColleges = allColleges.filter(college => {
      // Check if the college has a branch that matches the user's normalized preference
      const matchingBranches = college.branches.filter(b => {
        // Normalize the college branch name for comparison
        const normalizedCollegeBranch = normalizeBranchName(b.branchName);
        return normalizedCollegeBranch === normalizedUserBranch;
      });
      
      // If no matching branches found, exclude this college
      if (matchingBranches.length === 0) return false;
      
      // Check if the user's percentile meets the cutoff for their category in any matching branch
      let hasMatchingBranch = false;
      matchingBranches.forEach(b => {
        if (percentile && category) {
          const cutoff = b.cutoffs[category.toUpperCase()];
          if (cutoff !== undefined && cutoff !== null) {
            // Convert cutoff to number for comparison
            let cutoffValue = 0;
            if (typeof cutoff === 'object') {
              if (cutoff.$numberDouble) {
                cutoffValue = parseFloat(cutoff.$numberDouble);
              } else if (cutoff.$numberInt) {
                cutoffValue = parseInt(cutoff.$numberInt);
              }
            } else {
              cutoffValue = parseFloat(cutoff);
            }
            
            // User's percentile should be >= cutoff percentile
            if (parseFloat(percentile) >= cutoffValue) {
              hasMatchingBranch = true;
            }
          } else {
            // If no cutoff for this category, include the branch (assume user qualifies)
            hasMatchingBranch = true;
          }
        } else {
          // If no percentile/category provided, include all branches
          hasMatchingBranch = true;
        }
      });
      
      // Only include colleges that have at least one matching branch that meets cutoff criteria
      return hasMatchingBranch;
    });
    
    // Apply pagination to the filtered results
    const paginatedColleges = matchingColleges.slice(skip, skip + limit);
    
    res.json({
      colleges: paginatedColleges,
      currentPage: page,
      totalPages: Math.ceil(matchingColleges.length / limit),
      totalColleges: matchingColleges.length,
      hasNextPage: page < Math.ceil(matchingColleges.length / limit),
      hasPrevPage: page > 1
    });
  } catch (error) {
    res.status(500).json({ message: "Error predicting colleges", error: error.message });
  }
});

// Get college by ID
router.get("/:id", async (req, res) => {
  try {
    const college = await College.findById(req.params.id).lean(); // Use lean() for plain JS objects
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }
    res.json(college);
  } catch (error) {
    res.status(500).json({ message: "Error fetching college", error: error.message });
  }
});

// Add a new college (for admin purposes)
router.post("/", async (req, res) => {
  try {
    const college = new College(req.body);
    await college.save();
    res.status(201).json(college);
  } catch (error) {
    res.status(400).json({ message: "Error creating college", error: error.message });
  }
});

module.exports = router;