import React, { useEffect, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState({
    mission: false,
    campaigns: false,
    approach: false,
    stats: false
  });

  useEffect(() => {
    const handleScroll = () => {
      const elements = {
        mission: document.getElementById('mission-section'),
        campaigns: document.getElementById('campaigns-section'),
        approach: document.getElementById('approach-section'),
        stats: document.getElementById('stats-section')
      };

      Object.keys(elements).forEach(key => {
        const element = elements[key];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) {
            setIsVisible(prev => ({ ...prev, [key]: true }));
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      {/* Hero Section with Animation */}
      <div 
        className="text-center mb-16 transform transition-all duration-700"
        style={{
          opacity: isVisible.mission ? 1 : 0,
          transform: `translateY(${isVisible.mission ? '0' : '20px'})`
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          About <span className="text-green-500">NGO Connect</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Bridging compassion with action to create sustainable social impact
        </p>
        
        {/* Animated decorative element */}
        <div className="flex justify-center mt-8">
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Mission Section with Image */}
      <div 
        id="mission-section"
        className="grid md:grid-cols-2 gap-10 mb-20 items-center"
      >
        <div className={`transform transition-all duration-700 ${isVisible.mission ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            NGO Connect is revolutionizing philanthropy by creating a transparent, 
            accountable ecosystem that connects donors, volunteers, and NGOs worldwide.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            We ensure every contribution creates measurable impact through rigorous 
            verification, real-time tracking, and community-driven implementation.
          </p>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500 shadow-md transform hover:scale-[1.02] transition-transform duration-300">
            <p className="text-gray-700 italic text-lg">
              "Building bridges of trust between compassion and action, ensuring no act of generosity goes unnoticed."
            </p>
          </div>
        </div>
        
        <div className={`transform transition-all duration-700 delay-300 ${isVisible.mission ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative bg-gradient-to-br from-green-100 to-blue-50 rounded-2xl overflow-hidden h-96">
              {/* Image placeholder - Replace with actual image */}
              <div className="w-full h-full flex flex-col items-center justify-center p-8">
                <div className="text-6xl mb-4 animate-bounce">🌍</div>
                <p className="text-gray-700 font-medium text-center mb-2">Our Global Impact</p>
                <p className="text-gray-500 text-sm text-center">Visualizing our reach across 45+ countries</p>
                <div className="mt-6 flex space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i}
                      className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 border-2 border-green-300 rounded-full animate-spin-slow"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-blue-300 rounded-full animate-spin-slow-reverse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Highlights with Images */}
      <div id="campaigns-section" className="mb-20">
        <h2 className="text-3xl font-bold text-green-600 mb-10 text-center">
          Our Campaign Focus Areas
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Medical Campaign */}
          <div 
            className={`transform transition-all duration-500 delay-100 ${isVisible.campaigns ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              {/* Image Container */}
              <div className="h-56 bg-gradient-to-br from-blue-100 to-cyan-100 relative overflow-hidden">
                {/* Placeholder Image Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-3 animate-pulse">🏥</div>
                    <p className="font-bold text-blue-700 text-lg">Medical Aid</p>
                  </div>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                
                {/* Animated particles */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-white rounded-full animate-float"></div>
                <div className="absolute top-10 right-6 w-2 h-2 bg-white rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Healthcare Initiatives</h3>
                <p className="text-gray-600 mb-4">
                  Providing medical camps, telemedicine, and essential medicines to remote communities through verified partners.
                </p>
                <div className="flex items-center justify-between">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    Active in 12 countries
                  </span>
                  <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300 transform hover:translate-x-1">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tree Planting Campaign */}
          <div 
            className={`transform transition-all duration-500 delay-300 ${isVisible.campaigns ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="h-56 bg-gradient-to-br from-green-100 to-emerald-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-3 animate-bounce">🌳</div>
                    <p className="font-bold text-green-700 text-lg">Tree Plantation</p>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-green-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                
                {/* Animated leaves */}
                <div className="absolute top-8 left-8 text-green-500 opacity-30 animate-float">🍃</div>
                <div className="absolute bottom-12 right-10 text-green-500 opacity-30 animate-float" style={{ animationDelay: '0.7s' }}>🍃</div>
              </div>
              
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Environmental Restoration</h3>
                <p className="text-gray-600 mb-4">
                  Community-led tree planting initiatives ensuring sustainable growth and local ecosystem restoration.
                </p>
                <div className="flex items-center justify-between">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    250K+ trees planted
                  </span>
                  <button className="text-green-600 font-medium hover:text-green-800 transition-colors duration-300 transform hover:translate-x-1">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Education Campaign */}
          <div 
            className={`transform transition-all duration-500 delay-500 ${isVisible.campaigns ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="h-56 bg-gradient-to-br from-amber-100 to-yellow-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-3 animate-wiggle">📚</div>
                    <p className="font-bold text-amber-700 text-lg">Education for All</p>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-amber-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                
                {/* Animated elements */}
                <div className="absolute top-6 right-8 text-amber-400 animate-ping">✏️</div>
              </div>
              
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Educational Access</h3>
                <p className="text-gray-600 mb-4">
                  Digital learning centers, scholarships, and educational infrastructure for underserved communities.
                </p>
                <div className="flex items-center justify-between">
                  <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
                    50K+ children impacted
                  </span>
                  <button className="text-amber-600 font-medium hover:text-amber-800 transition-colors duration-300 transform hover:translate-x-1">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div 
        id="stats-section"
        className="mb-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-10">Our Impact in Numbers</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "500+", label: "Verified NGOs", icon: "🏛️" },
            { value: "45+", label: "Countries", icon: "🌐" },
            { value: "$10M+", label: "Funds Deployed", icon: "💰" },
            { value: "50K+", label: "Volunteers", icon: "👥" }
          ].map((stat, index) => (
            <div 
              key={index}
              className={`text-center transform transition-all duration-500 delay-${index * 100} ${isVisible.stats ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            >
              <div className="text-4xl mb-2 animate-bounce">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Vision Section */}
      <div 
        id="approach-section"
        className="bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl p-8 mb-16 border border-green-100"
      >
        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
          Our Vision for the Future
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className={`transform transition-all duration-700 ${isVisible.approach ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">How We're Making a Difference</h3>
            
            <div className="space-y-4">
              {[
                {
                  title: "Blockchain Transparency",
                  desc: "Using distributed ledger technology for immutable donation tracking",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  title: "AI-Powered Matching",
                  desc: "Intelligent algorithms connecting donors with causes they care about",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  title: "Community Verification",
                  desc: "Local volunteers validate impact through real-time reporting",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  title: "Sustainable Partnerships",
                  desc: "Long-term collaborations ensuring lasting community impact",
                  color: "from-amber-500 to-orange-500"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 transform hover:scale-[1.02] transition-all duration-300 group"
                >
                  <div className="flex items-start">
                    <div className={`w-3 h-3 mt-2 rounded-full bg-gradient-to-r ${item.color} mr-3 group-hover:animate-pulse`}></div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`transform transition-all duration-700 delay-300 ${isVisible.approach ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-6 h-full border border-green-200">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Roadmap to 2030</h3>
              
              <div className="space-y-6">
                {[
                  { year: "2024", goal: "Launch mobile app with AR impact visualization" },
                  { year: "2025", goal: "Expand to 100+ countries with local language support" },
                  { year: "2026", goal: "Implement carbon footprint tracking for all projects" },
                  { year: "2030", goal: "Achieve 1 million active volunteers globally" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center group">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold mr-4 group-hover:animate-pulse">
                      {item.year}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{item.goal}</div>
                      <div className="w-32 h-1 bg-gradient-to-r from-green-300 to-emerald-400 rounded-full mt-1 transform origin-left group-hover:scale-x-110 transition-transform duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Animated element */}
              <div className="mt-8 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-200">
                <div className="flex items-center">
                  <div className="text-2xl mr-3 animate-spin-slow">✨</div>
                  <p className="text-gray-700 font-medium">
                    Join us in building a more transparent, impactful philanthropic ecosystem
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center transform transition-all duration-1000 hover:scale-[1.01]">
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white rounded-2xl p-10 shadow-xl relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>
          
          <h2 className="text-3xl font-bold mb-4 relative">Be Part of the Change</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto relative">
            Whether you donate, volunteer, or partner with us, every action creates ripples of positive change.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative">
            <button className="bg-white text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              Donate to a Cause
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
              Register Your NGO
            </button>
            <button className="bg-green-800 text-white font-semibold px-8 py-3 rounded-full hover:bg-green-900 transition-all duration-300 transform hover:-translate-y-1">
              Become a Volunteer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;