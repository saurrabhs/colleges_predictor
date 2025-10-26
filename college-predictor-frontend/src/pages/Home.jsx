import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  AcademicCapIcon,
  ChartBarIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  DocumentArrowDownIcon,
  ArrowsUpDownIcon,
  BookmarkIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Accurate Predictions",
    description:
      "Get precise college predictions based on your rank and preferences using historical cutoff data and advanced algorithms.",
    icon: LightBulbIcon,
  },
  {
    name: "Historical Cutoff Analysis",
    description:
      "Access years of previous cutoff data to understand admission trends and make informed decisions about your college choices.",
    icon: ChartBarIcon,
  },
  {
    name: "My List Management",
    description:
      "Save your preferred colleges in a personalized list. Your list is stored securely and accessible anytime from your dashboard.",
    icon: BookmarkIcon,
  },
  {
    name: "Drag & Drop Ranking",
    description:
      "Easily reorder your saved colleges by dragging and dropping to prioritize your preferences and organize your choices.",
    icon: ArrowsUpDownIcon,
  },
  {
    name: "Export to PDF/Excel",
    description:
      "Download your college list in PDF or Excel format for offline access, sharing with family, or printing for reference.",
    icon: DocumentArrowDownIcon,
  },
  {
    name: "AI Career Counselling",
    description:
      "Get personalized guidance from our AI-powered counsellor. Ask questions about colleges, branches, and career paths.",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: "Comprehensive Database",
    description:
      "Access information about 1000+ engineering colleges across India with updated cutoffs, fees, and placement details.",
    icon: AcademicCapIcon,
  },
  {
    name: "Smart Filtering",
    description:
      "Filter colleges by location, branch, fees, cutoff range, and more to find colleges that match your specific requirements.",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Branch Guide",
    description:
      "Explore detailed information about all engineering branches available in Maharashtra. Learn about career prospects, salary ranges, and future scope.",
    icon: BookOpenIcon,
  },
];

const stats = [
  { id: 1, name: "Students Helped", value: "50,000+" },
  { id: 2, name: "Colleges Listed", value: "1,000+" },
  { id: 3, name: "Accuracy Rate", value: "95%" },
  { id: 4, name: "Support Available", value: "24/7" },
];

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main>
        {/* Hero Section */}
        <div className="relative pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
              <span className="block">Predict Your Dream</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 leading-tight pb-[2px]">
                Engineering College
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
              Get accurate college predictions based on your JEE/CET rank.
              Discover the best engineering colleges that match your profile and
              preferences with our advanced AI-powered platform.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-transform"
              >
                Start Prediction <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id} className="text-center">
                  <p className="text-4xl font-bold text-indigo-600">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-base text-gray-500">{stat.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-base font-semibold text-indigo-600 tracking-wider uppercase">
                Why Choose Us
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Everything You Need for College Selection
              </p>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Our platform combines cutting-edge technology with comprehensive
                data to give you the best college recommendations.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="mt-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
