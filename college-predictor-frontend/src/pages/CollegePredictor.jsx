import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { collegeAPI, collegeListAPI } from "../services/api";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  PlusIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function CollegePredictor() {
  // Form state
  const [percentile, setPercentile] = useState("");
  const [branch, setBranch] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [collegeType, setCollegeType] = useState("All Types");

  // Results state
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalColleges, setTotalColleges] = useState(0);

  // UI state
  const [showFilters, setShowFilters] = useState(true);
  const [addedColleges, setAddedColleges] = useState(new Set());
  const [addingCollege, setAddingCollege] = useState(null);

  // Available options
  const branches = [
    "Any",
    "Computer Science and Engineering",
    "Computer Engineering",
    "Information Technology",
    "Electronics and Telecommunication Engineering",
    "Electronics and Communication Engineering",
    "Electronics Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Artificial Intelligence and Data Science",
    "Data Science",
    "Bio Technology",
    "Instrumentation Engineering",
    "Instrumentation and Control Engineering",
    "Automobile Engineering",
    "Aeronautical Engineering",
    "Production Engineering",
    "Industrial Engineering",
    "Textile Engineering",
    "Mining Engineering",
    "Metallurgical Engineering",
    "Bio Medical Engineering",
    "Petro Chemical Engineering",
    "Robotics Engineering",
    "Automation and Robotics",
  ];

  const categories = [
    "OPEN",
    "SC",
    "ST",
    "VJ",
    "NT1",
    "NT2",
    "NT3",
    "OBC",
    "EWS",
    "TFWS",
  ];

  const collegeTypes = [
    "All Types",
    "Government",
    "Private",
    "Government Aided",
    "Non-Autonomous",
  ];

  // Helper function to convert ObjectId to string
  const getCollegeIdString = (college) => {
    console.log("Getting college ID from:", college);
    
    // Handle both _id and code fields
    if (college.code) {
      console.log("Using college.code:", college.code);
      return String(college.code);
    }
    if (college._id) {
      console.log("Using college._id:", college._id);
      if (typeof college._id === "object" && college._id !== null) {
        return college._id.toString();
      }
      return String(college._id);
    }
    console.error("College object missing both _id and code:", college);
    return null;
  };

  // Load user's college list to mark already added colleges
  useEffect(() => {
    loadUserCollegeList();
  }, []);

  const loadUserCollegeList = async () => {
    try {
      const data = await collegeListAPI.getCollegeList();
      const addedSet = new Set();
      data.colleges.forEach((item) => {
        const collegeIdStr = getCollegeIdString(item.college);
        addedSet.add(`${collegeIdStr}-${item.branch}`);
      });
      setAddedColleges(addedSet);
    } catch (error) {
      console.error("Error loading college list:", error);
    }
  };

  const handlePredict = async (page = 1) => {
    // Validation
    if (!percentile || !branch || !category) {
      toast.error("Please fill in Percentile, Branch, and Category fields");
      return;
    }

    if (percentile < 0 || percentile > 100) {
      toast.error("Percentile must be between 0 and 100");
      return;
    }

    setSearching(true);
    setLoading(true);

    try {
      const predictionData = {
        percentile: parseFloat(percentile),
        branch,
        category,
        city: city.trim(),
        collegeType: collegeType === "All Types" ? "" : collegeType,
      };

      const data = await collegeAPI.predictColleges(predictionData, page, 15);

      setColleges(data.colleges);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalColleges(data.totalColleges);
      setHasSearched(true);

      if (data.colleges.length === 0) {
        toast.info("No colleges found matching your criteria");
      } else {
        toast.success(
          `Found ${data.totalColleges} college${
            data.totalColleges !== 1 ? "s" : ""
          } matching your criteria!`,
          {
            autoClose: 2000,
            hideProgressBar: true,
          }
        );
      }
    } catch (error) {
      console.error("Error predicting colleges:", error);
      toast.error(error || "Failed to predict colleges");
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    handlePredict(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToList = async (college, branchName, cutoffPercentile) => {
    // Convert ObjectId to string if needed
    const collegeIdString = getCollegeIdString(college);
    const key = `${collegeIdString}-${branchName}`;

    console.log("Adding college to list:", {
      collegeId: collegeIdString,
      branch: branchName,
      category: category,
      cutoffPercentile: cutoffPercentile,
    });

    if (addedColleges.has(key)) {
      toast.info("This college is already in your list");
      return;
    }

    setAddingCollege(key);

    try {
      console.log("Sending add request with data:", {
        collegeId: collegeIdString,
        branch: branchName,
        category: category,
        cutoffPercentile: cutoffPercentile,
      });

      const response = await collegeListAPI.addCollegeToList({
        collegeId: collegeIdString,
        branch: branchName,
        category: category,
        cutoffPercentile: cutoffPercentile,
      });

      console.log("Add college response:", response);

      setAddedColleges((prev) => new Set([...prev, key]));

      toast.success("College added to your list!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error("Error adding college:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      toast.error(error.message || "Failed to add college to list");
    } finally {
      setTimeout(() => setAddingCollege(null), 500);
    }
  };

  const getCutoffForCategory = (branch, selectedCategory) => {
    const cutoff = branch.cutoffs[selectedCategory];
    if (cutoff === undefined || cutoff === null) return null;

    if (typeof cutoff === "object") {
      if (cutoff.$numberDouble) return parseFloat(cutoff.$numberDouble);
      if (cutoff.$numberInt) return parseInt(cutoff.$numberInt);
    }
    return parseFloat(cutoff);
  };

  const getMatchingBranches = (college) => {
    if (branch === "Any") {
      return college.branches;
    }

    return college.branches.filter((b) => {
      const normalizedBranchName = b.branchName.toLowerCase().trim();
      const normalizedUserBranch = branch.toLowerCase().trim();
      return (
        normalizedBranchName === normalizedUserBranch ||
        normalizedBranchName.includes(normalizedUserBranch) ||
        normalizedUserBranch.includes(normalizedBranchName)
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <SparklesIcon className="h-12 w-12 text-indigo-600 animate-pulse" />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
            College Predictor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the best engineering colleges based on your JEE Main percentile
            and preferences
          </p>
        </div>

        {/* Prediction Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <AdjustmentsHorizontalIcon className="h-7 w-7 mr-2 text-indigo-600" />
              Your Preferences
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {showFilters ? "Hide" : "Show"} Filters
            </button>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
              showFilters ? "block" : "hidden lg:grid"
            }`}
          >
            {/* Percentile */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                JEE Main Percentile <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={percentile}
                onChange={(e) => setPercentile(e.target.value)}
                placeholder="e.g., 95.5"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Preferred Branch <span className="text-red-500">*</span>
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              >
                <option value="">Select Branch</option>
                {branches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* City (Optional) */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                City (Optional)
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g., Mumbai, Pune"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
            </div>

            {/* College Type */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                College Type
              </label>
              <select
                value={collegeType}
                onChange={(e) => setCollegeType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              >
                {collegeTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="space-y-2 flex items-end">
              <button
                onClick={() => handlePredict(1)}
                disabled={searching}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center shadow-lg"
              >
                {searching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                    Predict Colleges
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {loading && !searching && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading colleges...</p>
            </div>
          </div>
        )}

        {!loading && hasSearched && colleges.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <MagnifyingGlassIcon className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Colleges Found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or percentile to see more results
            </p>
          </div>
        )}

        {!loading && colleges.length > 0 && (
          <>
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Matching Colleges
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Found {totalColleges} college
                    {totalColleges !== 1 ? "s" : ""} for your criteria
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </p>
                </div>
              </div>
            </div>

            {/* College Cards */}
            <div className="space-y-6">
              {colleges.map((college, index) => {
                const matchingBranches = getMatchingBranches(college);

                return (
                  <div
                    key={college._id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    {/* College Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold mb-2">
                            {college.name}
                          </h4>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center">
                              <MapPinIcon className="h-4 w-4 mr-1" />
                              {college.location.city}, {college.location.state}
                            </div>
                            <div className="flex items-center">
                              <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                              {college.type}
                            </div>
                            <div className="flex items-center">
                              <AcademicCapIcon className="h-4 w-4 mr-1" />
                              {college.autonomyStatus}
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <p className="text-xs font-medium">Code</p>
                          <p className="text-lg font-bold">{college.code}</p>
                        </div>
                      </div>
                    </div>

                    {/* Branches */}
                    <div className="p-6">
                      <h5 className="text-lg font-bold text-gray-900 mb-4">
                        Available Branches
                      </h5>
                      <div className="space-y-3">
                        {matchingBranches.map((branchItem, branchIndex) => {
                          const cutoff = getCutoffForCategory(
                            branchItem,
                            category
                          );
                          // Convert ObjectId to string for consistent key generation
                          const collegeIdStr = getCollegeIdString(college);
                          const key = `${collegeIdStr}-${branchItem.branchName}`;
                          const isAdded = addedColleges.has(key);
                          const isAdding = addingCollege === key;

                          return (
                            <div
                              key={branchIndex}
                              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 border border-gray-200"
                            >
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">
                                  {branchItem.branchName}
                                </p>
                                {cutoff !== null ? (
                                  <p className="text-sm text-gray-600 mt-1">
                                    Cutoff Percentile ({category}):{" "}
                                    <span className="font-bold text-indigo-600">
                                      {cutoff.toFixed(2)}
                                    </span>
                                  </p>
                                ) : (
                                  <p className="text-sm text-gray-500 mt-1">
                                    Cutoff not available for {category}
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() =>
                                  handleAddToList(
                                    college,
                                    branchItem.branchName,
                                    cutoff
                                  )
                                }
                                disabled={isAdded || isAdding}
                                className={`ml-4 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                  isAdded
                                    ? "bg-green-100 text-green-700 cursor-default"
                                    : isAdding
                                    ? "bg-indigo-400 text-white scale-95"
                                    : "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95 focus:ring-indigo-500 shadow-md hover:shadow-lg"
                                }`}
                              >
                                {isAdding ? (
                                  <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Adding...
                                  </div>
                                ) : isAdded ? (
                                  <div className="flex items-center">
                                    <CheckIcon className="h-5 w-5 mr-1" />
                                    Added
                                  </div>
                                ) : (
                                  <div className="flex items-center">
                                    <PlusIcon className="h-5 w-5 mr-1" />
                                    Add to List
                                  </div>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
                >
                  <ChevronLeftIcon className="h-5 w-5 mr-1" />
                  Previous
                </button>

                <div className="flex items-center space-x-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                            currentPage === page
                              ? "bg-indigo-600 text-white shadow-lg"
                              : "bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="px-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-white border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
                >
                  Next
                  <ChevronRightIcon className="h-5 w-5 ml-1" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Initial State */}
        {!hasSearched && !loading && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-indigo-600 mb-4">
              <SparklesIcon className="h-20 w-20 mx-auto animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Ready to Find Your Dream College?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Enter your JEE Main percentile and preferences above to discover
              colleges that match your profile
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                Accurate Predictions
              </div>
              <div className="flex items-center">
                <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                Real Cutoff Data
              </div>
              <div className="flex items-center">
                <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                Easy to Use
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
