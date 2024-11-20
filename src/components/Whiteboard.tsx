import React, { useRef, useState } from 'react';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import Navbar from './Navbar';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';
import Footer from './Footer';

export default function Whiteboard() {
  const [color, setColor] = useState('#000000');
  const [tool, setTool] = useState('pencil');
  const [width, setWidth] = useState(2);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const canvasRef = useRef(null);

  const handleClear = () => {
    const drawingsRef = ref(db, 'drawings');
    set(drawingsRef, null);
  };

  const handleSave = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current?.querySelector('canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
      };
      img.src = event.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navbar */}
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <main className="flex-1 flex gap-4 px-4 py-4 overflow-hidden">
        {/* Toolbar */}
        <div className="w-1/4 flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <Toolbar
            color={color}
            setColor={setColor}
            tool={tool}
            setTool={setTool}
            width={width}
            setWidth={setWidth}
            onClear={handleClear}
            onSave={handleSave}
            onImageUpload={handleImageUpload}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        </div>

        {/* Canvas */}
        <div
          className="flex-1 flex justify-center items-center bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
        >
          <div
            className="relative bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg"
            style={{ width: '800px', height: '600px' }}
            ref={canvasRef}
          >
            <Canvas color={color} tool={tool} width={width} isDarkMode={isDarkMode} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
