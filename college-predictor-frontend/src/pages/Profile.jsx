import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { UserCircleIcon, EnvelopeIcon, PhoneIcon, KeyIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState({
    name: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    
    // For phone number, only allow digits and limit to 10
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, ''); // Remove non-digits
      if (digitsOnly.length <= 10) {
        setUserDetails({ ...userDetails, [name]: digitsOnly });
        // Clear error when user starts typing
        if (errors.phone) {
          setErrors({ ...errors, phone: '' });
        }
      }
    } else {
      setUserDetails({ ...userDetails, [name]: value });
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordDetails({ ...passwordDetails, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    
    // Validate phone number
    const newErrors = {};
    
    if (userDetails.phone && userDetails.phone.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    
    if (userDetails.phone && !/^[0-9]{10}$/.test(userDetails.phone)) {
      newErrors.phone = 'Phone number must contain only digits';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors before saving');
      return;
    }
    
    setLoading(true);
    toast.info('Updating profile...');
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Profile updated successfully!');
      setErrors({});
    }, 1500);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordDetails.newPassword !== passwordDetails.confirmNewPassword) {
      return toast.error('New passwords do not match.');
    }
    setLoading(true);
    toast.info('Changing password...');
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Password changed successfully!');
      setPasswordDetails({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    }, 1500);
  };

  return (
    <div className="bg-gray-50/50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Profile & Settings</h1>
          <p className="mt-2 text-lg text-gray-600">Manage your account details and password.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* User Details Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Details</h2>
              <form onSubmit={handleUserSubmit} className="space-y-6">
                <div className="relative">
                  <UserCircleIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="text" name="name" value={userDetails.name} onChange={handleUserChange} placeholder="Full Name" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="email" name="email" value={userDetails.email} disabled className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" />
                </div>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input 
                    type="tel" 
                    name="phone" 
                    value={userDetails.phone} 
                    onChange={handleUserChange} 
                    placeholder="Phone Number (10 digits)" 
                    maxLength="10"
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg ${
                      errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                  {userDetails.phone && userDetails.phone.length === 10 && (
                    <p className="mt-1 text-sm text-green-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Valid mobile number
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <button type="submit" disabled={loading} className="inline-flex justify-center py-2 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60">
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Change Password Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="relative">
                  <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="password" name="currentPassword" value={passwordDetails.currentPassword} onChange={handlePasswordChange} placeholder="Current Password" required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="relative">
                  <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="password" name="newPassword" value={passwordDetails.newPassword} onChange={handlePasswordChange} placeholder="New Password" required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="relative">
                  <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="password" name="confirmNewPassword" value={passwordDetails.confirmNewPassword} onChange={handlePasswordChange} placeholder="Confirm New Password" required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="text-right">
                  <button type="submit" disabled={loading} className="inline-flex justify-center py-2 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60">
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
