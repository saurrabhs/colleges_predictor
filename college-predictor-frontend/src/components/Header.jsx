import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AcademicCapIcon, ArrowRightOnRectangleIcon, UserCircleIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <AcademicCapIcon className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-800">CollegePredictor</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={({ isActive }) => `text-gray-600 hover:text-indigo-600 transition-colors ${isActive ? 'font-semibold text-indigo-600' : ''}`}>
              Home
            </NavLink>
            <NavLink to="/predict" className={({ isActive }) => `text-gray-600 hover:text-indigo-600 transition-colors ${isActive ? 'font-semibold text-indigo-600' : ''}`}>
              Predict
            </NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/college-list" className={({ isActive }) => `text-gray-600 hover:text-indigo-600 transition-colors ${isActive ? 'font-semibold text-indigo-600' : ''}`}>
                  My List
                </NavLink>
                <NavLink to="/branch-guide" className={({ isActive }) => `text-gray-600 hover:text-indigo-600 transition-colors ${isActive ? 'font-semibold text-indigo-600' : ''}`}>
                  Branch Guide
                </NavLink>
                <NavLink to="/ai-counselling" className={({ isActive }) => `text-gray-600 hover:text-indigo-600 transition-colors ${isActive ? 'font-semibold text-indigo-600' : ''}`}>
                  AI Counselling
                </NavLink>
              </>
            )}
            <NavLink to="/about" className={({ isActive }) => `text-gray-600 hover:text-indigo-600 transition-colors ${isActive ? 'font-semibold text-indigo-600' : ''}`}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `text-gray-600 hover:text-indigo-600 transition-colors ${isActive ? 'font-semibold text-indigo-600' : ''}`}>
              Contact
            </NavLink>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600">
                  <UserCircleIcon className="h-6 w-6" />
                  <span className="font-medium">{user.username}</span>
                </Link>
                <button onClick={logout} className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600">
                  <ArrowRightOnRectangleIcon className="h-6 w-6" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;