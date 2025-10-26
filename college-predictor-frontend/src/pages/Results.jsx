import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  PlusIcon,
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { collegeAPI, collegeListAPI } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

// Normalized branch mappings (same as Predict.jsx)
const normalizedBranches = [
  'Computer Engineering',
  'Computer Science and Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Information Technology',
  'Artificial Intelligence and Data Science',
  'Chemical Engineering',
  'Instrumentation Engineering',
  'Food Technology',
  'Textile Engineering',
  'Automobile Engineering',
  'Data Science',
  'Bio Technology',
  'Bio Medical Engineering',
  'Industrial Engineering',
  'Aeronautical Engineering',
  'Production Engineering',
  'Mining Engineering',
  'Polymer Engineering',
  'Paper and Pulp Technology',
  'Surface Coating Technology',
  'Plastic Technology',
  'Oil Fats and Waxes Technology',
  'Internet of Things (IoT)',
  'Agricultural Engineering',
  'Data Engineering',
  'Fire Engineering',
  'Dyestuff Technology',
  'Pharmaceuticals Chemistry and Technology',
  'Food Engineering and Technology',
  'Structural Engineering',
  'VLSI',
  '5G',
  'Plastic and Polymer Technology',
  'Oil Technology',
  'Fashion Technology',
  'Manufacturing Science and Engineering',
  'Metallurgical Engineering',
  'Printing Technology'
];

const collegeTypes = [
  'All Types',
  'Government',
  'Government Aided',
  'Private'
];

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const initialPredictionData = location.state?.predictionData;
  const initialPredictionResult = location.state?.predictionResult;
  const initialFilterMode = location.state?.filterMode || 'percentile';
  
  // Editable form data for filters
  const [formData, setFormData] = useState(
    initialPredictionData || {
      percentile: '',
      branch: 'Any',
      category: 'OPEN',
      city: '',
      collegeType: 'All Types',
      cutoffRangeMin: '',
      cutoffRangeMax: ''
    }
  );
  
  const [predictionResult, setPredictionResult] = useState(
    initialPredictionResult
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cities, setCities] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [savedColleges, setSavedColleges] = useState([]);
  const [loadingSavedList, setLoadingSavedList] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [filterMode, setFilterMode] = useState(initialFilterMode);

  // Handle filter mode change and clear opposite mode's values
  const handleFilterModeChange = (mode) => {
    setFilterMode(mode);
    if (mode === 'percentile') {
      // Clear range values when switching to percentile mode
      setFormData(prev => ({
        ...prev,
        cutoffRangeMin: '',
        cutoffRangeMax: ''
      }));
    } else {
      // Clear percentile when switching to range mode
      setFormData(prev => ({
        ...prev,
        percentile: ''
      }));
    }
  };

  // Fetch unique cities from the backend
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await collegeAPI.getAllColleges(1, 1000);
        const citySet = new Set();
        
        data.colleges.forEach(college => {
          if (college.location && college.location.city) {
            citySet.add(college.location.city);
          }
        });
        
        setCities(Array.from(citySet).sort());
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    
    fetchCities();
  }, []);

  // Fetch user's saved college list to check which are already added (only if authenticated)
  useEffect(() => {
    if (!isAuthenticated) {
      setLoadingSavedList(false);
      return;
    }
    
    const fetchSavedColleges = async () => {
      try {
        setLoadingSavedList(true);
        const data = await collegeListAPI.getCollegeList();
        console.log('[Results] Fetched saved colleges:', data);
        setSavedColleges(data.colleges || []);
      } catch (error) {
        console.error('Error fetching saved colleges:', error);
      } finally {
        setLoadingSavedList(false);
      }
    };
    
    fetchSavedColleges();
  }, [isAuthenticated]);

  // Fetch paginated results when page changes
  const fetchPredictionResults = async (page = 1, searchData = formData) => {
    // Validate based on filter mode
    if (filterMode === 'percentile' && !searchData?.percentile) {
      return; // Need percentile in percentile mode
    }
    if (filterMode === 'range' && (!searchData?.cutoffRangeMin || !searchData?.cutoffRangeMax)) {
      return; // Need range values in range mode
    }

    setLoading(true);
    setError(null);
    try {
      const result = await collegeAPI.predictColleges(searchData, page, 15);
      setPredictionResult(result);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message || "Failed to fetch prediction results");
      toast.error(err.message || "Failed to fetch results");
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  // Fetch results when page changes (but not on initial mount)
  useEffect(() => {
    // Skip the initial render when we already have predictionResult from location.state
    if (currentPage !== 1) {
      // Check if we have the required data based on mode
      const hasRequiredData = filterMode === 'percentile' 
        ? formData?.percentile 
        : (formData?.cutoffRangeMin && formData?.cutoffRangeMax);
      
      if (hasRequiredData) {
        fetchPredictionResults(currentPage, formData);
      }
    }
  }, [currentPage]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle search/filter update
  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Validate based on filter mode
    if (filterMode === 'percentile' && !formData.percentile) {
      toast.warning('Please enter a percentile');
      return;
    }
    
    if (filterMode === 'range') {
      if (!formData.cutoffRangeMin || !formData.cutoffRangeMax) {
        toast.error('Please enter both minimum and maximum cutoff');
        return;
      }
      const min = parseFloat(formData.cutoffRangeMin);
      const max = parseFloat(formData.cutoffRangeMax);
      if (min > max) {
        toast.error('Minimum cutoff cannot be greater than maximum cutoff');
        return;
      }
    }
    
    setIsSearching(true);
    toast.info('Searching for colleges with new criteria...');
    
    // Prepare data based on filter mode
    const searchData = { ...formData };
    if (filterMode === 'percentile') {
      searchData.cutoffRangeMin = '';
      searchData.cutoffRangeMax = '';
    } else {
      searchData.percentile = '100';
    }
    
    await fetchPredictionResults(1, searchData);
  };

  const handleAddToList = async (college, branch) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    try {
      // Get cutoff value for the branch
      const cutoffValue = getCutoffValue(
        branch.cutoffs,
        formData.category
      );

      // Use college.code as the identifier (backend uses code, not _id)
      const collegeCode = college.code;

      // Log the data being sent
      console.log("Adding to list:", {
        collegeId: collegeCode,
        branch: branch.branchName,
        cutoffPercentile: parseFloat(cutoffValue),
        category: formData.category,
      });

      const result = await collegeListAPI.addCollegeToList({
        collegeId: collegeCode,
        branch: branch.branchName,
        cutoffPercentile: parseFloat(cutoffValue),
        category: formData.category,
      });

      console.log("Add to list result:", result);
      toast.success(
        `${college.name} - ${branch.branchName} has been added to your list!`
      );
      
      // Refresh saved colleges list to update UI
      const updatedList = await collegeListAPI.getCollegeList();
      setSavedColleges(updatedList.colleges || []);
    } catch (err) {
      console.error("Add to list error:", err);
      if (err.message && err.message.includes("already in your list")) {
        toast.info("This college is already in your list");
      } else {
        toast.error(err.message || "Failed to add college to list");
      }
    }
  };

  // Helper function to check if a college-branch combination is already in the saved list
  const isAlreadyAdded = (college, branchName) => {
    if (!savedColleges || savedColleges.length === 0) {
      return false;
    }
    
    // Use college.code for comparison (backend stores colleges by code)
    const collegeCode = college.code;
    
    // Check if this college-branch combo exists in saved list
    const isAdded = savedColleges.some((savedEntry) => {
      // savedEntry structure: { college: { code, name, ... }, branch, rank, ... }
      let savedCollegeCode;
      
      if (savedEntry.college) {
        // Handle both nested object and direct string formats
        if (typeof savedEntry.college === 'object' && savedEntry.college.code) {
          savedCollegeCode = savedEntry.college.code;
        } else if (typeof savedEntry.college === 'string') {
          savedCollegeCode = savedEntry.college;
        }
      }
      
      // Compare both college code and branch name
      const codeMatch = savedCollegeCode === collegeCode;
      const branchMatch = savedEntry.branch === branchName;
      
      return codeMatch && branchMatch;
    });
    
    return isAdded;
  };

  const paginate = (pageNumber) => {
    // Validate page number is within bounds
    if (pageNumber >= 1 && pageNumber <= (predictionResult?.totalPages || 1)) {
      setCurrentPage(pageNumber);
      // Manually fetch results for page 1 since useEffect skips it
      if (pageNumber === 1) {
        // Check if we have the required data based on mode
        const hasRequiredData = filterMode === 'percentile' 
          ? formData?.percentile 
          : (formData?.cutoffRangeMin && formData?.cutoffRangeMax);
        
        if (hasRequiredData) {
          fetchPredictionResults(1, formData);
        }
      }
    }
  };

  if (!formData || !initialPredictionData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">No prediction data found.</h2>
        <p className="text-gray-600">
          Please go back and fill out the prediction form first.
        </p>
        <Link
          to="/predict"
          className="mt-4 inline-block px-6 py-2 text-white bg-indigo-600 rounded-lg"
        >
          Go to Predictor
        </Link>
      </div>
    );
  }

  if (loading && !predictionResult) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => fetchPredictionResults(currentPage)}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Function to get cutoff value for a category
  const getCutoffValue = (cutoffs, category) => {
    if (!cutoffs || !category) return "N/A";

    const cutoff = cutoffs[category.toUpperCase()];
    if (cutoff === undefined || cutoff === null) return "N/A";

    // Handle different data types from MongoDB
    if (typeof cutoff === "object") {
      if (cutoff.$numberDouble)
        return parseFloat(cutoff.$numberDouble).toFixed(2);
      if (cutoff.$numberInt) return parseInt(cutoff.$numberInt);
      return "N/A";
    }

    return parseFloat(cutoff).toFixed(2);
  };

  // Function to check if a branch matches the cutoff criteria
  const isBranchMatching = (branch, percentile, category) => {
    if (!percentile || !category) return true;

    const cutoff = branch.cutoffs[category.toUpperCase()];
    if (cutoff === undefined || cutoff === null) return true; // Assume match if no cutoff data

    let cutoffValue = 0;
    if (typeof cutoff === "object") {
      if (cutoff.$numberDouble) {
        cutoffValue = parseFloat(cutoff.$numberDouble);
      } else if (cutoff.$numberInt) {
        cutoffValue = parseInt(cutoff.$numberInt);
      }
    } else {
      cutoffValue = parseFloat(cutoff);
    }

    return parseFloat(percentile) >= cutoffValue;
  };

  return (
    <div className="bg-gray-50/50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Prediction Results
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Based on your inputs, here are the colleges you have a good chance
            of getting into.
          </p>
        </header>

        {/* Editable Filter Form */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              Search Criteria
            </h3>
            <span className="text-sm text-gray-500">
              Adjust your filters and search again
            </span>
          </div>

          {/* Filter Mode Toggle - Compact */}
          <div className="mb-4 flex gap-2">
            <button
              type="button"
              onClick={() => handleFilterModeChange('percentile')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterMode === 'percentile'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🎯 Percentile Mode
            </button>
            <button
              type="button"
              onClick={() => handleFilterModeChange('range')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterMode === 'range'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📊 Range Mode
            </button>
          </div>
          
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Percentile Input - Only show in Percentile Mode */}
            {filterMode === 'percentile' && (
              <div>
                <label htmlFor="percentile" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Percentile <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="percentile"
                  id="percentile"
                  value={formData.percentile}
                  onChange={handleChange}
                  required={filterMode === 'percentile'}
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="e.g., 98.5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}

            {/* Cutoff Range - Only show in Range Mode */}
            {filterMode === 'range' && (
              <>
                <div>
                  <label htmlFor="cutoffRangeMax" className="block text-sm font-medium text-gray-700 mb-1">
                    Max Cutoff <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="cutoffRangeMax"
                    id="cutoffRangeMax"
                    value={formData.cutoffRangeMax}
                    onChange={handleChange}
                    required={filterMode === 'range'}
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="e.g., 80"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="cutoffRangeMin" className="block text-sm font-medium text-gray-700 mb-1">
                    Min Cutoff <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="cutoffRangeMin"
                    id="cutoffRangeMin"
                    value={formData.cutoffRangeMin}
                    onChange={handleChange}
                    required={filterMode === 'range'}
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="e.g., 70"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </>
            )}

            {/* Branch Dropdown */}
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Branch
              </label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Any">Any Branch</option>
                {normalizedBranches.map((branch, index) => (
                  <option key={index} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            {/* Category Dropdown */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="OPEN">OPEN</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="OBC">OBC</option>
                <option value="VJ">VJ</option>
                <option value="NT1">NT1</option>
                <option value="NT2">NT2</option>
                <option value="NT3">NT3</option>
                <option value="EWS">EWS</option>
                <option value="TFWS">TFWS</option>
              </select>
            </div>

            {/* City Dropdown */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred City
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Any City</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* College Type Dropdown */}
            <div>
              <label htmlFor="collegeType" className="block text-sm font-medium text-gray-700 mb-1">
                College Type
              </label>
              <select
                id="collegeType"
                name="collegeType"
                value={formData.collegeType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                {collegeTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                disabled={isSearching || loading}
                className="w-full inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {isSearching ? (
                  <>
                    <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Searching...
                  </>
                ) : (
                  <>
                    <ArrowPathIcon className="-ml-1 mr-2 h-5 w-5" />
                    Update Results
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {predictionResult?.colleges?.length > 0 ? (
                  predictionResult.colleges.map((college) => {
                    // If "Any" branch is selected, show all branches
                    // If specific branch is selected, show only that branch (if it exists)
                    let branchesToShow = [];

                    if (formData.branch === "Any") {
                      // Show all branches
                      branchesToShow = college.branches || [];
                    } else {
                      // Show only the matching branch if it exists and meets cutoff criteria
                      const matchingBranch = college.branches?.find(
                        (branch) =>
                          branch.branchName
                            .toLowerCase()
                            .includes(formData.branch.toLowerCase()) &&
                          isBranchMatching(
                            branch,
                            formData.percentile,
                            formData.category
                          )
                      );
                      branchesToShow = matchingBranch ? [matchingBranch] : [];
                    }

                    // Only show the college if it has matching branches to display
                    if (branchesToShow.length === 0) {
                      return null;
                    }

                    return (
                      <li
                        key={college._id || college.code}
                        className="p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <h4 className="text-lg font-bold text-indigo-700">
                            {college.name}
                          </h4>
                          <p className="text-gray-600">
                            {college.location?.city}, {college.location?.state}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            College Type:{" "}
                            <span className="font-semibold">
                              {college.type}
                            </span>
                          </p>

                          {/* Branches section */}
                          <div className="mt-4">
                            <h5 className="text-md font-semibold text-gray-700 mb-2">
                              Available Branches:
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {branchesToShow.map((branch, index) => {
                                const cutoffValue = getCutoffValue(
                                  branch.cutoffs,
                                  formData.category
                                );

                                return (
                                  <div
                                    key={index}
                                    className={`p-3 rounded-lg border ${
                                      formData.branch === "Any" &&
                                      isBranchMatching(
                                        branch,
                                        formData.percentile,
                                        formData.category
                                      )
                                        ? "border-green-500 bg-green-50"
                                        : "border-gray-200"
                                    }`}
                                  >
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-medium text-gray-900">
                                          {branch.branchName}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">
                                          Cutoff Percentile:{" "}
                                          <span className="font-semibold">
                                            {cutoffValue !== "N/A"
                                              ? `${cutoffValue}%`
                                              : "N/A"}
                                          </span>
                                        </p>
                                        <p className="text-sm text-gray-600">
                                          Category:{" "}
                                          <span className="font-semibold">
                                            {formData.category}
                                          </span>
                                        </p>
                                      </div>
                                      {formData.branch === "Any" &&
                                        isBranchMatching(
                                          branch,
                                          formData.percentile,
                                          formData.category
                                        ) && (
                                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Eligible
                                          </span>
                                        )}
                                    </div>
                                    <div className="mt-3 flex justify-end">
                                      {isAlreadyAdded(college, branch.branchName) ? (
                                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-lg">
                                          <svg className="-ml-1 mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                          </svg>
                                          Already Added
                                        </span>
                                      ) : (
                                        <button
                                          onClick={() =>
                                            handleAddToList(college, branch)
                                          }
                                          disabled={loadingSavedList}
                                          className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                          <PlusIcon className="-ml-1 mr-1 h-4 w-4" />
                                          Add to List
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li className="p-12 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      No Matching Colleges Found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Based on your criteria (Percentile:{" "}
                      {formData.percentile}%, Branch:{" "}
                      {formData.branch}, Category:{" "}
                      {formData.category}), no colleges match your
                      requirements.
                    </p>
                    <p className="text-gray-500 text-sm">
                      Try adjusting your filters above and click "Update Results" to search again.
                    </p>
                  </li>
                )}
              </ul>

              {/* Pagination Controls */}
              {predictionResult && predictionResult.totalColleges > 15 && (
                <div className="mt-8 flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <div className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(predictionResult.currentPage - 1) * 15 + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        predictionResult.currentPage * 15,
                        predictionResult.totalColleges
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {predictionResult.totalColleges}
                    </span>{" "}
                    results
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => paginate(predictionResult.currentPage - 1)}
                      disabled={!predictionResult.hasPrevPage}
                      className={`px-4 py-2 text-sm font-medium rounded-lg ${
                        predictionResult.hasPrevPage
                          ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Previous
                    </button>

                    {/* Page numbers */}
                    {[...Array(predictionResult.totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      // Show first, last, current, and nearby pages
                      if (
                        pageNum === 1 ||
                        pageNum === predictionResult.totalPages ||
                        (pageNum >= predictionResult.currentPage - 1 &&
                          pageNum <= predictionResult.currentPage + 1)
                      ) {
                        const isCurrentPage = pageNum === predictionResult.currentPage;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => !isCurrentPage && paginate(pageNum)}
                            disabled={isCurrentPage}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                              isCurrentPage
                                ? "bg-indigo-600 text-white cursor-default"
                                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 cursor-pointer"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }

                      // Show ellipsis for skipped pages
                      if (
                        pageNum === predictionResult.currentPage - 2 ||
                        pageNum === predictionResult.currentPage + 2
                      ) {
                        return (
                          <span
                            key={pageNum}
                            className="px-2 py-2 text-gray-500"
                          >
                            ...
                          </span>
                        );
                      }

                      return null;
                    })}

                    <button
                      onClick={() => paginate(predictionResult.currentPage + 1)}
                      disabled={!predictionResult.hasNextPage}
                      className={`px-4 py-2 text-sm font-medium rounded-lg ${
                        predictionResult.hasNextPage
                          ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Login Required Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            {/* Center modal */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 sm:mx-0 sm:h-16 sm:w-16">
                    {/* Icon */}
                    <svg className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                    <h3 className="text-2xl leading-6 font-bold text-gray-900" id="modal-title">
                      Login Required
                    </h3>
                    <div className="mt-4">
                      <p className="text-base text-gray-600">
                        You need to be logged in to add colleges to your list.
                      </p>
                      <p className="mt-3 text-sm text-gray-500">
                        Create a free account or sign in to:
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-gray-600">
                        <li className="flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Save your favorite colleges
                        </li>
                        <li className="flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Organize and rank colleges
                        </li>
                        <li className="flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Export list to PDF/Excel
                        </li>
                        <li className="flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Access AI counselling
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/login', { state: { from: location.pathname } })}
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-6 py-3 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm transition-all transform hover:scale-105"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/register', { state: { from: location.pathname } })}
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm transition-all"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
