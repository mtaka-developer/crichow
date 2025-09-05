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
          ? 'bg-white/80 backdrop-blur-sm shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="font-anton text-2xl">
            <span className="text-mtaka-green">CRI</span>
            <span className="text-practical-orange">CHOW</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="nav-link text-dark-gray hover:text-mtaka-green">
              About
            </a>
            <a href="#objectives" className="nav-link text-dark-gray hover:text-mtaka-green">
              Objectives
            </a>
            <a href="#coverage" className="nav-link text-dark-gray hover:text-mtaka-green">
              Coverage
            </a>
            <a href="#partners" className="nav-link text-dark-gray hover:text-mtaka-green">
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