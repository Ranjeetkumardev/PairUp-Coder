// Footer.jsx
import React from 'react';
import { Twitter, Linkedin,  Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#070a0ecc] text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold">My Company</h2>
            <p className="text-sm">Contact us: info@yourcompany.com</p>
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://facebook.com" target="_blank" className="hover:text-gray-400">
            <Facebook />
            </a>
            <a href="https://twitter.com" target="_blank"   className="hover:text-gray-400">
            <Twitter />
            </a>
            <a href="https://instagram.com" target="_blank"  className="hover:text-gray-400">
            <Instagram />
            </a>
            <a href="https://linkedin.com" target="_blank"  className="hover:text-gray-400">
            <Linkedin />
            </a>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
