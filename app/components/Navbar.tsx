import { Link } from "react-router";
import { useState } from "react";
import React from 'react';


interface MenuButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isOpen: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick, isOpen }) => (
    <button onClick={onClick} className="md:hidden p-2 text-white focus:outline-none z-50">
        {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
        )}
    </button>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 md:glass-effect sticky top-0 z-20"> 
      
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          <p className="text-3xl font-extrabold text-white tracking-tight">
            JobFit
          </p>
        </Link>

       
        <div className="hidden md:flex items-center space-x-6">
          
          <div className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="text-gray-300 hover:text-indigo-400 transition">
                Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-indigo-400 transition">
                About Us
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-indigo-400 transition">
                Contact Us
            </Link>
          </div>

         
          <Link 
            to="/upload" 
            className="bg-[#00F5FF90] text-white font-semibold rounded-lg px-4 py-2 text-sm shadow-md hover:bg-[#00F5FF] transition duration-150 ease-in-out"
          >
            Analyze Resume
          </Link>
          
        </div>
        
       
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)} isOpen={isMenuOpen} />

      </div>

      {/* MOBILE MENU DRAWER (Right Side Panel) */}
      <div className={`fixed top-0 right-0 h-full w-64 z-40 bg-gray-900 md:hidden transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="pt-20 px-6 flex flex-col space-y-6">
            
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-white hover:text-indigo-400 transition border-b border-gray-700 pb-3">
                Home
            </Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-white hover:text-indigo-400 transition border-b border-gray-700 pb-3">
                About Us
            </Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-white hover:text-indigo-400 transition border-b border-gray-700 pb-3">
                Contact Us
            </Link>
            
            
            <Link 
                to="/upload" 
                onClick={() => setIsMenuOpen(false)}
                className="mt-8 bg-[#00F5FF90] text-white font-semibold text-lg rounded-lg px-4 py-3 text-center shadow-lg hover:bg-[#00F5FF] transition duration-150 ease-in-out"
            >
                Analyze Resume
            </Link>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
