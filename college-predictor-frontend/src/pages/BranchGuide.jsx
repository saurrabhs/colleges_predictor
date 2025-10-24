import { useState } from 'react';
import { 
  AcademicCapIcon, 
  ComputerDesktopIcon, 
  CircleStackIcon,
  CpuChipIcon,
  WrenchScrewdriverIcon,
  BoltIcon,
  BeakerIcon,
  BuildingOffice2Icon,
  LightBulbIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  TruckIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const BranchGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(null);

  const branches = [
    {
      id: 1,
      name: 'Computer Science and Engineering',
      shortName: 'CSE',
      category: 'core',
      icon: ComputerDesktopIcon,
      color: 'indigo',
      description: 'Computer Science Engineering is one of the most sought-after branches focusing on software development, algorithms, data structures, and computing systems.',
      subjects: ['Data Structures & Algorithms', 'Operating Systems', 'DBMS', 'Computer Networks', 'AI/ML', 'Web Development', 'Cloud Computing'],
      careerOptions: ['Software Developer', 'Data Scientist', 'ML Engineer', 'Cloud Architect', 'DevOps Engineer', 'Cybersecurity Analyst'],
      averageSalary: '₹4-15 LPA (Fresher), ₹15-50 LPA (Experienced)',
      topCompanies: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'Accenture', 'Meta'],
      significance: 'CSE is the backbone of the digital revolution. With technology penetrating every industry, CSE graduates are in extremely high demand globally.',
      advantages: [
        'Highest placement rates across engineering branches',
        'Diverse career opportunities in multiple domains',
        'Option to work remotely from anywhere',
        'Competitive salaries from the start',
        'Entrepreneurship opportunities in tech startups'
      ],
      futureScope: 'Exceptionally bright with AI, Quantum Computing, Blockchain, IoT, AR/VR. Demand expected to grow 15-20% annually.',
      skillsRequired: ['Problem Solving', 'Programming (Python, Java, C++)', 'Logical Thinking', 'Mathematics']
    },
    {
      id: 2,
      name: 'Information Technology',
      shortName: 'IT',
      category: 'core',
      icon: CircleStackIcon,
      color: 'blue',
      description: 'IT focuses on application of computing technology to solve real-world problems, network management, and information systems.',
      subjects: ['Software Engineering', 'Database Systems', 'Network Security', 'Web Technologies', 'Cloud Technologies', 'Mobile Development'],
      careerOptions: ['IT Consultant', 'Network Administrator', 'Systems Analyst', 'Database Administrator', 'Web Developer', 'Security Analyst'],
      averageSalary: '₹3.5-12 LPA (Fresher), ₹12-40 LPA (Experienced)',
      topCompanies: ['IBM', 'Oracle', 'Cisco', 'TCS', 'Cognizant', 'HCL', 'Tech Mahindra', 'Capgemini'],
      significance: 'IT bridges the gap between business needs and technology solutions, crucial for organizational digital transformation.',
      advantages: [
        'Strong job market with consistent demand',
        'Versatile career paths in various industries',
        'Good work-life balance',
        'Less coding-intensive than CSE',
        'Strong focus on practical applications'
      ],
      futureScope: 'Digital transformation accelerating - IT professionals in cloud computing, cybersecurity, and data analytics highly valued.',
      skillsRequired: ['Networking', 'Database Management', 'System Administration', 'Problem Solving']
    },
    {
      id: 3,
      name: 'Electronics and Telecommunication',
      shortName: 'ENTC',
      category: 'core',
      icon: CpuChipIcon,
      color: 'purple',
      description: 'ENTC deals with electronic devices, circuits, communication equipment, and transmission technologies.',
      subjects: ['Analog & Digital Electronics', 'Signal Processing', 'Communication Systems', 'Microprocessors', 'VLSI Design', 'Embedded Systems'],
      careerOptions: ['Telecom Engineer', 'RF Engineer', 'Embedded Systems Engineer', 'VLSI Design Engineer', 'IoT Developer'],
      averageSalary: '₹3-10 LPA (Fresher), ₹10-30 LPA (Experienced)',
      topCompanies: ['Qualcomm', 'Intel', 'Samsung', 'Broadcom', 'Texas Instruments', 'Reliance Jio', 'Airtel', 'Nokia'],
      significance: 'Fundamental to modern communication systems, from smartphones to satellites, enabling global connectivity.',
      advantages: [
        'Core engineering with hardware and software blend',
        'Strong foundation in electronics',
        'Growing demand in telecom and IoT sectors',
        'Opportunity for specialized wireless technologies',
        'Good placement in product-based companies'
      ],
      futureScope: '5G, 6G, IoT, satellite communication driving massive growth. Embedded systems and chip design booming.',
      skillsRequired: ['Circuit Analysis', 'Programming (C, C++)', 'Signal Processing', 'Hardware Knowledge']
    },
    {
      id: 4,
      name: 'Mechanical Engineering',
      shortName: 'MECH',
      category: 'core',
      icon: WrenchScrewdriverIcon,
      color: 'gray',
      description: 'One of the oldest and broadest disciplines, dealing with design, manufacturing, and maintenance of mechanical systems.',
      subjects: ['Thermodynamics', 'Fluid Mechanics', 'Machine Design', 'Manufacturing Processes', 'CAD/CAM', 'Automobile Engineering', 'Robotics'],
      careerOptions: ['Design Engineer', 'Production Engineer', 'Quality Engineer', 'Automobile Engineer', 'HVAC Engineer', 'Robotics Engineer'],
      averageSalary: '₹2.5-8 LPA (Fresher), ₹8-25 LPA (Experienced)',
      topCompanies: ['Tata Motors', 'Mahindra', 'L&T', 'Bajaj Auto', 'Bharat Forge', 'Godrej', 'Siemens', 'Bosch'],
      significance: 'Forms the backbone of manufacturing and industrial sectors, critical for economic development.',
      advantages: [
        'Versatile career options across industries',
        'Opportunity to work on innovative products',
        'Strong foundation for entrepreneurship',
        'Can transition to management roles easily',
        'Evergreen field with consistent demand'
      ],
      futureScope: 'Electric vehicles, renewable energy, automation, and Industry 4.0 creating new opportunities.',
      skillsRequired: ['CAD Software', 'Mathematical Skills', 'Problem Solving', 'Creativity', 'Practical Skills']
    },
    {
      id: 5,
      name: 'Electrical Engineering',
      shortName: 'EE',
      category: 'core',
      icon: BoltIcon,
      color: 'yellow',
      description: 'Focuses on study and application of electricity, electronics, and electromagnetism.',
      subjects: ['Power Systems', 'Electrical Machines', 'Control Systems', 'Power Electronics', 'Renewable Energy Systems', 'Instrumentation'],
      careerOptions: ['Power Systems Engineer', 'Control Engineer', 'Electrical Design Engineer', 'Renewable Energy Consultant', 'Automation Engineer'],
      averageSalary: '₹2.5-9 LPA (Fresher), ₹9-28 LPA (Experienced)',
      topCompanies: ['Siemens', 'ABB', 'GE', 'Schneider Electric', 'L&T', 'BHEL', 'Power Grid', 'Tata Power'],
      significance: 'Crucial for power generation, transmission, and distribution - the lifeline of modern civilization.',
      advantages: [
        'Core engineering with evergreen demand',
        'Opportunities in government and private sectors',
        'Work on renewable energy projects',
        'Good prospects in automation',
        'Option to join PSUs with job security'
      ],
      futureScope: 'Renewable energy, electric vehicles, and smart grids creating unprecedented opportunities.',
      skillsRequired: ['Circuit Analysis', 'Power Systems', 'Problem Solving', 'Mathematics', 'Safety Awareness']
    },
    {
      id: 6,
      name: 'Civil Engineering',
      shortName: 'CIVIL',
      category: 'core',
      icon: BuildingOffice2Icon,
      color: 'orange',
      description: 'Design, construction, and maintenance of physical and naturally built environment including infrastructure.',
      subjects: ['Structural Engineering', 'Geotechnical Engineering', 'Transportation', 'Environmental Engineering', 'Construction Management', 'Surveying'],
      careerOptions: ['Structural Engineer', 'Construction Manager', 'Site Engineer', 'Urban Planner', 'Highway Engineer', 'Project Manager'],
      averageSalary: '₹2-7 LPA (Fresher), ₹7-20 LPA (Experienced)',
      topCompanies: ['L&T Construction', 'Tata Projects', 'Shapoorji Pallonji', 'GMR Group', 'IRCON', 'RITES', 'NHAI', 'PWD'],
      significance: 'Build infrastructure society depends on - roads, bridges, buildings, water systems.',
      advantages: [
        'Work on mega infrastructure projects',
        'Strong government job opportunities',
        'Can start own construction firm',
        'Work visible and tangible',
        'Diverse specializations available'
      ],
      futureScope: 'Smart Cities Mission, PMAY, infrastructure development ensuring sustained growth. Green building focus.',
      skillsRequired: ['AutoCAD', 'Structural Analysis', 'Site Management', 'Problem Solving']
    },
    {
      id: 7,
      name: 'Chemical Engineering',
      shortName: 'CHEM',
      category: 'core',
      icon: BeakerIcon,
      color: 'green',
      description: 'Applies chemistry, physics, biology, and mathematics to transform raw materials into valuable products.',
      subjects: ['Chemical Reaction Engineering', 'Process Control', 'Heat Transfer', 'Mass Transfer', 'Thermodynamics', 'Petroleum Refining'],
      careerOptions: ['Process Engineer', 'Production Engineer', 'QA Engineer', 'Research Scientist', 'Plant Manager', 'Petrochemical Engineer'],
      averageSalary: '₹3-10 LPA (Fresher), ₹10-30 LPA (Experienced)',
      topCompanies: ['Reliance Industries', 'ONGC', 'IOCL', 'BPCL', 'UPL', 'Hindustan Unilever', 'P&G', 'Shell'],
      significance: 'Essential for pharmaceuticals, petrochemicals, food processing, and materials industries.',
      advantages: [
        'High-paying jobs in oil & gas sector',
        'Opportunities in diverse industries',
        'Strong demand in pharmaceutical sector',
        'Can work in R&D and innovation',
        'International career opportunities'
      ],
      futureScope: 'Green chemistry, biofuels, nanotechnology, and sustainable processes emerging with huge potential.',
      skillsRequired: ['Chemistry', 'Process Simulation', 'Problem Solving', 'Safety Awareness', 'Analytical Thinking']
    },
    {
      id: 8,
      name: 'AI and Data Science',
      shortName: 'AIDS',
      category: 'emerging',
      icon: LightBulbIcon,
      color: 'pink',
      description: 'Cutting-edge branch focusing on intelligent systems, machine learning, and extracting insights from data.',
      subjects: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Big Data Analytics', 'Data Mining', 'Neural Networks'],
      careerOptions: ['Data Scientist', 'ML Engineer', 'AI Research Scientist', 'Data Analyst', 'BI Analyst', 'Computer Vision Engineer'],
      averageSalary: '₹5-18 LPA (Fresher), ₹18-60 LPA (Experienced)',
      topCompanies: ['Google', 'Microsoft', 'Amazon', 'Facebook', 'Netflix', 'Uber', 'Goldman Sachs', 'McKinsey'],
      significance: 'Revolutionizing every industry - healthcare to finance, making it one of the most impactful fields.',
      advantages: [
        'Extremely high demand and salaries',
        'Work on cutting-edge technology',
        'Solve real-world problems',
        'Remote work opportunities',
        'Interdisciplinary applications'
      ],
      futureScope: 'AI is the future - autonomous vehicles, healthcare diagnostics, personalized education. Demand will only increase.',
      skillsRequired: ['Python Programming', 'Statistics & Mathematics', 'Data Analysis', 'Problem Solving']
    },
    {
      id: 9,
      name: 'AI and Machine Learning',
      shortName: 'AIML',
      category: 'emerging',
      icon: RocketLaunchIcon,
      color: 'cyan',
      description: 'Specializes in creating intelligent systems that can learn, adapt, and make decisions autonomously.',
      subjects: ['ML Algorithms', 'Deep Learning', 'Reinforcement Learning', 'Computer Vision', 'Robotics', 'AI Ethics', 'Pattern Recognition'],
      careerOptions: ['ML Engineer', 'AI Developer', 'Research Scientist', 'Robotics Engineer', 'CV Specialist', 'AI Consultant', 'MLOps Engineer'],
      averageSalary: '₹5-20 LPA (Fresher), ₹20-65 LPA (Experienced)',
      topCompanies: ['OpenAI', 'Google DeepMind', 'Tesla', 'NVIDIA', 'IBM Watson', 'Apple', 'Intel', 'Qualcomm'],
      significance: 'Forefront of technological innovation, driving autonomous systems, intelligent assistants, and predictive analytics.',
      advantages: [
        'Highest growth potential in engineering',
        'Work on breakthrough technologies',
        'Excellent international opportunities',
        'High intellectual satisfaction',
        'Entrepreneurship in AI startups'
      ],
      futureScope: 'AI revolution just beginning. From ChatGPT to self-driving cars, most in-demand skill for next decade.',
      skillsRequired: ['Advanced Mathematics', 'Python/R Programming', 'Deep Learning Frameworks', 'Research Skills']
    },
    {
      id: 10,
      name: 'Cyber Security',
      shortName: 'CS',
      category: 'emerging',
      icon: CircleStackIcon,
      color: 'red',
      description: 'Protecting systems, networks, and data from digital attacks and unauthorized access.',
      subjects: ['Network Security', 'Cryptography', 'Ethical Hacking', 'Information Security', 'Malware Analysis', 'Digital Forensics', 'Cloud Security'],
      careerOptions: ['Cybersecurity Analyst', 'Security Engineer', 'Ethical Hacker', 'Security Consultant', 'SOC Analyst', 'Penetration Tester'],
      averageSalary: '₹4-15 LPA (Fresher), ₹15-50 LPA (Experienced)',
      topCompanies: ['Cisco', 'Palo Alto Networks', 'CrowdStrike', 'FireEye', 'IBM Security', 'Deloitte', 'EY', 'KPMG'],
      significance: 'With increasing cyber threats, critical for protecting digital infrastructure worldwide.',
      advantages: [
        'Extremely high demand globally',
        'Excellent salary packages',
        'Constantly evolving and challenging',
        'Can work as freelance consultant',
        'Job security and growth'
      ],
      futureScope: 'Cyber attacks increasing exponentially. Demand for professionals will grow 30%+ annually.',
      skillsRequired: ['Network Protocols', 'Linux/Windows', 'Programming (Python)', 'Ethical Mindset', 'Continuous Learning']
    },
    {
      id: 11,
      name: 'Electronics & Computer',
      shortName: 'ECE',
      category: 'core',
      icon: CpuChipIcon,
      color: 'indigo',
      description: 'Combines electronics with computer engineering, covering both hardware and software aspects.',
      subjects: ['Digital Electronics', 'Microprocessors', 'Embedded Systems', 'VLSI Design', 'Computer Architecture', 'IoT', 'Robotics'],
      careerOptions: ['Embedded Systems Engineer', 'VLSI Engineer', 'Hardware Engineer', 'Chip Design Engineer', 'IoT Developer', 'Firmware Engineer'],
      averageSalary: '₹3.5-12 LPA (Fresher), ₹12-35 LPA (Experienced)',
      topCompanies: ['Intel', 'Qualcomm', 'NVIDIA', 'AMD', 'Samsung', 'MediaTek', 'Texas Instruments', 'Broadcom'],
      significance: 'Bridges hardware and software, essential for developing modern computing devices and embedded systems.',
      advantages: [
        'Versatility in hardware and software domains',
        'Strong placement in semiconductor companies',
        'Growing demand in IoT',
        'Option to work in chip design',
        'Can transition to software roles'
      ],
      futureScope: 'Chip shortage and Make in India for semiconductors - ECE engineers crucial. IoT and edge computing booming.',
      skillsRequired: ['Circuit Design', 'Programming (C, Verilog)', 'Microcontrollers', 'Hardware-Software Integration']
    },
    {
      id: 12,
      name: 'Instrumentation Engineering',
      shortName: 'INST',
      category: 'core',
      icon: ChartBarIcon,
      color: 'teal',
      description: 'Design and configuration of automated systems through measurement and control.',
      subjects: ['Process Control', 'Industrial Instrumentation', 'Sensors & Transducers', 'Control Systems', 'PLC & SCADA', 'Biomedical Instrumentation'],
      careerOptions: ['Instrumentation Engineer', 'Process Control Engineer', 'Automation Engineer', 'DCS Engineer', 'Calibration Engineer'],
      averageSalary: '₹2.5-9 LPA (Fresher), ₹9-25 LPA (Experienced)',
      topCompanies: ['Honeywell', 'Yokogawa', 'ABB', 'Emerson', 'Siemens', 'ONGC', 'IOCL', 'L&T'],
      significance: 'Critical for process industries, ensuring precision, safety, and efficiency in manufacturing.',
      advantages: [
        'Niche field with less competition',
        'High demand in oil & gas sector',
        'Blend of electronics and control systems',
        'Good opportunities in automation',
        'Can work in diverse sectors'
      ],
      futureScope: 'Industrial automation, smart manufacturing (Industry 4.0), IoT integration creating new opportunities.',
      skillsRequired: ['Control Systems', 'PLC Programming', 'Instrumentation Knowledge', 'Problem Solving']
    },
    {
      id: 13,
      name: 'Production Engineering',
      shortName: 'PROD',
      category: 'core',
      icon: TruckIcon,
      color: 'amber',
      description: 'Manufacturing processes, production planning, and industrial management.',
      subjects: ['Manufacturing Processes', 'Production Planning & Control', 'Industrial Engineering', 'Operations Research', 'Quality Control', 'Supply Chain'],
      careerOptions: ['Production Manager', 'Manufacturing Engineer', 'Quality Engineer', 'Operations Manager', 'Supply Chain Analyst', 'Industrial Engineer'],
      averageSalary: '₹2.5-8 LPA (Fresher), ₹8-22 LPA (Experienced)',
      topCompanies: ['Tata Motors', 'Mahindra', 'Bajaj Auto', 'L&T', 'Godrej', 'Kirloskar', 'Bosch', 'Siemens'],
      significance: 'Ensures efficient manufacturing, quality products, and optimized operations in industries.',
      advantages: [
        'Direct involvement in manufacturing',
        'Fast track to managerial positions',
        'Opportunity in diverse industries',
        'Good demand in automobile sector',
        'Can start manufacturing business'
      ],
      futureScope: 'Smart factories, lean manufacturing, supply chain optimization. Make in India boosting production engineering.',
      skillsRequired: ['Manufacturing Knowledge', 'Planning Skills', 'Quality Management', 'Leadership']
    },
    {
      id: 14,
      name: 'Automobile Engineering',
      shortName: 'AUTO',
      category: 'specialized',
      icon: TruckIcon,
      color: 'red',
      description: 'Specialized branch dealing with design, manufacturing, and operation of automobiles.',
      subjects: ['Automobile Design', 'Engine Technology', 'Vehicle Dynamics', 'Automotive Electronics', 'Electric Vehicles', 'Hybrid Technology'],
      careerOptions: ['Automobile Design Engineer', 'Production Engineer', 'R&D Engineer', 'Testing Engineer', 'EV Specialist', 'Service Engineer'],
      averageSalary: '₹2.5-9 LPA (Fresher), ₹9-25 LPA (Experienced)',
      topCompanies: ['Tata Motors', 'Mahindra & Mahindra', 'Maruti Suzuki', 'Hyundai', 'Bajaj Auto', 'TVS', 'Ola Electric'],
      significance: 'India being a major automobile market, crucial for the growing automotive industry.',
      advantages: [
        'Focused specialization in automotive sector',
        'Growing EV market creating opportunities',
        'Strong industry connect',
        'Hands-on practical experience',
        'Can work in motorsports'
      ],
      futureScope: 'Electric vehicles, autonomous driving, connected cars revolutionizing industry. Massive growth in EV sector.',
      skillsRequired: ['Mechanical Knowledge', 'CAD Software', 'Vehicle Dynamics', 'Innovation']
    },
    {
      id: 15,
      name: 'Biotechnology Engineering',
      shortName: 'BIOTECH',
      category: 'specialized',
      icon: BeakerIcon,
      color: 'lime',
      description: 'Applies engineering principles to biological systems for developing products and processes.',
      subjects: ['Genetic Engineering', 'Bioprocess Engineering', 'Microbiology', 'Biochemistry', 'Molecular Biology', 'Environmental Biotechnology'],
      careerOptions: ['Biotech Research Scientist', 'Process Engineer', 'QC Analyst', 'Clinical Research Associate', 'Biomedical Engineer'],
      averageSalary: '₹2.5-10 LPA (Fresher), ₹10-35 LPA (Experienced)',
      topCompanies: ['Biocon', 'Dr. Reddy\'s', 'Cipla', 'Sun Pharma', 'Serum Institute', 'Thermo Fisher', 'Novartis', 'Pfizer'],
      significance: 'Revolutionizing healthcare, agriculture, and environmental sustainability.',
      advantages: [
        'Work on life-saving innovations',
        'Growing pharmaceutical industry in India',
        'Research and innovation focus',
        'Interdisciplinary field',
        'International opportunities'
      ],
      futureScope: 'Personalized medicine, gene therapy, biofuels emerging. COVID vaccines showed biotech\'s critical importance.',
      skillsRequired: ['Biology & Chemistry', 'Laboratory Skills', 'Research Aptitude', 'Analytical Thinking']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Branches', count: branches.length },
    { id: 'core', name: 'Core Engineering', count: branches.filter(b => b.category === 'core').length },
    { id: 'emerging', name: 'Emerging Tech', count: branches.filter(b => b.category === 'emerging').length },
    { id: 'specialized', name: 'Specialized', count: branches.filter(b => b.category === 'specialized').length },
  ];

  const filteredBranches = branches.filter(branch => {
    const matchesCategory = selectedCategory === 'all' || branch.category === selectedCategory;
    const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.shortName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getColorClasses = (color) => {
    const colors = {
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200', hover: 'hover:border-indigo-400' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200', hover: 'hover:border-blue-400' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200', hover: 'hover:border-purple-400' },
      gray: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200', hover: 'hover:border-gray-400' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200', hover: 'hover:border-yellow-400' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200', hover: 'hover:border-orange-400' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200', hover: 'hover:border-green-400' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200', hover: 'hover:border-pink-400' },
      cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', border: 'border-cyan-200', hover: 'hover:border-cyan-400' },
      teal: { bg: 'bg-teal-100', text: 'text-teal-600', border: 'border-teal-200', hover: 'hover:border-teal-400' },
      amber: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200', hover: 'hover:border-amber-400' },
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200', hover: 'hover:border-red-400' },
      lime: { bg: 'bg-lime-100', text: 'text-lime-600', border: 'border-lime-200', hover: 'hover:border-lime-400' },
    };
    return colors[color] || colors.indigo;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AcademicCapIcon className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Engineering Branch Guide
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Comprehensive guide to all engineering branches available in Maharashtra colleges
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative mb-6">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search branches... (e.g., Computer Science, Mechanical)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map(branch => {
            const Icon = branch.icon;
            const colors = getColorClasses(branch.color);
            
            return (
              <div
                key={branch.id}
                onClick={() => setSelectedBranch(branch)}
                className={`bg-white rounded-xl shadow-md border-2 ${colors.border} ${colors.hover} transition-all cursor-pointer hover:shadow-xl p-6 flex flex-col`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`${colors.bg} p-3 rounded-lg`}>
                    <Icon className={`h-8 w-8 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{branch.name}</h3>
                    <span className={`inline-block px-2 py-1 ${colors.bg} ${colors.text} text-xs font-semibold rounded`}>
                      {branch.shortName}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {branch.description}
                </p>
                
                <div className="border-t pt-4 mt-auto">
                  <div className="text-sm mb-2">
                    <span className="font-semibold text-gray-700">Avg. Salary:</span>
                    <p className="text-gray-600 mt-1">{branch.averageSalary.split(',')[0]}</p>
                  </div>
                  <button className={`mt-3 w-full py-2 ${colors.bg} ${colors.text} font-semibold rounded-lg hover:opacity-80 transition-opacity`}>
                    View Full Details →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredBranches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No branches found matching your search.</p>
          </div>
        )}
      </div>

      {/* Detailed Modal */}
      {selectedBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto p-4">
          <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className={`${getColorClasses(selectedBranch.color).bg} p-8 rounded-t-2xl`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    {(() => {
                      const Icon = selectedBranch.icon;
                      return <Icon className={`h-12 w-12 ${getColorClasses(selectedBranch.color).text}`} />;
                    })()}
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{selectedBranch.name}</h2>
                      <p className="text-lg text-gray-700 mt-1">{selectedBranch.shortName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedBranch(null)}
                    className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedBranch.description}</p>
                </div>

                {/* Significance */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Why This Branch?</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedBranch.significance}</p>
                </div>

                {/* Key Subjects */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Key Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBranch.subjects.map((subject, idx) => (
                      <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career Options */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Career Opportunities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedBranch.careerOptions.map((career, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-700">
                        <span className="text-green-500">✓</span>
                        <span>{career}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advantages */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Key Advantages</h3>
                  <ul className="space-y-2">
                    {selectedBranch.advantages.map((adv, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Salary */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">💰 Average Salary</h3>
                  <p className="text-gray-700">{selectedBranch.averageSalary}</p>
                </div>

                {/* Top Companies */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Top Recruiters</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBranch.topCompanies.map((company, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Future Scope */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">🚀 Future Scope</h3>
                  <p className="text-gray-700">{selectedBranch.futureScope}</p>
                </div>

                {/* Skills Required */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Skills Required</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBranch.skillsRequired.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedBranch(null)}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchGuide;
