import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collegeAPI } from '../services/api';

const CollegesList = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalColleges: 0,
    hasNextPage: false,
    hasPrevPage: false
  });

  const fetchColleges = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await collegeAPI.getAllColleges(page, 15);
      setColleges(data.colleges);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalColleges: data.totalColleges,
        hasNextPage: data.hasNextPage,
        hasPrevPage: data.hasPrevPage
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch colleges');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchColleges(newPage);
    }
  };

  if (loading) {
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
          onClick={() => fetchColleges(pagination.currentPage)}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">All Colleges</h1>
          <p className="mt-2 text-lg text-gray-600">
            Browse through all available colleges. Total: {pagination.totalColleges}
          </p>
        </header>

        {colleges.length > 0 ? (
          <>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {colleges.map((college) => (
                  <li key={college._id || college.code} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-indigo-700">{college.name}</h4>
                        <p className="text-gray-600">
                          {college.location?.city}, {college.location?.district}, {college.location?.state}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          College Type: <span className="font-semibold">{college.type}</span> &bull; 
                          Code: <span className="font-semibold">{college.code}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Branches: <span className="font-semibold">{college.branches?.length || 0}</span>
                        </p>
                      </div>
                      <Link 
                        to={`/college/${college._id || college.code}`}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pagination Controls */}
            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{(pagination.currentPage - 1) * 15 + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(pagination.currentPage * 15, pagination.totalColleges)}
                </span>{' '}
                of <span className="font-medium">{pagination.totalColleges}</span> results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    pagination.hasPrevPage
                      ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Previous
                </button>
                
                {/* Page numbers */}
                {[...Array(pagination.totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  // Show first, last, current, and nearby pages
                  if (
                    pageNum === 1 ||
                    pageNum === pagination.totalPages ||
                    (pageNum >= pagination.currentPage - 1 && pageNum <= pagination.currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg ${
                          pageNum === pagination.currentPage
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  
                  // Show ellipsis for skipped pages
                  if (pageNum === pagination.currentPage - 2 || pageNum === pagination.currentPage + 2) {
                    return (
                      <span key={pageNum} className="px-2 py-2 text-gray-500">
                        ...
                      </span>
                    );
                  }
                  
                  return null;
                })}
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    pagination.hasNextPage
                      ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No colleges found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegesList;