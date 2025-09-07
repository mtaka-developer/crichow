"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg' 
          : 'bg-black/20 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="font-anton text-2xl">
            <span className={`${isScrolled ? 'text-mtaka-green' : 'text-mtaka-green drop-shadow-lg'}`}>CRI</span>
            <span className={`${isScrolled ? 'text-practical-orange' : 'text-practical-orange drop-shadow-lg'}`}>CHOW</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className={`nav-link transition-colors ${isScrolled ? 'text-dark-gray hover:text-mtaka-green' : 'text-white hover:text-mtaka-green drop-shadow-md'}`}>
              About
            </a>
            <a href="#objectives" className={`nav-link transition-colors ${isScrolled ? 'text-dark-gray hover:text-mtaka-green' : 'text-white hover:text-mtaka-green drop-shadow-md'}`}>
              Objectives
            </a>
            <a href="#coverage" className={`nav-link transition-colors ${isScrolled ? 'text-dark-gray hover:text-mtaka-green' : 'text-white hover:text-mtaka-green drop-shadow-md'}`}>
              Coverage
            </a>
            <a href="#partners" className={`nav-link transition-colors ${isScrolled ? 'text-dark-gray hover:text-mtaka-green' : 'text-white hover:text-mtaka-green drop-shadow-md'}`}>
              Partners
            </a>
          </nav>

          <Link href="/login" className="btn-primary">
            DASHBOARD
          </Link>
        </div>
      </div>
    </header>
  );
}