import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { PlusIcon, ChatBubbleLeftRightIcon, ListBulletIcon, AcademicCapIcon, NewspaperIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { collegeListAPI } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [collegeCount, setCollegeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollegeList();
  }, []);

  const fetchCollegeList = async () => {
    try {
      setLoading(true);
      const response = await collegeListAPI.getCollegeList();
      setCollegeCount(response.colleges?.length || 0);
    } catch (error) {
      console.error('Error fetching college list:', error);
      setCollegeCount(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50/50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome, {user?.username}!</h1>
          <p className="mt-2 text-lg text-gray-600">Here's your personalized college dashboard.</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Link to="/college-list" className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition-shadow">
            <div>
              <p className="text-sm font-medium text-gray-500">My List</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? '...' : `${collegeCount} College${collegeCount !== 1 ? 's' : ''}`}
              </p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full">
              <ListBulletIcon className="h-6 w-6 text-indigo-600" />
            </div>
          </Link>
          
          {/* AI Counselling Card */}
          <Link to="/ai-counselling" className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-xl shadow-md flex items-center justify-between hover:from-purple-600 hover:to-blue-600 transition-all hover:shadow-lg">
            <div>
              <p className="text-sm font-medium text-white/90">AI Counselling</p>
              <p className="text-xl font-bold text-white">Get Expert Guidance</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
            </div>
          </Link>

          {/* Branch Guide Card */}
          <Link to="/branch-guide" className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-xl shadow-md flex items-center justify-between hover:from-green-600 hover:to-teal-600 transition-all hover:shadow-lg">
            <div>
              <p className="text-sm font-medium text-white/90">Branch Guide</p>
              <p className="text-xl font-bold text-white">Explore Branches</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <AcademicCapIcon className="h-6 w-6 text-white" />
            </div>
          </Link>

          {/* Predict Colleges Card */}
          <Link to="/predict" className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-xl shadow-md flex items-center justify-between hover:from-orange-600 hover:to-red-600 transition-all hover:shadow-lg">
            <div>
              <p className="text-sm font-medium text-white/90">Predict Colleges</p>
              <p className="text-xl font-bold text-white">Find Your Match</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <PlusIcon className="h-6 w-6 text-white" />
            </div>
          </Link>
        </div>

        {/* Latest Updates Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <NewspaperIcon className="h-7 w-7 mr-2 text-indigo-600" />
              Latest CET Updates
            </h2>
            <span className="text-sm text-gray-500 flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              Updated Recently
            </span>
          </div>
          <div className="space-y-4">
            {/* Update 1 */}
            <div className="border-l-4 border-indigo-600 pl-4 py-3 bg-indigo-50/50 rounded-r-lg hover:bg-indigo-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">MHT-CET 2025 Registration Extended Till January 31</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    The State CET Cell has extended the MHT-CET 2025 registration deadline to January 31, 2025. Students can now apply with late fees until the extended date for engineering admissions.
                  </p>
                  <span className="text-xs text-indigo-600 font-medium">3 days ago</span>
                </div>
              </div>
            </div>

            {/* Update 2 */}
            <div className="border-l-4 border-purple-600 pl-4 py-3 bg-purple-50/50 rounded-r-lg hover:bg-purple-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">MHT-CET 2025 Exam Dates Announced - April 2025</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Maharashtra CET 2025 exam will be conducted from April 14-30, 2025 in computer-based test mode. PCM group on April 14-16 and PCB group on April 22-23, 2025.
                  </p>
                  <span className="text-xs text-purple-600 font-medium">1 week ago</span>
                </div>
              </div>
            </div>

            {/* Update 3 */}
            <div className="border-l-4 border-green-600 pl-4 py-3 bg-green-50/50 rounded-r-lg hover:bg-green-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">New AI & Data Science Seats: 3,500+ Added for 2025</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    AICTE has approved 3,500+ additional seats in AI, Data Science, and Machine Learning branches across 45 Maharashtra engineering colleges for academic year 2025-26.
                  </p>
                  <span className="text-xs text-green-600 font-medium">2 weeks ago</span>
                </div>
              </div>
            </div>

            {/* Update 4 */}
            <div className="border-l-4 border-orange-600 pl-4 py-3 bg-orange-50/50 rounded-r-lg hover:bg-orange-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">CAP 2025 Round Schedule Released by DTE Maharashtra</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    DTE has released tentative CAP 2025 schedule. Round 1 registration expected in June 2025. Three counselling rounds planned with institute-level rounds for vacant seats.
                  </p>
                  <span className="text-xs text-orange-600 font-medium">3 weeks ago</span>
                </div>
              </div>
            </div>

            {/* Update 5 */}
            <div className="border-l-4 border-blue-600 pl-4 py-3 bg-blue-50/50 rounded-r-lg hover:bg-blue-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Fee Structure 2025-26: No Major Revision for Government Colleges</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Maharashtra Fee Regulatory Authority announced that government and aided engineering college fees will remain largely unchanged for 2025-26. Private unaided college fee caps revised by 5%.
                  </p>
                  <span className="text-xs text-blue-600 font-medium">2 months ago</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              <span className="font-medium">Note:</span> These updates are curated from official sources and news. Please verify from official DTE/AICTE websites for the latest information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
