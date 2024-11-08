import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = false; // Teszt állapot, ezt a backend biztosítja

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">DUSZA</div>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-gray-300">Főoldal</Link>
            <Link to="/register" className="text-white hover:text-gray-300">Regisztráció</Link>
            <Link to="/login" className="text-white hover:text-gray-300">Bejelentkezés</Link>
            {isLoggedIn && <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>}
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link to="/" className="block text-white hover:text-gray-300">Főoldal</Link>
            <Link to="/register" className="block text-white hover:text-gray-300">Regisztráció</Link>
            <Link to="/login" className="block text-white hover:text-gray-300">Bejelentkezés</Link>
            {isLoggedIn && <Link to="/dashboard" className="block text-white hover:text-gray-300">Dashboard</Link>}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
