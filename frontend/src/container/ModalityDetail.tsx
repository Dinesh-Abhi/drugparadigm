import {
  Dna,
  Brain,
  Beaker,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Microscope,
  PenTool,

  Atom,
  Layers,
  TestTube2,
  FlaskConical,
  Braces
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import data from '../data/drugmodalities.json';

function DeepProtacDynamic() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('models');
  const [isVisible, setIsVisible] = useState(false);

  // Sample models data
  const models = [
    {
      id: 'deep-protac',
      name: 'Deep PROTAC',
      description: 'Standard PROTAC prediction model for general protein degradation applications',
      icon: <Dna className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      color: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20',
      border: 'border-purple-100 dark:border-purple-800/30'
    },
    {
      id: 'diff-protac',
      name: 'Diff PROTAC',
      description: 'Specialized for cancer-related protein targets including KRAS and MYC',
      icon: <Beaker className="w-6 h-6 text-red-600 dark:text-red-400" />,
      color: 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20',
      border: 'border-red-100 dark:border-red-800/30'
    },
    {
      id: 'protac-neuro',
      name: 'Neuro PROTAC',
      description: 'Optimized for neurological targets including tau protein and α-synuclein',
      icon: <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      color: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      border: 'border-blue-100 dark:border-blue-800/30'
    },
    {
      id: 'protac-advanced',
      name: 'Advanced PROTAC Designer',
      description: 'Full-featured PROTAC design platform with custom linker optimization',
      icon: <Layers className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      color: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
      border: 'border-emerald-100 dark:border-emerald-800/30'
    },
    {
      id: 'protac-interactive',
      name: 'Interactive PROTAC Builder',
      description: 'An interactive toolset for crafting and simulating PROTAC molecules with dynamic linker customization, 3D visualization, and real-time feedback.',
      icon: <TestTube2 className="w-6 h-6 text-teal-600 dark:text-lime-400" />,
      color: 'from-teal-50 to-lime-50 dark:from-teal-900/20 dark:to-lime-900/20',
      border: 'border-teal-100 dark:border-teal-800/30'
    }
  ];

  // Animation on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);


  const renderTabContent = () => {
    if (activeTab === 'overview') {
      const tabData = data.tabs.find(tab => tab.id === 'overview');
      if (!tabData) return null;

      return (
        <div className="space-y-8 relative">
          {/* Background elements for overview */}
          <div className="absolute -top-10 -right-10 opacity-5 dark:opacity-10">
            <Dna className="w-40 h-40 text-purple-600" />
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed animate-fadeIn">
            {tabData.content.text}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tabData.content.features?.map((feature, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br ${index === 0
                    ? 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20'
                    : 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
                  } rounded-xl p-6 border ${index === 0
                    ? 'border-purple-100 dark:border-purple-800/30'
                    : 'border-blue-100 dark:border-blue-800/30'
                  } hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${index === 0
                      ? 'bg-purple-100 dark:bg-purple-900/40 group-hover:bg-purple-200 dark:group-hover:bg-purple-800'
                      : 'bg-blue-100 dark:bg-blue-900/40 group-hover:bg-blue-200 dark:group-hover:bg-blue-800'
                    } transition-colors duration-300`}
                >
                  {index === 0 ? (
                    <Dna className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <ul className="space-y-4">
                  {feature.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                    >
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                          <ChevronRight className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-purple-700 dark:text-purple-400">
                          {point.title}
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {point.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (activeTab === 'models') {
      // Models tab content
      return (
        <div className="space-y-6 relative">
          {/* Background decorative elements */}
          <div className="absolute top-0 -right-10 opacity-5 dark:opacity-10 animate-float-slow">
            <Atom className="w-48 h-48 text-purple-600" />
          </div>
          <div className="absolute bottom-20 left-10 opacity-5 dark:opacity-10 animate-float">
            <Microscope className="w-36 h-36 text-blue-600" />
          </div>
          
          {/* Animated particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full bg-purple-600/5 dark:bg-purple-400/10 animate-float-random"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 15}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
      
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 animate-fadeIn relative">
            Available PROTAC Models
            <span className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></span>
          </h3>
          
          <p className="text-gray-700 dark:text-gray-200 mb-6 animate-fadeIn">
            Choose from our specialized PROTAC models designed for different therapeutic applications.
            Each model is optimized for specific protein targets and degradation pathways.
          </p>
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {models.map((model, idx) => (
              <div
                key={model.id}
                onClick={() => {
                  // Add click animation class
                  const element = document.getElementById(`model-card-${model.id}`);
                  if (element) {
                    element.classList.add('animate-card-click');
                    setTimeout(() => {
                      element.classList.remove('animate-card-click');
                      navigate(`/model/${model.id}`);
                    }, 400);
                  } else {
                    navigate(`/model/${model.id}`);
                  }
                }}
                id={`model-card-${model.id}`}
                className={`group cursor-pointer p-6 bg-gradient-to-br ${model.color} rounded-xl border ${model.border} transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl animate-fadeIn relative overflow-hidden`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/10 transition-all duration-500"></div>
                
                {/* Glowing accent on hover */}
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-purple-500/0 group-hover:bg-purple-500/10 rounded-full blur-xl transition-all duration-500 transform scale-0 group-hover:scale-100"></div>
                
                {/* Animated border on hover */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-blue-500/0 to-purple-600/0 group-hover:from-purple-600/20 group-hover:via-blue-500/20 group-hover:to-purple-600/20 animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white/70 dark:bg-gray-800/70 flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:shadow-md group-hover:shadow-purple-500/20">
                    {model.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white transition-all duration-300 group-hover:text-purple-800 dark:group-hover:text-purple-300">
                    {model.name}
                  </h4>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 relative z-10 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                  {model.description}
                </p>
                
                <div className="flex justify-end relative z-10">
                  <div className="text-sm font-medium text-purple-700 dark:text-purple-400 inline-flex items-center gap-1 transition-all duration-300 group-hover:translate-x-1 group-hover:text-purple-800 dark:group-hover:text-purple-300">
                    <ChevronRight size={16} className="transform transition-all duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
                
                {/* Pulse indicator on hover */}
                <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-purple-600/0 group-hover:bg-purple-600/50 transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <span className="absolute inset-0 rounded-full animate-ping bg-purple-600/30 group-hover:bg-purple-600/40"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
          
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Floating background icons */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 opacity-5 dark:opacity-10 animate-float">
          <Dna className="w-32 h-32 text-purple-600" />
        </div>
        <div className="absolute bottom-20 right-40 opacity-5 dark:opacity-10 animate-float-slow-reverse">
          <Atom className="w-36 h-36 text-purple-600" />
        </div>
      </div>

      {/* Header Section with Dynamic Content */}
      <div className={`relative rounded-3xl overflow-hidden transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-90"></div>
        <div className="absolute inset-0 bg-grid-white/10" style={{ backgroundSize: '24px 24px' }}></div>

        {/* Floating elements */}
        <div className="absolute top-12 right-12 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-8 left-24 w-32 h-32 bg-blue-300/10 rounded-full blur-xl animate-pulse-slow"></div>

        {/* Animated Molecules */}
        <div className="absolute top-20 left-10 opacity-20 animate-float">
          <Atom className="w-12 h-12 text-white" strokeWidth={1} />
        </div>

        <div
          className={`relative rounded-3xl overflow-hidden transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{ minHeight: '520px' }}
        >
          {/* Multi-layered dynamic background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-600 opacity-90"></div>
          <div className="absolute inset-0 bg-grid-white/10" style={{ backgroundSize: '24px 24px' }}></div>

          {/* Animated particle background */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/10 animate-float-random"
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 10 + 15}s`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>

          {/* Enhanced floating elements */}
          <div className="absolute top-12 right-12 w-36 h-36 bg-gradient-to-br from-blue-400/20 to-purple-400/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-8 left-24 w-48 h-48 bg-gradient-to-tr from-indigo-300/10 to-blue-300/10 rounded-full blur-xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

          {/* Animated Molecules with better positioning */}
          <div className="absolute top-20 left-10 opacity-30 animate-float" style={{ animationDuration: '15s' }}>
            <Atom className="w-12 h-12 text-white" strokeWidth={1} />
          </div>
          <div className="absolute bottom-20 right-20 opacity-20 animate-float" style={{ animationDuration: '18s', animationDelay: '2s' }}>
            <FlaskConical className="w-14 h-14 text-white" strokeWidth={1} />
          </div>
          <div className="absolute top-1/2 right-1/3 opacity-10 animate-float" style={{ animationDuration: '20s', animationDelay: '1s' }}>
            <Braces className="w-10 h-10 text-white" strokeWidth={1} />
          </div>

          {/* Main content area with improved animation sequence */}
          <div className="relative py-16 px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
            <div className="md:max-w-xl">
              {/* Badge with glowing effect */}
              <div className="inline-block mb-4 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium shadow-lg shadow-purple-500/20 border border-white/20 animate-fadeIn relative overflow-hidden group">
                <div className="absolute inset-0 w-0 bg-white/10 transition-all duration-700 ease-out group-hover:w-full"></div>
                <span className="relative flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  {data.header.subtitle}
                </span>
              </div>

              {/* Title with animated gradient text */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100" style={{ animationDelay: '150ms' }}>
                {data.header.title}
              </h1>

              {/* Description with enhanced styling */}
              <p className="text-lg text-white/90 mb-8 leading-relaxed animate-fadeIn" style={{ animationDelay: '300ms' }}>
                {data.header.description}
              </p>

              {/* Interactive buttons with hover effects */}
              <div className="flex flex-wrap gap-3 animate-fadeIn" style={{ animationDelay: '450ms' }}>
                {data.header.buttons.map((btn, idx) => (
                  <button
                    key={idx}
                    className={`inline-flex items-center gap-2 px-6 py-3 ${btn.className} rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group`}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                    <span className="relative flex items-center gap-2">
                      {btn.icon === 'Microscope' ? <Microscope size={18} /> : <PenTool size={18} />}
                      {btn.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced 3D floating card with better animation */}
            <div className={`flex-shrink-0 w-full md:w-96 h-96 relative perspective-1000 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
              {/* Multiple layer cards with interactive hover effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-2xl transform rotate-6 scale-90 hover:rotate-12 transition-all duration-500 ease-out"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-2xl transform -rotate-3 scale-95 hover:-rotate-6 transition-all duration-500 ease-out"></div>

              {/* Main card with hover effects and animations */}
              <div className="relative w-full h-full bg-white/10 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl p-6 transform hover:rotate-2 transition-all duration-500 ease-out group">
                {/* Inner elements with animated positioning */}
                <div className="absolute top-6 left-6 w-16 h-16 rounded-lg bg-gradient-to-br from-blue-400/20 to-purple-400/10 transform rotate-12 group-hover:rotate-45 transition-all duration-700"></div>
                <div className="absolute bottom-6 right-6 w-24 h-24 rounded-lg bg-gradient-to-tr from-indigo-300/20 to-blue-300/10 transform -rotate-12 group-hover:-rotate-45 transition-all duration-700"></div>

                {/* Central DNA animation with pulse effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative transform group-hover:scale-110 transition-all duration-700 group-hover:rotate-12">
                    <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl animate-pulse-slow"></div>
                    <Dna className="w-36 h-36 text-white/80 animate-pulse-slow relative z-10" strokeWidth={1} />
                  </div>
                </div>

                {/* Interactive molecule orbitals */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border border-white/10 animate-spin-slow relative">
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/40"></div>
                  </div>
                  <div className="w-64 h-64 rounded-full border border-white/5 animate-spin-slower relative" style={{ animationDirection: 'reverse' }}>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/40"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom wave decoration */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" className="w-full h-auto">
              <path fill="rgba(255,255,255,0.05)" d="M0,160L40,154.7C80,149,160,139,240,144C320,149,400,171,480,176C560,181,640,171,720,165.3C800,160,880,160,960,165.3C1040,171,1120,181,1200,181.3C1280,181,1360,171,1400,165.3L1440,160L1440,200L1400,200C1360,200,1280,200,1200,200C1120,200,1040,200,960,200C880,200,800,200,720,200C640,200,560,200,480,200C400,200,320,200,240,200C160,200,80,200,40,200L0,200Z"></path>
            </svg>
          </div>
        </div>

      </div>

      {/* Main content body with Dynamic Tabs */}
      <div className={`bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
        {/* Tabs - Only Overview and Models */}
        <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-8 py-4 text-sm font-medium transition-all duration-300 ${activeTab === 'overview'
                ? 'text-purple-700 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 bg-white dark:bg-gray-800'
                : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 bg-gray-50 dark:bg-gray-900'
              }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('models')}
            className={`px-8 py-4 text-sm font-medium transition-all duration-300 ${activeTab === 'models'
                ? 'text-purple-700 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 bg-white dark:bg-gray-800'
                : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 bg-gray-50 dark:bg-gray-900'
              }`}
          >
            Models
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8 transition-all duration-300">{renderTabContent()}</div>
      </div>

      {/* Navigation buttons */}
      <div className={`flex justify-between transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-400 rounded-full hover:bg-purple-50 dark:hover:bg-gray-700 transition border border-purple-200 dark:border-purple-800 shadow-sm hover:shadow-md hover:-translate-x-1 transform duration-300"
        >
          <ArrowLeft size={16} />
          Back to Overview
        </button>
      </div>

      {/* Add custom keyframes for animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes float-slow {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(7deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes float-reverse {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes float-slow-reverse {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-7deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes pulse-slow {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 7s ease-in-out infinite;
        }
        
        .animate-float-slow-reverse {
          animation: float-slow-reverse 9s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default DeepProtacDynamic;