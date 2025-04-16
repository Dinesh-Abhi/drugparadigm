import { useNavigate } from 'react-router-dom';
import drugsData from '../data/drugs.json';
import { Sparkles, ArrowRight, Beaker, Brain, Pill, Microscope, Dna } from 'lucide-react';
import drugParadigmIntro from '../assets/images/drugparadigm_dashboard1.png';
import { GetAllDrugModalities } from "../redux/drugmodailities/actionCreator";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";


export default function Home() {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    console.log(`calling the api`);
    dispatch(GetAllDrugModalities());
    console.log(`called the api ***`);

    // Animation timing
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
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
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-indigo-50 dark:from-gray-950 dark:to-indigo-950 min-h-screen relative overflow-hidden">
      <BackgroundIcons />
      
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section - Two Column Layout with Increased Width */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 shadow-xl max-w-full transform transition-all duration-700 hover:shadow-2xl">
          <div className="absolute inset-0 bg-grid-black/5 dark:bg-grid-white/5" style={{ backgroundSize: '32px 32px' }} />
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center">
            {/* Left Column - Content */}
            <div className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0 transform transition-all duration-700 translate-y-0 hover:-translate-y-1">
              <div className="inline-block mb-6 bg-white/30 dark:bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full animate-pulse">
                <span className="text-sm font-medium text-purple-800 dark:text-purple-300">AI-Driven Research Platform</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 animate-fade-in">
                Drug Discovery
              </h1>
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
              {/* <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-purple-200 dark:hover:shadow-purple-900/30 transform hover:-translate-y-1 hover:scale-105">
                  Get Started
                </button>
                <button className="px-8 py-4 rounded-full bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium transform hover:-translate-y-1 hover:scale-105">
                  Learn More
                </button>
              </div> */}
            </div>

            {/* Right Column - Image */}
            <div className="w-full md:w-1/2 transform transition-all duration-700 translate-y-0 hover:-translate-y-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl h-full relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={drugParadigmIntro}
                  alt="Laboratory Research"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

       

        

        {/* Drug Modalities */}
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
                onClick={() => navigate(`/modal-detail/${modality.id}`)}
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


         {/* Features */}
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
      </div>
      </div>
  );
}