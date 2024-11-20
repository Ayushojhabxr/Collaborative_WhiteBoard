import React from 'react';
import { Palette, Sun, Moon, Github, Linkedin } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ isDarkMode, toggleDarkMode }: NavbarProps) {
  return (
    <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Palette className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Sketch Space
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Ayushojhabxr"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/ayush-ojha-977945253/"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Linkedin size={20} />
            </a>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}