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
    collegeType: 'All Types'
  });
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

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
    setLoading(true);
    toast.info('Finding the best colleges for you...');
    
    try {
      // Call the backend API to predict colleges with pagination
      const predictionResult = await collegeAPI.predictColleges(formData, 1, 15);
      
      setLoading(false);
      // Pass form data and results to results page
      navigate('/results', { state: { predictionData: formData, predictionResult } });
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
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Percentile Input */}
            <div className="md:col-span-2">
              <label htmlFor="percentile" className="block text-sm font-medium text-gray-700 mb-1">Percentile</label>
              <input
                type="number"
                name="percentile"
                id="percentile"
                value={formData.percentile}
                onChange={handleChange}
                required
                min="0"
                max="100"
                step="0.01"
                placeholder="e.g., 98.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

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