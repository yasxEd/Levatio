"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, User, Phone, Calendar, CreditCard, Award, ChevronDown, ChevronUp, MapPin, Info } from 'lucide-react';

const passOptions = [
  { 
    id: 'fitness', 
    label: 'FITNESS PASS', 
    icon: '💪', 
    description: 'Access to gym equipment and fitness areas',
    price: '189 EUR/year',
    features: ['Full gym access', 'STRENGTH TRAINING', 'AQUAGYM', 'CARDIO CLASSES', "WOMEN'S ONLY SPACE"]
  },
  { 
    id: 'total', 
    label: 'TOTAL PASS', 
    icon: '🏆', 
    description: 'Full access to all facilities including aqua zone',
    price: '249 EUR/year',
    features: ['Complete access to all zones', 'STRENGTH TRAINING', 'AQUAGYM', 'CARDIO CLASSES', 'KICKBOXING', 'FULL BODY PUMP & CIRCUIT TRAINING', "WOMEN'S ONLY SPACE"]
  },
  { 
    id: 'kids', 
    label: 'PASS KIDS', 
    icon: '👶', 
    description: 'Specialized programs for young athletes',
    price: '119 EUR/year',
    features: ['OUTDOOR ACTIVITIES', 'PHYSICAL CONDITIONING', 'KICKBOXING', 'POOL & AQUAGYM', 'COMPETITIONS & CHALLENGES'] 
  }
];

const ContactSection = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    date: '',
    cinNumber: '',
    fitnessPass: '',
    additionalInfo: ''
  });
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [, setSelectedPass] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStep, setFormStep] = useState(1);
  
  // Refs
  const calendarRef = useRef<HTMLDivElement | null>(null);
  
  // Date picker functionality
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Calendar helpers
  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };
  
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
    
    const days = [];
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = today.getDate() === day && 
                      today.getMonth() === currentMonth && 
                      today.getFullYear() === currentYear;
      const isSelected = selectedDate && 
                         selectedDate.getDate() === day && 
                         selectedDate.getMonth() === currentMonth && 
                         selectedDate.getFullYear() === currentYear;
      const isPast = date < new Date(today.setHours(0, 0, 0, 0));
      
      days.push(
        <motion.div 
          key={`day-${day}`}
          whileHover={!isPast ? { scale: 1.1 } : undefined}
          whileTap={!isPast ? { scale: 0.95 } : undefined}
          onClick={() => {
            if (!isPast) {
              const newDate = new Date(currentYear, currentMonth, day);
              setSelectedDate(newDate);
              setFormData({...formData, date: formatDateForInput(newDate)});
              setShowCalendar(false);
            }
          }}
          className={`h-8 w-8 rounded-full flex items-center justify-center cursor-pointer text-sm transition-all duration-200 
            ${isPast ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-blue-500/20'} 
            ${isToday ? 'border border-blue-500' : ''} 
            ${isSelected ? 'bg-blue-500 text-white' : ''}`}
        >
          {day}
        </motion.div>
      );
    }
    
    return days;
  };
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Form validation
  const validateForm = (step: number) => {
    const errors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) errors.fullName = "Name is required";
      if (!formData.phone.trim()) errors.phone = "Phone number is required";
      
      // Updated validation for international phone numbers
      if (formData.phone.trim()) {
        // Remove any non-digit characters and plus sign for validation
        const phoneDigits = formData.phone.replace(/[^\d+]/g, '');
        
        // Check for international format (starts with + and has 7-15 digits)
        const isInternational = /^\+\d{7,15}$/.test(phoneDigits);
        
        // Check for local European format (starts with 0 and has 9-10 digits)
        const isLocalEuropean = /^0\d{8,9}$/.test(phoneDigits.replace('+', ''));
        
        if (!isInternational && !isLocalEuropean) {
          errors.phone = "Please enter a valid phone number (international: +1234567890 or local: 0123456789)";
        }
      }
    } else if (step === 2) {
      if (!formData.date) errors.date = "Please select a date";
      if (!formData.cinNumber.trim()) errors.cinNumber = "ID Number is required";
      if (!formData.fitnessPass) errors.fitnessPass = "Please select a membership type";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form navigation
  const goToNextStep = () => {
    if (validateForm(formStep)) {
      setFormStep(2);
    }
  };
  
  const goToPrevStep = () => {
    setFormStep(1);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm(formStep)) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission to backend
    setTimeout(() => {
      console.log('Form submitted:', formData);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: '',
          phone: '',
          date: '',
          cinNumber: '',
          fitnessPass: '',
          additionalInfo: ''
        });
        setFormStep(1);
        setSelectedDate(null);
      }, 5000);
    }, 1500);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // For phone field, allow international format
    if (name === 'phone') {
      // Allow digits, plus sign, spaces, hyphens, and parentheses, limit to reasonable length
      const phoneValue = value.replace(/[^\d+\s\-()]/g, '').substring(0, 20);
      
      setFormData(prev => ({
        ...prev,
        [name]: phoneValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear the error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  // Progress indicator
  const ProgressIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        <motion.div 
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${formStep === 1 ? 'bg-blue-500' : 'bg-blue-500/80'}`}
          animate={{ scale: [formStep === 1 ? 1.1 : 1, 1] }}
          transition={{ duration: 0.3 }}
        >
          1
        </motion.div>
        <div className={`h-1 w-16 ${formStep === 2 ? 'bg-blue-500' : 'bg-gray-700'} transition-colors duration-500`}></div>
        <motion.div 
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${formStep === 2 ? 'bg-blue-500' : 'bg-gray-700'}`}
          animate={{ scale: [formStep === 2 ? 1.1 : 1, 1] }}
          transition={{ duration: 0.3 }}
        >
          2
        </motion.div>
      </div>
    </div>
  );
  
  // Form content based on step
  const renderFormContent = () => {
    switch (formStep) {
      case 1:
        return (
          <>
            <h3 className="text-xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Personal Information
            </h3>
            
            {/* Full Name Field */}
            <div className="relative mb-8">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
                <User size={18} />
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={() => setFocusedField('fullName')}
                onBlur={() => setFocusedField(null)}
                placeholder="Full Name"
                className={`w-full bg-gray-800 text-white border ${formErrors.fullName ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
              />
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: focusedField === 'fullName' ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
              {formErrors.fullName && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 ml-1"
                >
                  {formErrors.fullName}
                </motion.p>
              )}
            </div>
            
            {/* Phone Field */}
            <div className="relative mb-8">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
                <Phone size={18} />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                placeholder="Phone Number (international: +33123456789 or local: 0123456789)"
                className={`w-full bg-gray-800 text-white border ${formErrors.phone ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
              />
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: focusedField === 'phone' ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
              {formErrors.phone && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 ml-1"
                >
                  {formErrors.phone}
                </motion.p>
              )}
            </div>
            
            {/* Continue Button */}
            <motion.button
              type="button"
              onClick={goToNextStep}
              className="w-full relative overflow-hidden group bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 mt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Continue
                <ChevronDown size={18} className="transition-transform duration-300 group-hover:translate-y-1" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 z-0"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </>
        );
        
      case 2:
        return (
          <>
            <h3 className="text-xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Membership Details
            </h3>
            
            {/* Date Field with Calendar Popup */}
            <div className="relative mb-8">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
                <Calendar size={18} />
              </div>
              <input
                type="text"
                id="date"
                name="date"
                value={formData.date ? formatDateForDisplay(formData.date) : ''}
                readOnly
                onClick={() => setShowCalendar(prev => !prev)}
                placeholder="Select Start Date"
                className={`w-full bg-gray-800 text-white border ${formErrors.date ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 cursor-pointer`}
              />
              {formErrors.date && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 ml-1"
                >
                  {formErrors.date}
                </motion.p>
              )}
              
              {/* Calendar Popup */}
              <AnimatePresence>
                {showCalendar && (
                  <motion.div 
                    ref={calendarRef}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute z-30 mt-2 bg-black border border-gray-700 rounded-xl p-4 shadow-xl w-64"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <button 
                        onClick={() => {
                          if (currentMonth === 0) {
                            setCurrentMonth(11);
                            setCurrentYear(currentYear - 1);
                          } else {
                            setCurrentMonth(currentMonth - 1);
                          }
                        }}
                        className="p-1 hover:bg-gray-800 rounded text-white"
                      >
                        <ChevronDown className="rotate-90" size={16} />
                      </button>
                      <h4 className="font-medium text-white">
                        {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
                      </h4>
                      <button 
                        onClick={() => {
                          if (currentMonth === 11) {
                            setCurrentMonth(0);
                            setCurrentYear(currentYear + 1);
                          } else {
                            setCurrentMonth(currentMonth + 1);
                          }
                        }}
                        className="p-1 hover:bg-gray-800 rounded text-white"
                      >
                        <ChevronUp className="rotate-90" size={16} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                        <div key={index} className="text-xs text-gray-400">{day}</div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                      {renderCalendar()}
                    </div>
                    
                    <div className="mt-3 text-xs text-blue-400 flex items-center">
                      <Info size={12} className="mr-1" />
                      Select a date to continue
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* CIN Number Field */}
            <div className="relative mb-8">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
                <CreditCard size={18} />
              </div>
              <input
                type="text"
                id="cinNumber"
                name="cinNumber"
                value={formData.cinNumber}
                onChange={handleChange}
                onFocus={() => setFocusedField('cinNumber')}
                onBlur={() => setFocusedField(null)}
                placeholder="ID Number"
                className={`w-full bg-gray-800 text-white border ${formErrors.cinNumber ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
              />
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: focusedField === 'cinNumber' ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
              {formErrors.cinNumber && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 ml-1"
                >
                  {formErrors.cinNumber}
                </motion.p>
              )}
            </div>
            
            {/* Fitness Pass Field with Improved Selection */}
            <div className="relative mb-8">
              <h4 className="text-white font-medium mb-3 flex items-center">
                <Award size={18} className="mr-2 text-blue-400" />
                Membership Type
              </h4>
              
              {formErrors.fitnessPass && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mb-2"
                >
                  {formErrors.fitnessPass}
                </motion.p>
              )}
              
              <div className="space-y-3">
                {passOptions.map((option) => (
                  <motion.div 
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setFormData({...formData, fitnessPass: option.id});
                      setSelectedPass(option.id);
                    }}
                    className={`p-4 border ${formData.fitnessPass === option.id ? 'border-blue-500 bg-blue-900/30' : 'border-gray-700 hover:border-blue-500/50 hover:bg-blue-900/10'} rounded-lg cursor-pointer transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{option.icon}</div>
                        <div>
                          <h4 className="font-bold text-white">{option.label}</h4>
                          <p className="text-xs text-gray-300">{option.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className={`mr-3 text-sm font-medium ${formData.fitnessPass === option.id ? 'text-blue-400' : 'text-gray-300'}`}>
                          {option.price}
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${formData.fitnessPass === option.id ? 'border-blue-500 bg-blue-500/30' : 'border-gray-600'} flex items-center justify-center`}>
                          {formData.fitnessPass === option.id && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 rounded-full bg-blue-400"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Pass Details */}
                    <AnimatePresence>
                      {formData.fitnessPass === option.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 mt-3 border-t border-gray-700">
                            <ul className="space-y-2">
                              {option.features.map((feature, idx) => (
                                <motion.li 
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-center text-sm text-gray-300"
                                >
                                  <CheckCircle size={14} className="mr-2 text-blue-400" />
                                  {feature}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Additional Information Field */}
            <div className="relative mb-8">
              <div className="absolute left-4 top-4 text-blue-400">
                <Info size={18} />
              </div>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                onFocus={() => setFocusedField('additionalInfo')}
                onBlur={() => setFocusedField(null)}
                placeholder="Additional Information (Optional)"
                rows={3}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: focusedField === 'additionalInfo' ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Navigation & Submit Buttons */}
            <div className="flex space-x-4">
              <motion.button
                type="button"
                onClick={goToPrevStep}
                className="flex-1 relative overflow-hidden group bg-gray-800 text-white py-4 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ChevronUp size={18} className="transition-transform duration-300 group-hover:-translate-y-1" />
                  Back
                </span>
              </motion.button>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 relative overflow-hidden group bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 z-0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section id="contact" className="py-16 px-4 bg-black">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Join Our Fitness Community
          </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Complete the form below to get started with your fitness journey. Our team will contact you to finalize your membership.
            </p>
        </div>
        
        <div className="relative bg-black p-8 rounded-xl shadow-2xl border border-gray-800">
          {/* Success Message Overlay */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center rounded-xl z-50"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center"
                >
                  <CheckCircle size={40} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mt-6 mb-2">Application Submitted!</h3>
                <p className="text-gray-300 text-center mb-4 max-w-md">
                  Thank you for joining the LEVATIO family! Our team will contact you within 24 hours to confirm your membership details.
                </p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center text-sm text-blue-400"
                >
                  <MapPin size={16} className="mr-2" />
                  <span>We can&apos;t wait to see you at our gym!</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit}>
            {/* Progress Indicator */}
            {ProgressIndicator()}
            
            {/* Form Content */}
            {renderFormContent()}
          </form>
          
          {/* Contact Information */}
          <div className="mt-10 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <MapPin size={18} className="text-blue-400 mr-2" />
                <span className="text-gray-300 text-sm">Visit us at any of our locations</span>
              </div>
              
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors duration-300"
                >
                  <Phone size={18} />
                </motion.a>
                
                <motion.a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors duration-300"
                >
                  <MapPin size={18} />
                </motion.a>
                
                
              </div>
            </div>
          </div>
        </div>
        
        {/* Membership Benefits */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Benefit 1 */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
              <Award size={24} className="text-blue-400" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Premium Equipment</h3>
            <p className="text-gray-400 text-sm">Access state-of-the-art fitness equipment to maximize your workout results.</p>
          </div>
          
          {/* Benefit 2 */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
              <User size={24} className="text-purple-400" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Expert Coaching</h3>
            <p className="text-gray-400 text-sm">Receive guidance from certified trainers who will help you achieve your goals.</p>
          </div>
          
          {/* Benefit 3 */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
              <Calendar size={24} className="text-blue-400" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Flexible Schedules</h3>
            <p className="text-gray-400 text-sm">Enjoy extended opening hours to fit workouts into your busy lifestyle.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;