import { useNavigate } from 'react-router-dom';
import drugsData from '../data/drugs.json';
import { 
  Sparkles, ArrowRight, Beaker, Brain, Pill, Microscope, Dna, 
  ChevronRight, FileText, Database, BarChart, Users, Star, Trophy, Award
} from 'lucide-react';
import drugParadigmIntro from '../assets/images/drugparadigm_dashboard1.png';
import { GetAllDrugModalities } from "../redux/drugmodailities/actionCreator";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    console.log(`calling the api`);
    dispatch(GetAllDrugModalities());
    console.log(`called the api ***`);

    // Animation timing
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // Ensure page starts at the top
    window.scrollTo(0, 0);
  }, [dispatch]);

  // Background medical icon elements
  const BackgroundIcons = () => {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-10 -left-10 text-blue-100/5 dark:text-blue-800/5">
          <Dna size={240} />
        </div>
        <div className="absolute top-1/4 -right-10 text-purple-100/5 dark:text-purple-800/5">
          <Pill size={200} strokeWidth={1} />
        </div>
        <div className="absolute bottom-1/4 -left-20 text-pink-100/5 dark:text-pink-800/5">
          <Beaker size={220} />
        </div>
        <div className="absolute -bottom-20 right-1/4 text-indigo-100/5 dark:text-indigo-800/5">
          <Microscope size={260} />
        </div>
        
        {/* Additional floating elements */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
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
      </div>
    );
  };

  // Stats for Hero section
  const stats = [
    { label: "Research Time Reduction", value: "60%", icon: <BarChart size={18} className="text-purple-400" /> },
    { label: "Success Rate", value: "45%", icon: <Trophy size={18} className="text-amber-400" /> },
    { label: "Research Partners", value: "300+", icon: <Users size={18} className="text-blue-400" /> },
    { label: "Compounds Analyzed", value: "10M+", icon: <Database size={18} className="text-emerald-400" /> },
  ];

  // Tabs for the header card
  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="animate-fadeIn">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Revolutionizing pharmaceutical research with AI-powered solutions for faster,
              more efficient drug development. Our cutting-edge platform accelerates the discovery
              process by analyzing molecular structures with unprecedented accuracy.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Using advanced neural networks and machine learning algorithms, we've reduced
              research time by 60% while increasing successful candidate identification by 45%.
              Join the hundreds of research teams already transforming their drug discovery
              pipeline with our technology.
            </p>
          </div>
        );
      case 'features':
        return (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {[
                { title: "AI-Powered Analysis", desc: "Our algorithms predict binding affinity with 92% accuracy" },
                { title: "Molecular Docking", desc: "Simulate protein-ligand interactions in real-time" },
                { title: "ADMET Prediction", desc: "Forecast pharmacokinetic properties before synthesis" },
                { title: "Scaffold Hopping", desc: "Identify novel chemical structures with similar activity" }
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                      <ChevronRight className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700 dark:text-purple-400">{feature.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'impact':
        return (
          <div className="animate-fadeIn">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 rounded-xl p-6 border border-purple-100 dark:border-purple-800/30 mb-6">
              <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-4">
                Industry Revolution
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our platform has transformed how pharmaceutical companies approach drug discovery,
                reducing costs by an average of 40% and time-to-market by 35%. Clinical trial success 
                rates have improved by 28% for drugs developed using our technology.
              </p>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Cost Reduction", value: "40%" },
                  { label: "Time-to-Market", value: "-35%" },
                  { label: "Trial Success", value: "+28%" },
                  { label: "Novel Compounds", value: "2,500+" }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-3 bg-white/60 dark:bg-gray-800/50 rounded-lg">
                    <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{stat.value}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-indigo-50 dark:from-gray-950 dark:to-indigo-950 min-h-screen relative overflow-hidden">
      <BackgroundIcons />
      
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Enhanced Hero Section with animated elements */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 shadow-xl max-w-full transform transition-all duration-700 hover:shadow-2xl">
          <div className="absolute inset-0 bg-grid-black/5 dark:bg-grid-white/5" style={{ backgroundSize: '32px 32px' }} />
          
          {/* Animated background elements */}
          <div className="absolute top-10 right-10 w-24 h-24 bg-purple-300/10 dark:bg-purple-600/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 left-40 w-36 h-36 bg-blue-300/10 dark:bg-blue-600/10 rounded-full blur-xl animate-pulse-slow"></div>
          
          <div className="absolute top-1/4 right-1/4 opacity-10 animate-float" style={{ animationDuration: '20s', animationDelay: '1s' }}>
            <Beaker className="w-10 h-10 text-pink-600" strokeWidth={1} />
          </div>
          
          <div className="absolute bottom-1/3 left-1/3 opacity-10 animate-float-slow" style={{ animationDuration: '25s', animationDelay: '2s' }}>
            <Brain className="w-12 h-12 text-purple-600" strokeWidth={1} />
          </div>
          
          <div className="relative p-8 md:p-12">
            {/* Badge with pulse effect */}
            <div className="inline-block mb-6 bg-white/30 dark:bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full animate-pulse relative overflow-hidden group">
              <div className="absolute inset-0 w-0 bg-white/10 transition-all duration-700 ease-out group-hover:w-full"></div>
              <span className="relative flex items-center gap-2 text-sm font-medium text-purple-800 dark:text-purple-300">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                AI-Driven Research Platform
              </span>
            </div>
            
            {/* Heading with enhanced animation */}
            <div className="relative">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 animate-gradient-x">
                Next-Generation Drug Discovery
              </h1>
              <div className="absolute -bottom-2 left-0 w-40 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-width"></div>
            </div>
            
            {/* Tabs for content switching */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
              <div className="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'features', label: 'Key Features' },
                  { id: 'impact', label: 'Industry Impact' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 relative ${
                      activeTab === tab.id 
                        ? 'text-purple-700 dark:text-purple-400 font-medium' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 dark:bg-purple-400"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Dynamic tab content */}
            {renderTabContent()}
            
            {/* Stats Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white/70 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-lg border border-gray-100 dark:border-gray-700"
                  style={{ animationDelay: `${100 * index}ms` }}
                >
                  <div className="flex items-center justify-center mb-2">
                    {stat.icon}
                  </div>
                  <p className="text-center text-2xl font-bold text-purple-700 dark:text-purple-400">{stat.value}</p>
                  <p className="text-center text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
            
            {/* Two Column Layout */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Left Column - Content */}
              <div className="w-full md:w-1/2 md:pr-12 transform transition-all duration-700 translate-y-0 hover:-translate-y-1">
                {/* Testimonial */}
                <div className="mb-8 p-5 bg-white/70 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700 relative">
                  <div className="absolute -top-3 -left-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/60">
                      <Star className="w-4 h-4 text-amber-500" fill="#F59E0B" />
                    </div>
                  </div>
                  <blockquote className="text-gray-600 dark:text-gray-300 italic mb-4">
                    "This platform has revolutionized our approach to drug discovery. What used to take months now takes days, allowing us to explore more compounds and increase our success rate significantly."
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center">
                      <Users className="w-4 h-4 text-purple-700 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Dr. Sarah Chen</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Director of Research, PharmaTech</p>
                    </div>
                  </div>
                </div>
              
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg hover:shadow-purple-200 dark:hover:shadow-purple-900/30 transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer"></span>
                    <span className="relative flex items-center gap-2">
                      Get Started
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                  <button className="group px-8 py-4 rounded-full bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 -translate-x-full group-hover:animate-shimmer"></span>
                    <span className="relative flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Download Whitepaper
                    </span>
                  </button>
                </div>
                
                {/* Trust Badges */}
                <div className="mt-8">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Trusted by leading research institutions:</p>
                  <div className="flex flex-wrap gap-3">
                    {['FDA Approved', 'ISO 9001', 'HIPAA Compliant', 'GxP Validated'].map((badge, idx) => (
                      <div key={idx} className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300 flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Image with enhanced animation */}
              <div className="w-full md:w-1/2 transform transition-all duration-700 translate-y-0 hover:-translate-y-2">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-purple-200/20 dark:shadow-purple-900/20 h-full relative group perspective-1000">
                  {/* Multiple layers for depth effect */}
                  <div className="absolute inset-0 translate-z-0 bg-gradient-to-tr from-purple-500/40 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:rotate-2"></div>
                  <div className="absolute inset-0 translate-z-0 bg-white/20 dark:bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
                  
                  {/* Dynamic corner elements */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-purple-600/10 dark:bg-purple-400/10 transition-all duration-700 transform group-hover:scale-150 group-hover:translate-x-4 group-hover:translate-y-4 z-0"></div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-pink-600/10 dark:bg-pink-400/10 transition-all duration-700 transform group-hover:scale-150 group-hover:-translate-x-4 group-hover:-translate-y-4 z-0"></div>
                  
                  {/* Main image with animation */}
                  <div className="relative z-10">
                    <img
                      src={drugParadigmIntro}
                      alt="Laboratory Research"
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Interactive particles */}
                  <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full bg-purple-600/20 animate-float-random"
                        style={{
                          width: `${Math.random() * 8 + 4}px`,
                          height: `${Math.random() * 8 + 4}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDuration: `${Math.random() * 6 + 3}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section - Retained but with enhanced styles */}
        <div className="text-center mb-12 transform transition-all duration-700">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 inline-block">
            Our Advanced Features
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Cutting-edge technology to accelerate your drug discovery process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />,
              title: "AI-Powered Analysis",
              description: "Advanced algorithms for precise molecular predictions and analysis",
              color: "blue"
            },
            {
              icon: <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400 group-hover:text-white transition-colors duration-300" />,
              title: "Deep Learning",
              description: "Neural networks trained on vast chemical databases for optimal results",
              color: "purple"
            },
            {
              icon: <Beaker className="w-8 h-8 text-pink-600 dark:text-pink-400 group-hover:text-white transition-colors duration-300" />,
              title: "Rapid Prototyping",
              description: "Quick iteration and validation of drug candidates with real-time feedback",
              color: "pink"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`group p-8 rounded-2xl bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-${feature.color}-100 dark:border-${feature.color}-900/30 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center transform`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-${feature.color}-100 dark:bg-${feature.color}-900/30 flex items-center justify-center mb-6 group-hover:bg-${feature.color}-600 dark:group-hover:bg-${feature.color}-500 transition-colors duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Drug Modalities - Enhanced with scroll to top functionality */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-400 inline-block">
              Drug Modalities
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our comprehensive range of drug development approaches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {drugsData.modalities.map((modality, index) => (
              <button
                key={modality.id}
                onClick={() => {
                  navigate(`/modal-detail/${modality.id}`);
                  window.scrollTo(0, 0); // Scroll to top when navigating
                }}
                className="group p-6 md:p-8 rounded-2xl bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-left w-full hover:shadow-xl transition-all duration-500 relative overflow-hidden hover:-translate-y-2"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 dark:group-hover:from-purple-500/10 dark:group-hover:to-pink-500/10 transition-all duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute -top-20 -right-20 text-purple-100/5 dark:text-purple-800/5">
                      {index % 3 === 0 && <Pill size={140} />}
                      {index % 3 === 1 && <Beaker size={140} />}
                      {index % 3 === 2 && <Microscope size={140} />}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {modality.name}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center group-hover:bg-purple-600 dark:group-hover:bg-purple-500 transition-colors duration-300">
                      <ArrowRight className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {modality.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 text-sm font-medium bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full transition-all duration-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/60">
                      {modality.category}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Custom animations */}
      <style>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes width-animation {
          0% { width: 0; }
          100% { width: 40%; }
        }
        
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
        
        @keyframes pulse-slow {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-width {
          animation: width-animation 1s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        .animate-fadeIn { 
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-shimmer {
          animation: shimmer 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}