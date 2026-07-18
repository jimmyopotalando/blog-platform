import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} BlogPlatform. All rights reserved.</p>
        <div className="space-x-4">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/about" className="hover:text-white">About</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
