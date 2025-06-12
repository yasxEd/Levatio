"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MembershipSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    // Check both possible section IDs to handle possible mismatch
    const membershipSection = document.getElementById("membership-section");
    const pricingSection = document.getElementById("pricing");
    
    if (membershipSection) {
      observer.observe(membershipSection);
      console.log("Observing membership section");
    } else if (pricingSection) {
      observer.observe(pricingSection);
      console.log("Observing pricing section");
    } else {
      console.warn("CTA section elements not found in the DOM");
      setIsVisible(true); // Default to visible if sections can't be found
    }

    return () => {
      if (membershipSection) observer.unobserve(membershipSection);
      if (pricingSection) observer.unobserve(pricingSection);
    };
  }, []);

  const plans = [
    {
      id: 1,
      name: "FITNESS PASS",
      price: "189",
      currency: "EUR",
      period: "annually",
      popularity: false,
      features: [
        "STRENGTH TRAINING",
        "AQUAGYM",
        "CARDIO CLASSES",
        "WOMEN'S ONLY SPACE",
        "FREE REGISTRATION"
      ],
      buttonText: "JOIN NOW",
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50",
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500",
      buttonClass: "bg-blue-500 hover:bg-blue-600"
    },
    {
      id: 2,
      name: "TOTAL PASS",
      price: "249",
      currency: "EUR",
      period: "annually",
      popularity: true,
      features: [
        "STRENGTH TRAINING",
        "AQUAGYM",
        "CARDIO CLASSES",
        "KICKBOXING",
        "FULL BODY PUMP & CIRCUIT TRAINING",
        "WOMEN'S ONLY SPACE",
        "FREE REGISTRATION"
      ],
      buttonText: "JOIN NOW",
      color: "from-violet-600 to-purple-700",
      bgLight: "bg-purple-50",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-600",
      buttonClass: "bg-purple-600 hover:bg-purple-700"
    },
    {
      id: 3,
      name: "KIDS PASS",
      price: "119",
      currency: "EUR",
      period: "annually",
      popularity: false,
      features: [
        "OUTDOOR ACTIVITIES",
        "PHYSICAL CONDITIONING",
        "KICK-BOXING",
        "POOL & AQUAGYM",
        "COMPETITIONS & CHALLENGES"
      ],
      buttonText: "JOIN NOW",
      color: "from-teal-500 to-emerald-600",
      bgLight: "bg-teal-50",
      iconColor: "text-teal-500",
      iconBg: "bg-teal-500",
      buttonClass: "bg-teal-500 hover:bg-teal-600"
    }
  ];

  return (
    <section 
      id="pricing" // Add this id to make it a target for the navbar links
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      {/* Also add the original ID as a reference for backward compatibility */}
      <div id="membership-section" className="absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none"></div>
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-blue-100 to-transparent rounded-full blur-3xl opacity-30 -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-gradient-to-t from-purple-100 to-transparent rounded-full blur-3xl opacity-20 -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-amber-100 to-transparent rounded-full blur-3xl opacity-20 -z-10 animate-pulse" style={{ animationDuration: '12s' }} />
      
      {/* Fitness Wearable Image */}
      <div className="absolute right-0 top-1/4 hidden lg:block z-10">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Image 
            src="/Images/watch.png"
            alt="Fitness Wearable Device" 
            width={160}
            height={160}
            className="object-contain"
          />
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mb-20 relative"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 font-semibold text-sm mb-6">
            EXCLUSIVE OFFERS
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
            <span className="relative inline-block">
              <span className="relative z-10">MEMBERSHIP PLANS</span>
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-100 transform -rotate-1 z-0" />
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Choose the perfect membership plan tailored to your fitness journey and goals.
          </p>
        </motion.div>

        {/* Pricing Cards with equal height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.3 + index * 0.2 }}
              className="h-full"
            >
              {/* Adding padding-top to cards with no popular badge for equal height */}
              <div
                className={`relative h-full ${!plan.popularity ? "pt-6" : ""}`}
                onMouseEnter={() => setHoveredCard(plan.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Popular Badge - Fixed position with proper Z-index */}
                {plan.popularity && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-2 rounded-full text-white font-bold shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                
                {/* Card Container with Dynamic Border */}
                <div 
                  className={`h-full flex flex-col justify-between p-8 rounded-2xl ${plan.bgLight} ${
                    hoveredCard === plan.id 
                      ? "shadow-2xl ring-4 ring-offset-2" 
                      : plan.popularity 
                        ? "shadow-xl border-2 border-purple-200" 
                        : "shadow-lg border border-gray-200"
                  } relative overflow-hidden transition-all duration-300 ${
                    hoveredCard === plan.id ? "transform scale-105" : ""
                  }`}
                >
                  
                  
                  {/* Header Section */}
                  <div className="mb-6">
                    <div className="uppercase text-gray-500 font-medium text-sm tracking-wider mb-2 flex items-center">
                      <span className="font-medium text-lg mr-1"></span>
                      ANNUAL PAYMENT
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-4">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline">
                        <span className="text-6xl font-extrabold tracking-tight text-gray-900">
                        {plan.price}
                        </span>
                        <span className="ml-2 text-2xl font-medium text-gray-900">{plan.currency}</span>
                    </div>
                  </div>
                  
                  {/* Feature List */}
                  <div className="mb-8 flex-grow">
                    <ul className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full ${plan.iconBg} flex items-center justify-center`}>
                            <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="ml-3 text-gray-700 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* CTA Button */}
                  <div>
                    <button 
                      className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 ${plan.buttonClass} flex items-center justify-center`}
                    >
                      <span>{plan.buttonText}</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Additional Info with Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 mb-4">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            <span className="font-medium">100% satisfaction guarantee</span>
          </div>
            <p className="text-gray-600">All memberships include full access from day one. No hidden fees.</p>
        </motion.div>
      </div>
    </section>
  );
}