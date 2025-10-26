import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { EnvelopeIcon, LockClosedIcon, UserIcon, PhoneIcon } from '@heroicons/react/24/outline';
import PasswordStrengthIndicator from '../../components/PasswordStrengthIndicator';
import Header from '../../components/Header';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match.');
    }
    if (!formData.agreedToTerms) {
      return toast.error('You must agree to the Terms & Privacy Policy.');
    }
    setLoading(true);
    try {
      const result = await register({ ...formData });
      if (result.success) {
        toast.success('OTP sent to your email! Please verify.');
        setStep(2);
      } else {
        toast.error(result.error || 'Registration failed.');
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { success, error } = await verifyOtp(formData.email, otp);
      if (success) {
        toast.success('Email verified successfully! Redirecting...');
        navigate('/dashboard');
      } else {
        toast.error(error || 'OTP verification failed.');
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const renderRegisterForm = () => (
    <form onSubmit={handleRegisterSubmit} className="space-y-4">
      <div className="relative">
        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input name="username" type="text" required value={formData.username} onChange={handleChange} placeholder="Full Name" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div className="relative">
        <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div className="relative">
        <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div className="relative">
        <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input name="password" type="password" required value={formData.password} onChange={handleChange} placeholder="Password" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <PasswordStrengthIndicator password={formData.password} />
      <div className="relative">
        <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div className="flex items-center">
        <input id="agreedToTerms" name="agreedToTerms" type="checkbox" checked={formData.agreedToTerms} onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
        <label htmlFor="agreedToTerms" className="ml-2 block text-sm text-gray-700">I agree to the <Link to="/terms" className="font-medium text-indigo-600">Terms & Privacy Policy</Link></label>
      </div>
      <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 transition-all transform hover:scale-105">
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );

  const renderOtpForm = () => (
    <form onSubmit={handleOtpSubmit} className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800">Verify Your Email</h3>
        <p className="text-gray-500">We've sent a 6-digit code to {formData.email}</p>
      </div>
      <div className="relative">
        <input name="otp" type="text" inputMode="numeric" required value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" maxLength={6} className="w-full text-center tracking-[0.5em] text-2xl py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 transition-all transform hover:scale-105">
        {loading ? 'Verifying...' : 'Verify & Proceed'}
      </button>
      <div className="text-center">
        <button type="button" onClick={() => setStep(1)} className="text-sm font-medium text-indigo-600 hover:underline">Back to registration</button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Navigation Bar */}
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
          {step === 1 ? (
            <>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Create Your Account</h2>
              <p className="text-center text-gray-500 mb-6">Join us and find your future college.</p>
              {renderRegisterForm()}
            </>
          ) : (
            renderOtpForm()
          )}
          {step === 1 && (
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
