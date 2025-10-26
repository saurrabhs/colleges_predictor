import { useState } from 'react';
import { toast } from 'react-toastify';
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { contactAPI } from '../services/api';

const faqs = [
  {
    question: 'How accurate are the predictions?',
    answer: 'Our predictions are based on years of historical data and advanced algorithms, achieving over 95% accuracy. However, they should be used as a guide and not a guarantee of admission.',
  },
  {
    question: 'Is my personal data secure?',
    answer: 'Yes, we prioritize your privacy. All personal data is encrypted and handled in accordance with our strict privacy policy. We never share your data with third parties without your consent.',
  },
  {
    question: 'When should I use the college predictor?',
    answer: 'The college predictor is most useful after you receive your JEE/CET rank. You can use it throughout the CAP rounds to make informed decisions about college and branch selection based on historical cutoff trends.',
  },
  {
    question: 'How does the AI Counselling feature work?',
    answer: 'Our AI Counselling uses advanced AI technology powered by Google Gemini to provide personalized guidance. It analyzes your rank, preferences, and historical data to answer your queries and help you make better decisions about college admissions.',
  },
  {
    question: 'Can I save colleges to my list without logging in?',
    answer: 'No, you need to create an account and log in to save colleges to your personalized list. However, you can view predictions and explore colleges without logging in. Registration is free and takes less than a minute!',
  },
  {
    question: 'What is the difference between different CAP rounds?',
    answer: 'CAP (Centralized Admission Process) typically has three rounds. Round 1 has the most seats and lowest cutoffs. Round 2 fills remaining seats with slightly higher cutoffs. Round 3 (if conducted) is for final spot admissions. Our predictor shows data from all previous rounds.',
  },
  {
    question: 'How often is the college data updated?',
    answer: 'We update our database regularly with the latest information from official sources. Cutoff data is updated after each CAP round, and college information is refreshed annually to ensure accuracy and relevance.',
  },
  {
    question: 'Do you provide support for management quota admissions?',
    answer: 'Our predictor primarily focuses on merit-based admissions through CAP process. For management quota or direct admissions, we recommend contacting the respective colleges directly. However, our AI Counselling can provide general guidance on such queries.',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await contactAPI.sendContactForm(formData);
      toast.success(response.message || 'Message sent successfully! We will get back to you soon.');
      // Reset form
      setFormData({ name: '', email: '', message: '', phone: '' });
      setErrors({});
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(error || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="relative px-6 py-10 sm:px-10 lg:py-16 bg-indigo-700 text-white">
              <h3 className="text-3xl font-extrabold">Contact Information</h3>
              <p className="mt-4 text-lg text-indigo-200">Our team is here to help. Reach out to us with any questions or feedback.</p>
              <div className="mt-8 space-y-6 text-indigo-100">
                <p className="flex items-center">
                  <BuildingOffice2Icon className="flex-shrink-0 h-6 w-6 mr-3"/>
                  <span>Ratnagiri, Maharashtra, India</span>
                </p>
                <p className="flex items-center">
                  <EnvelopeIcon className="flex-shrink-0 h-6 w-6 mr-3"/>
                  <a href="mailto:collegespredictor@gmail.com" className="hover:text-white transition-colors">
                    collegespredictor@gmail.com
                  </a>
                </p>
                <div className="mt-8 pt-8 border-t border-indigo-600">
                  <p className="text-sm text-indigo-200">Support Hours</p>
                  <p className="mt-2 text-base">Monday - Saturday: 9:00 AM - 6:00 PM IST</p>
                  <p className="text-base">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="px-6 py-10 sm:px-10 lg:py-16">
              <h3 className="text-2xl font-bold text-gray-900">Send us a message</h3>
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                  <label htmlFor="name" className="sr-only">Full name</label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Full name" 
                    className={`block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border rounded-md ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Email" 
                    className={`block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border rounded-md ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">Phone (Optional)</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    id="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="Phone number (Optional)" 
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    required 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Message" 
                    className={`block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border rounded-md ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>
                <div className="text-right">
                  <button type="submit" disabled={loading} className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60">
                    {loading ? 'Sending...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-3">Frequently Asked Questions</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Find answers to common questions about our college prediction service
          </p>
          <div className="mt-12 space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <dt className="text-lg mb-3">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-gray-900 flex-1">{faq.question}</span>
                  </div>
                </dt>
                <dd className="ml-9">
                  <p className="text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
