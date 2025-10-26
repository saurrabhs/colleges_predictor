import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { collegeAPI } from '../services/api';

// Normalized branch mappings to reduce duplicates
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

const Predict = () => {
  const [formData, setFormData] = useState({
    percentile: '',
    branch: 'Any',
    category: 'OPEN',
    city: '',
    collegeType: 'All Types',
    cutoffRangeMin: '',
    cutoffRangeMax: ''
  });
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [filterMode, setFilterMode] = useState('percentile'); // 'percentile' or 'range'
  const navigate = useNavigate();

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
        const data = await collegeAPI.getAllColleges(1, 1000); // Fetch all cities
        
        // Extract unique cities
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate based on filter mode
    if (filterMode === 'percentile') {
      if (!formData.percentile) {
        toast.error('Please enter your percentile');
        return;
      }
    } else if (filterMode === 'range') {
      if (!formData.cutoffRangeMin || !formData.cutoffRangeMax) {
        toast.error('Please enter both minimum and maximum cutoff for range filter');
        return;
      }
      
      const min = parseFloat(formData.cutoffRangeMin);
      const max = parseFloat(formData.cutoffRangeMax);
      
      if (min > max) {
        toast.error('Minimum cutoff cannot be greater than maximum cutoff');
        return;
      }
    }
    
    setLoading(true);
    toast.info('Finding the best colleges for you...');
    
    try {
      // Prepare data based on filter mode
      const searchData = { ...formData };
      if (filterMode === 'percentile') {
        // Clear range values when using percentile mode
        searchData.cutoffRangeMin = '';
        searchData.cutoffRangeMax = '';
      } else {
        // Set percentile to high value for range mode to get all colleges
        searchData.percentile = '100';
      }
      
      // Call the backend API to predict colleges with pagination
      const predictionResult = await collegeAPI.predictColleges(searchData, 1, 15);
      
      setLoading(false);
      // Pass form data and results to results page
      navigate('/results', { state: { predictionData: searchData, predictionResult, filterMode } });
    } catch (error) {
      setLoading(false);
      toast.error(error.message || 'Failed to predict colleges. Please try again.');
      console.error('Prediction error:', error);
    }
  };

  return (
    <div className="bg-gray-50/50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">Predict Your College</h1>
          <p className="mt-2 text-lg text-gray-600">Fill in your details to get a list of colleges tailored for you.</p>
        </header>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          {/* Filter Mode Selection */}
          <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Choose Filter Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleFilterModeChange('percentile')}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  filterMode === 'percentile'
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-400'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      filterMode === 'percentile' ? 'border-white' : 'border-gray-400'
                    }`}>
                      {filterMode === 'percentile' && (
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">🎯 Percentile Mode</h4>
                    <p className={`text-xs ${
                      filterMode === 'percentile' ? 'text-indigo-100' : 'text-gray-500'
                    }`}>
                      Enter your percentile and see all colleges you qualify for
                    </p>
                  </div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => handleFilterModeChange('range')}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  filterMode === 'range'
                    ? 'border-purple-600 bg-purple-600 text-white shadow-md'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-purple-400'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      filterMode === 'range' ? 'border-white' : 'border-gray-400'
                    }`}>
                      {filterMode === 'range' && (
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">📊 Range Mode</h4>
                    <p className={`text-xs ${
                      filterMode === 'range' ? 'text-purple-100' : 'text-gray-500'
                    }`}>
                      Specify cutoff range (e.g., 80-70) to see colleges in that range only
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Percentile Input - Only show in Percentile Mode */}
            {filterMode === 'percentile' && (
              <div className="md:col-span-2">
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
                <p className="mt-1 text-xs text-gray-500">
                  ℹ️ Enter your MHT-CET percentile to see all colleges you can get
                </p>
              </div>
            )}

            {/* Cutoff Range Filter - Only show in Range Mode */}
            {filterMode === 'range' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cutoff Percentile Range <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cutoffRangeMax" className="block text-xs font-medium text-gray-600 mb-1">
                      Maximum Cutoff <span className="text-red-500">*</span>
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
                    <label htmlFor="cutoffRangeMin" className="block text-xs font-medium text-gray-600 mb-1">
                      Minimum Cutoff <span className="text-red-500">*</span>
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
                </div>
                {(formData.cutoffRangeMin || formData.cutoffRangeMax) && (
                  <p className="mt-2 text-xs text-purple-600 font-medium">
                    📊 Showing colleges with cutoffs between {formData.cutoffRangeMin || '0'}% and {formData.cutoffRangeMax || '100'}%
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  ℹ️ Get colleges within a specific cutoff range regardless of your percentile
                </p>
              </div>
            )}

            {/* Branch Dropdown */}
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">Preferred Branch</label>
              <select id="branch" name="branch" value={formData.branch} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                <option value="Any">Any Branch</option>
                {normalizedBranches.map((branch, index) => (
                  <option key={index} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            {/* Category Dropdown */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
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
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Preferred City</label>
              <select id="city" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">Any City</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* College Type Dropdown */}
            <div>
              <label htmlFor="collegeType" className="block text-sm font-medium text-gray-700 mb-1">College Type</label>
              <select id="collegeType" name="collegeType" value={formData.collegeType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                {collegeTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-center mt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 transition-all transform hover:scale-105"
              >
                {loading ? 'Predicting...' : 'Predict Now'}
                {!loading && <ArrowRightIcon className="ml-2 h-5 w-5" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Predict;