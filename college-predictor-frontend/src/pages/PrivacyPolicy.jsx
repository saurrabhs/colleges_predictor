import { ShieldCheckIcon, LockClosedIcon, EyeSlashIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <ShieldCheckIcon className="h-16 w-16 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to CollegePredictor ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our college prediction platform and related services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center mb-4">
              <DocumentTextIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  When you register for an account, we collect:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Password (encrypted)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Academic Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  To provide personalized college predictions, we collect:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
                  <li>Exam percentile/rank (JEE, CET, etc.)</li>
                  <li>Category (General, OBC, SC, ST, etc.)</li>
                  <li>Preferred branches and locations</li>
                  <li>Saved college lists and preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Usage Data</h3>
                <p className="text-gray-700 leading-relaxed">
                  We automatically collect certain information when you use our platform:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
                  <li>Device information (browser type, operating system)</li>
                  <li>IP address and location data</li>
                  <li>Pages visited and features used</li>
                  <li>Time and duration of visits</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <div className="flex items-center mb-4">
              <LockClosedIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li><strong>College Predictions:</strong> To provide accurate and personalized college recommendations based on your academic profile</li>
              <li><strong>Account Management:</strong> To create and manage your user account, authenticate your identity, and provide customer support</li>
              <li><strong>Communication:</strong> To send you important updates, notifications, and respond to your inquiries</li>
              <li><strong>AI Counselling:</strong> To provide personalized career guidance through our AI-powered counselling feature</li>
              <li><strong>Platform Improvement:</strong> To analyze usage patterns and improve our services, features, and user experience</li>
              <li><strong>Security:</strong> To detect, prevent, and address technical issues, fraud, and unauthorized access</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center mb-4">
              <ShieldCheckIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li><strong>Encryption:</strong> All data transmission is encrypted using SSL/TLS protocols</li>
              <li><strong>Password Protection:</strong> Passwords are hashed and salted using bcrypt encryption</li>
              <li><strong>Secure Storage:</strong> Data is stored on secure servers with restricted access</li>
              <li><strong>Regular Audits:</strong> We conduct regular security audits and updates</li>
              <li><strong>Access Control:</strong> Limited access to personal data on a need-to-know basis</li>
            </ul>
            
            <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> While we strive to protect your personal information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <div className="flex items-center mb-4">
              <EyeSlashIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Information Sharing and Disclosure</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share specific information</li>
              <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our platform (e.g., email services, hosting providers)</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental regulations</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>Protection of Rights:</strong> To protect our rights, property, or safety, and that of our users</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal obligations)</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
              <li><strong>Withdraw Consent:</strong> Withdraw your consent for data processing where applicable</li>
            </ul>
            
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, please contact us at <a href="mailto:collegespredictor@gmail.com" className="text-indigo-600 hover:text-indigo-500 font-medium">collegespredictor@gmail.com</a>
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li><strong>Essential Cookies:</strong> Required for basic platform functionality and security</li>
              <li><strong>Authentication:</strong> To keep you logged in and remember your preferences</li>
              <li><strong>Analytics:</strong> To understand how you use our platform and improve services</li>
              <li><strong>Performance:</strong> To monitor and enhance platform performance</li>
            </ul>
            
            <p className="text-gray-700 leading-relaxed mt-4">
              You can control cookies through your browser settings. However, disabling cookies may limit certain features of our platform.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            
            <p className="text-gray-700 leading-relaxed">
              Our platform is designed for students preparing for engineering college admissions. While we serve students of various ages, we do not knowingly collect personal information from children under 13 without parental consent. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
            
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as necessary to:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li>Provide our services to you</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Maintain business records</li>
            </ul>
            
            <p className="text-gray-700 leading-relaxed mt-4">
              When you delete your account, we will delete or anonymize your personal information within 30 days, except where retention is required by law.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. We will notify you of any material changes by:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li>Posting the updated policy on this page</li>
              <li>Updating the "Last Updated" date</li>
              <li>Sending you an email notification (for significant changes)</li>
            </ul>
            
            <p className="text-gray-700 leading-relaxed mt-4">
              We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-indigo-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> <a href="mailto:collegespredictor@gmail.com" className="text-indigo-600 hover:text-indigo-500">collegespredictor@gmail.com</a></p>
              <p><strong>Address:</strong> Ratnagiri, Maharashtra, India</p>
              <p><strong>Support Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM IST</p>
            </div>
          </section>

          {/* Consent */}
          <section className="border-t border-gray-200 pt-6">
            <p className="text-gray-700 leading-relaxed">
              By using CollegePredictor, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and disclosure of your information as described herein.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
