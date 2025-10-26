import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';

// Layout and Protected Routes
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Predict from './pages/Predict';
import Results from './pages/Results';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import CollegesList from './pages/CollegesList';
import CollegeList from './pages/CollegeList';
import AICounselling from './pages/AICounselling';
import BranchGuide from './pages/BranchGuide';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// A simple wrapper to apply layout to a group of routes
const AppLayout = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/colleges" element={<CollegesList />} />
      <Route path="/predict" element={<Predict />} />
      <Route path="/results" element={<Results />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      
      {/* Protected Routes with Layout */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/college-list" element={<CollegeList />} />
        <Route path="/ai-counselling" element={<AICounselling />} />
        <Route path="/branch-guide" element={<BranchGuide />} />
      </Route>

      {/* Catch all for layout routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Layout>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes without main layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Routes with main layout */}
          <Route path="/*" element={<AppLayout />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;