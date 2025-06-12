"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import ScheduleModal from "./ScheduleModal"; // Import the new ScheduleModal component

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false); // Add state for schedule modal

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dete</div>rmine active section based on scroll position
  useEffect(() => {
    const handleScrollSpy = () => {
      // Update the sections array to include "gyms"
      const sections = ["home", "gyms", "Schedules", "trainers", "pricing", "contact"];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    
    // Dispatch custom event so HeroSection can react to menu changes
    window.dispatchEvent(new CustomEvent('menuToggled', { 
      detail: { isOpen: newMenuState } 
    }));
  };

  // Function to handle schedule click
  const handleScheduleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsScheduleModalOpen(true);
    if (isMenuOpen) {
      toggleMenu(); // Close mobile menu if open
    }
  };

  return (
    <>
      {/* Initial navbar (non-sticky, transparent, only shown when at top) */}
      <nav className={`w-full z-40 bg-transparent absolute top-8 transition-all duration-500 ${
        scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center relative">
            {/* Centered Layout with Logo in center and nav items on sides */}
            <div className="flex items-center justify-center w-full">
              {/* Left navigation items (desktop) */}
              <div className="hidden md:flex space-x-12 pr-16">
                <NavLink href="#gyms" active={activeLink === "gyms"}>Gyms</NavLink>
                {/* Modified to use onClick instead of href */}
                <button 
                  onClick={handleScheduleClick}
                  className={`relative group py-2 px-1 bg-transparent border-0 cursor-pointer`}
                >
                  <span 
                    className={`relative text-lg transition-colors duration-300 ${activeLink === "Schedules" ? 'text-sky-400' : 'text-white group-hover:text-sky-400'}`}
                  >
                    Schedules
                    <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-sky-400 transform origin-left transition-all duration-300 ${activeLink === "Schedules" ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                  </span>
                </button>
              </div>
              
              {/* Centered Logo with enhanced effects */}
              <div className="flex justify-center relative z-10">
                <Link href="/" className="block">
                  <div className="relative group">
                    {/* Growing effect */}
                    <div className="relative overflow-hidden rounded-full p-1">
                      <Image
                        src="/Images/Logo.png"
                        alt="Logo"
                        width={160}
                        height={160}
                        className="transition-all duration-700 group-hover:scale-110 rounded-full"
                        priority
                      />
                    </div>
                  </div>
                </Link>
              </div>
              
              {/* Right navigation items (desktop) */}
              <div className="hidden md:flex space-x-12 pl-16">
                <NavLink href="#pricing" active={activeLink === "pricing"}>Pricing</NavLink>
                <NavLink href="#contact" active={activeLink === "contact"}>Contact</NavLink>
              </div>
            </div>

            {/*  Mobile Menu Button */}
            <button 
              className="md:hidden absolute right-4 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 w-12 h-12" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
              <span className={`absolute h-0.5 w-6 bg-white rounded transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-2.5' : 'top-1'}`}></span>
              <span className={`absolute h-0.5 w-6 bg-white rounded top-2.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0 -translate-x-2' : 'opacity-100 translate-x-0'}`}></span>
              <span className={`absolute h-0.5 w-6 bg-white rounded transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-2.5' : 'top-4'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden fixed inset-0 bg-gradient-to-b from-black/95 to-black/85 backdrop-blur-lg transform transition-all duration-500 ease-in-out z-50 ${
            isMenuOpen 
              ? "translate-y-0 opacity-100" 
              : "translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="h-full flex flex-col items-center justify-center space-y-8 py-16 px-6">
            <div className="mb-8">
              <Image src="/Images/Logo.png" alt="Levatio Logo" width={150} height={50} />
            </div>
            
            {/* Add the gyms link to mobile navigation as well */}
            <MobileNavLink href="#gyms" onClick={toggleMenu}>Gyms</MobileNavLink>
            
            {/* Modified to use onClick for Schedule */}
            <button 
              onClick={handleScheduleClick}
              className="relative group w-full text-center bg-transparent border-0 cursor-pointer"
            >
              <span 
                className="relative text-2xl text-white group-hover:text-sky-400 transition-all duration-300"
              >
                Schedules
                <span className="absolute -bottom-2 left-1/2 w-12 h-0.5 bg-sky-400 transform -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
              </span>
            </button>
            
            <MobileNavLink href="#pricing" onClick={toggleMenu}>Pricing</MobileNavLink>
            <MobileNavLink href="#contact" onClick={toggleMenu}>Contact</MobileNavLink>
            
            <button 
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <span className="absolute h-0.5 w-6 bg-white rounded rotate-45"></span>
              <span className="absolute h-0.5 w-6 bg-white rounded -rotate-45"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Vertical side navbar (appears when scrolled) */}
      <div 
        className={`fixed left-[10px] top-0 h-full z-50 flex items-center transition-all duration-500 ${
          scrolled ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        {/* Desktop version - Original logo */}
        <div className="transform transition-all bg-black/40 backdrop-blur-md p-4 rounded-lg shadow-lg border border-white/20 hidden md:block">
          <Link href="/" className="block relative group">
        <div className="">
          <Image
            src="/Images/logo2.png"
            alt="Levatio Logo"
            width={30}
            height={30}
            className="transition-all duration-300 hover:scale-110"
          />
        </div>
          </Link>
        </div>
      </div>

      {/* Mobile version - Smaller logo2.png positioned at same level as WhatsApp but on right */}
      <div 
        className={`fixed right-6 bottom-6 z-50 flex items-center transition-all duration-500 ${
          scrolled ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } md:hidden`}
      >
        <div className="transform transition-all bg-black/40 backdrop-blur-md p-2 rounded-lg shadow-lg border border-white/20">
          <Link href="/" className="block relative group">
            <div className="">
              <Image
                src="/Images/logo2.png"
                alt="Levatio Logo"
                width={28}
                height={28}
                className="transition-all duration-300 hover:scale-110"
              />
            </div>
          </Link>
        </div>
      </div>
      
      {/* Schedule Modal */}
      <ScheduleModal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} />
    </>
  );
};

// Enhanced Desktop Navigation Link Component with explicit styling
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, active }) => {
  return (
    <Link href={href} className="relative group py-2 px-1">
      <span 
        className={`relative text-lg transition-colors duration-300 ${active ? 'text-sky-400' : 'text-white group-hover:text-sky-400'}`}
      >
        {children}
        <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-sky-400 transform origin-left transition-all duration-300 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
      </span>
    </Link>
  );
};

// Mobile Navigation Link Component with explicit styling
interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, children, onClick }) => {
  return (
    <Link 
      href={href} 
      className="relative group w-full text-center"
      onClick={onClick}
    >
      <span 
        className="relative text-2xl text-white group-hover:text-sky-400 transition-all duration-300"
      >
        {children}
        <span className="absolute -bottom-2 left-1/2 w-12 h-0.5 bg-sky-400 transform -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
      </span>
    </Link>
  );
};

export default Navbar;