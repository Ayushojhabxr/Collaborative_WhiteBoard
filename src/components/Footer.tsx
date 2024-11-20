import React from 'react';
import { Github, Linkedin } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} shadow-lg mt-auto`}>
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm">
            © {currentYear} Collaborative Whiteboard. All rights reserved by Ayush Ojha.
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Ayushojhabxr"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              title="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/ayush-ojha-977945253/"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              title="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}