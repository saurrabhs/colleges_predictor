import { AcademicCapIcon, ChartBarIcon, ShieldCheckIcon, MapPinIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

const About = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">About Us</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Empowering Your College Decisions
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Our mission is to provide students with the most accurate and personalized college prediction tools to help them find their perfect academic path.
          </p>
        </div>
      </div>

      <div className="bg-gray-50/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-1 text-center lg:text-left">
              <h3 className="text-3xl font-bold text-gray-900">How It Works</h3>
              <p className="mt-3 text-lg text-gray-600">We use sophisticated algorithms and historical data to provide accurate college predictions.</p>
            </div>
            <div className="mt-10 lg:mt-0 lg:col-span-2">
              <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <ChartBarIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">Historical Cutoff Analysis</dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Our predictions are based on years of previous cutoff data from various colleges. We analyze admission trends, opening and closing ranks across multiple years to forecast your admission chances accurately.
                    </dd>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <AcademicCapIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">Personalized Matching</dt>
                    <dd className="mt-2 text-base text-gray-500">
                      We consider your rank, category (General, OBC, SC, ST), domicile state, gender quota, and branch preferences to provide personalized college recommendations that match your profile perfectly.
                    </dd>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <ClockIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">Real-Time Updates</dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Our database is regularly updated with the latest cutoff trends, college information, and admission patterns. We track changes year-over-year to improve prediction accuracy.
                    </dd>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <ShieldCheckIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">Disclaimer</dt>
                    <dd className="mt-2 text-base text-gray-500">
                      While we strive for the highest accuracy using historical data and advanced algorithms, our predictions are for informational and guidance purposes only. Actual admissions depend on various factors and seat availability.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Our Location Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900">Our Location</h3>
            <p className="mt-3 text-lg text-gray-600">Visit us or get in touch</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <MapPinIcon className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Address</h4>
              <p className="text-gray-600">Ratnagiri, Maharashtra</p>
              <p className="text-gray-600">India</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <EnvelopeIcon className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Email</h4>
              <p className="text-gray-600">collegespredictor@gmail.com</p>
              <a href="mailto:collegespredictor@gmail.com" className="mt-2 text-indigo-600 hover:text-indigo-500 font-medium">
                Send us an email
              </a>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <ClockIcon className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Support Hours</h4>
              <p className="text-gray-600">Monday - Saturday</p>
              <p className="text-gray-600">9:00 AM - 6:00 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
