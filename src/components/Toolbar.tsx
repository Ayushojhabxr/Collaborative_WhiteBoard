import React, { useState } from 'react';
import { 
  Pencil, 
  Square, 
  Circle, 
  MinusIcon, 
  Download, 
  Trash2,
  Image as ImageIcon,
  Eraser,
  Type,
  Sun,
  Moon,
  Palette,
  GripHorizontal,
  HelpCircle
} from 'lucide-react';
import Wheel from '@uiw/react-color-wheel';

interface ToolbarProps {
  color: string;
  setColor: (color: string) => void;
  tool: string;
  setTool: (tool: string) => void;
  width: number;
  setWidth: (width: number) => void;
  onClear: () => void;
  onSave: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

interface Tool {
  id: string;
  icon: JSX.Element;
  tooltip: string;
  visible: boolean;
}

export default function Toolbar({
  color,
  setColor,
  tool,
  setTool,
  width,
  setWidth,
  onClear,
  onSave,
  onImageUpload,
  isDarkMode,
  toggleDarkMode
}: ToolbarProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showTooltips, setShowTooltips] = useState(true);
  const [tools, setTools] = useState<Tool[]>([
    { id: 'pencil', icon: <Pencil size={20} />, tooltip: 'Freehand Draw', visible: true },
    { id: 'line', icon: <MinusIcon size={20} />, tooltip: 'Line Tool', visible: true },
    { id: 'square', icon: <Square size={20} />, tooltip: 'Rectangle', visible: true },
    { id: 'circle', icon: <Circle size={20} />, tooltip: 'Circle', visible: true },
    { id: 'text', icon: <Type size={20} />, tooltip: 'Add Text', visible: true },
    { id: 'eraser', icon: <Eraser size={20} />, tooltip: 'Eraser', visible: true },
  ]);

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'
  ];

  const [isCustomizing, setIsCustomizing] = useState(false);

  const toggleToolVisibility = (toolId: string) => {
    setTools(tools.map(t => 
      t.id === toolId ? { ...t, visible: !t.visible } : t
    ));
  };

  return (
    <div className={`flex flex-col gap-4 p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-lg`}>
      {showTooltips && (
        <div className="bg-blue-100 text-blue-800 p-3 rounded-lg mb-4">
          <h4 className="font-bold mb-2">Welcome to the Whiteboard!</h4>
          <p className="text-sm">Click tools to draw, customize your toolbar, and collaborate in real-time.</p>
          <button 
            onClick={() => setShowTooltips(false)}
            className="text-xs text-blue-600 mt-2 hover:underline"
          >
            Got it!
          </button>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Tools</h3>
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            title="Customize Toolbar"
          >
            <GripHorizontal size={16} />
          </button>
        </div>
        
        {isCustomizing ? (
          <div className="grid grid-cols-2 gap-2">
            {tools.map((t) => (
              <label
                key={t.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={t.visible}
                  onChange={() => toggleToolVisibility(t.id)}
                  className="rounded text-blue-600"
                />
                <span className="flex items-center space-x-1">
                  {t.icon}
                  <span className="text-sm">{t.tooltip}</span>
                </span>
              </label>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tools.filter(t => t.visible).map((t) => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={`p-2 rounded-lg transition-colors ${
                  tool === t.id
                    ? 'bg-blue-100 text-blue-600'
                    : isDarkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                title={t.tooltip}
              >
                {t.icon}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Colors</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full border-2 transition-transform ${
                color === c ? 'scale-110 border-gray-400' : 'border-transparent'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            title="Custom Color"
          >
            <Palette size={20} />
          </button>
        </div>
        
        {showColorPicker && (
          <div className="mt-2">
            <Wheel
              color={color}
              onChange={(color) => setColor(color.hex)}
              className="max-w-[200px]"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Brush Size</h3>
        <input
          type="range"
          min="1"
          max="20"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs">
          <span>1px</span>
          <span>20px</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Actions</h3>
        <div className="flex flex-wrap gap-2">
          <label className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} cursor-pointer`}>
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
            <ImageIcon size={20} />
          </label>
          <button
            onClick={onSave}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
            title="Save Drawing"
          >
            <Download size={20} />
          </button>
          <button
            onClick={onClear}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
            title="Clear Canvas"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setShowTooltips(true)}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
            title="Show Help"
          >
            <HelpCircle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}