import { DocumentTextIcon, CheckCircleIcon, ExclamationTriangleIcon, ScaleIcon } from '@heroicons/react/24/outline';

const TermsOfService = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <DocumentTextIcon className="h-16 w-16 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to CollegePredictor! These Terms of Service ("Terms") govern your access to and use of our college prediction platform, website, and related services (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Service.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircleIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Description of Service</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              CollegePredictor provides an educational technology platform that offers:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li><strong>College Predictions:</strong> Personalized college recommendations based on your academic performance and preferences</li>
              <li><strong>Historical Data Analysis:</strong> Access to previous years' cutoff data and admission trends</li>
              <li><strong>AI-Powered Counselling:</strong> Intelligent career guidance and college selection assistance</li>
              <li><strong>College List Management:</strong> Tools to save, organize, rank, and export your preferred colleges</li>
              <li><strong>Information Database:</strong> Comprehensive information about 1000+ engineering colleges across India</li>
            </ul>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              To use our Service, you must:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li>Be at least 13 years of age or have parental/guardian consent</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Not use the Service for any illegal or unauthorized purpose</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts and Registration</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Creation</h3>
                <p className="text-gray-700 leading-relaxed">
                  When you create an account, you agree to:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Update your information to keep it accurate and current</li>
                  <li>Maintain the confidentiality of your password</li>
                  <li>Be responsible for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Termination</h3>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to suspend or terminate your account if you:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
                  <li>Violate these Terms of Service</li>
                  <li>Provide false or misleading information</li>
                  <li>Engage in fraudulent or illegal activities</li>
                  <li>Abuse or misuse the Service</li>
                  <li>Infringe on others' intellectual property rights</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Use Policy</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li>Use the Service for any unlawful purpose or in violation of any laws</li>
              <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
              <li>Transmit viruses, malware, or other harmful code</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Scrape, data mine, or use automated tools to access the Service</li>
              <li>Impersonate any person or entity or falsely represent your affiliation</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Sell, transfer, or share your account with others</li>
              <li>Use the Service to distribute spam or unsolicited messages</li>
            </ul>
          </section>

          {/* Predictions Disclaimer */}
          <section>
            <div className="flex items-center mb-4">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Predictions and Data Accuracy</h2>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded mb-4">
              <p className="text-yellow-800 font-semibold mb-2">Important Disclaimer</p>
              <p className="text-yellow-700 leading-relaxed">
                Our college predictions are based on historical data, statistical analysis, and algorithms. While we strive for accuracy, we cannot guarantee admission to any college or program.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              You acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li>Predictions are for <strong>informational and guidance purposes only</strong></li>
              <li>Actual admission cutoffs may vary based on multiple factors</li>
              <li>Historical data may not reflect future admission trends</li>
              <li>Final admission decisions are made solely by respective colleges and institutions</li>
              <li>We are not responsible for admission outcomes or decisions</li>
              <li>You should verify all information with official college sources</li>
              <li>Cutoff data is collected from publicly available sources and may contain inaccuracies</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <div className="flex items-center mb-4">
              <ScaleIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Intellectual Property Rights</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Our Content</h3>
                <p className="text-gray-700 leading-relaxed">
                  All content on the Service, including but not limited to text, graphics, logos, software, algorithms, and data compilations, is the property of CollegePredictor or its licensors and is protected by copyright, trademark, and other intellectual property laws.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Content</h3>
                <p className="text-gray-700 leading-relaxed">
                  You retain ownership of the information you provide to us. However, by submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, store, and process your information to provide and improve the Service.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Restrictions</h3>
                <p className="text-gray-700 leading-relaxed">
                  You may not:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
                  <li>Copy, reproduce, or distribute our content without permission</li>
                  <li>Modify, reverse engineer, or create derivative works</li>
                  <li>Remove copyright or proprietary notices</li>
                  <li>Use our trademarks or branding without authorization</li>
                </ul>
              </div>
            </div>
          </section>

          {/* AI Counselling */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Counselling Service</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Our AI-powered counselling feature provides automated guidance based on your queries. You understand that:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li>AI responses are generated by artificial intelligence and may not always be accurate</li>
              <li>AI counselling is not a substitute for professional human counselling</li>
              <li>You should verify important information with qualified educational counsellors</li>
              <li>We are not liable for decisions made based on AI-generated advice</li>
              <li>Conversations may be stored to improve service quality</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services and Links</h2>
            
            <p className="text-gray-700 leading-relaxed">
              Our Service may contain links to third-party websites or services that are not owned or controlled by CollegePredictor. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be liable for any damage or loss caused by your use of any third-party services.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            
            <div className="bg-gray-100 border-l-4 border-gray-400 p-6 rounded mb-4">
              <p className="text-gray-800 font-semibold mb-2">Disclaimer of Warranties</p>
              <p className="text-gray-700 leading-relaxed">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              To the fullest extent permitted by law, CollegePredictor shall not be liable for:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li>Indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or use</li>
              <li>Admission decisions or outcomes</li>
              <li>Inaccuracies in predictions or college information</li>
              <li>Service interruptions or technical issues</li>
              <li>Unauthorized access to your account or data</li>
              <li>Actions or content of third parties</li>
            </ul>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
            
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify, defend, and hold harmless CollegePredictor, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li>Your use or misuse of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Any content you submit or share</li>
            </ul>
          </section>

          {/* Payment and Fees */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fees and Payment</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Currently, CollegePredictor offers its basic services free of charge. If we introduce premium features or subscription plans in the future:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li>We will provide clear notice before charging any fees</li>
              <li>All fees will be clearly displayed and must be agreed upon by you</li>
              <li>Payments are non-refundable except as required by law</li>
              <li>We reserve the right to change pricing with advance notice</li>
            </ul>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications to Terms</h2>
            
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. Material changes will be notified through:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li>Posting updated Terms on this page</li>
              <li>Updating the "Last Updated" date</li>
              <li>Email notification for significant changes</li>
            </ul>
            
            <p className="text-gray-700 leading-relaxed mt-4">
              Your continued use of the Service after any changes constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              You may terminate your account at any time by:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
              <li>Contacting our support team</li>
              <li>Using the account deletion feature (if available)</li>
            </ul>
            
            <p className="text-gray-700 leading-relaxed mt-4">
              We may terminate or suspend your access immediately, without prior notice, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will immediately cease. Provisions that should survive termination will remain in effect.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law and Dispute Resolution</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              Any disputes arising from these Terms or your use of the Service shall be resolved through:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li>Good faith negotiations between the parties</li>
              <li>Mediation or arbitration if negotiations fail</li>
              <li>Courts in Maharashtra, India, if arbitration is not successful</li>
            </ul>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Severability</h2>
            
            <p className="text-gray-700 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
            </p>
          </section>

          {/* Entire Agreement */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Entire Agreement</h2>
            
            <p className="text-gray-700 leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and CollegePredictor regarding the use of the Service and supersede any prior agreements.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-indigo-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> <a href="mailto:collegespredictor@gmail.com" className="text-indigo-600 hover:text-indigo-500">collegespredictor@gmail.com</a></p>
              <p><strong>Address:</strong> Ratnagiri, Maharashtra, India</p>
              <p><strong>Support Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM IST</p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="border-t border-gray-200 pt-6">
            <p className="text-gray-700 leading-relaxed">
              By using CollegePredictor, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these Terms, you must not access or use our Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
