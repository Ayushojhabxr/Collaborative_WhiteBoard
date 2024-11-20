import React, { useEffect, useRef, useState } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';


interface Point {
  x: number;
  y: number;
}

interface DrawingElement {
  id: string;
  points: Point[];
  color: string;
  tool: string;
  width: number;
  text?: string;
}

interface CanvasProps {
  color: string;
  tool: string;
  width: number;
  isDarkMode: boolean;
}

export default function Canvas({ color, tool, width, isDarkMode }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentElement, setCurrentElement] = useState<DrawingElement | null>(null);
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [text, setText] = useState('');
  const [textPosition, setTextPosition] = useState<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set background color
    ctx.fillStyle = isDarkMode ? '#1f2937' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw all elements
    elements.forEach(element => {
      if (element.tool === 'text' && element.text) {
        ctx.font = `${element.width * 10}px Arial`;
        ctx.fillStyle = element.color;
        ctx.fillText(element.text, element.points[0].x, element.points[0].y);
        return;
      }

      if (element.points.length < 2) return;
      
      ctx.beginPath();
      ctx.moveTo(element.points[0].x, element.points[0].y);
      
      if (element.tool === 'eraser') {
        ctx.strokeStyle = isDarkMode ? '#1f2937' : '#ffffff';
      } else {
        ctx.strokeStyle = element.color;
      }
      
      ctx.lineWidth = element.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (element.tool === 'line') {
        const lastPoint = element.points[element.points.length - 1];
        ctx.lineTo(lastPoint.x, lastPoint.y);
      } else if (element.tool === 'square') {
        const lastPoint = element.points[element.points.length - 1];
        ctx.rect(
          element.points[0].x,
          element.points[0].y,
          lastPoint.x - element.points[0].x,
          lastPoint.y - element.points[0].y
        );
      } else if (element.tool === 'circle') {
        const lastPoint = element.points[element.points.length - 1];
        const radius = Math.sqrt(
          Math.pow(lastPoint.x - element.points[0].x, 2) +
          Math.pow(lastPoint.y - element.points[0].y, 2)
        );
        ctx.arc(element.points[0].x, element.points[0].y, radius, 0, 2 * Math.PI);
      } else {
        for (let i = 1; i < element.points.length; i++) {
          ctx.lineTo(element.points[i].x, element.points[i].y);
        }
      }
      
      if (element.tool === 'square' || element.tool === 'circle') {
        ctx.stroke();
      } else {
        ctx.stroke();
      }
    });
  }, [elements, isDarkMode]);

  useEffect(() => {
    const drawingsRef = ref(db, 'drawings');
    onValue(drawingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setElements(Object.values(data));
      } else {
        setElements([]);
      }
    });
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'text') {
      setTextPosition({ x, y });
      const input = prompt('Enter text:', '');
      if (input) {
        const newElement: DrawingElement = {
          id: uuidv4(),
          points: [{ x, y }],
          color,
          tool,
          width,
          text: input
        };
        setElements(prev => [...prev, newElement]);
        const drawingsRef = ref(db, `drawings/${newElement.id}`);
        set(drawingsRef, newElement);
      }
      return;
    }

    const newElement: DrawingElement = {
      id: uuidv4(),
      points: [{ x, y }],
      color,
      tool,
      width
    };

    setCurrentElement(newElement);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentElement) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const updatedElement = {
      ...currentElement,
      points: [...currentElement.points, { x, y }]
    };

    setCurrentElement(updatedElement);
    setElements(prev => [...prev.filter(el => el.id !== currentElement.id), updatedElement]);
  };

  const stopDrawing = () => {
    if (currentElement) {
      const drawingsRef = ref(db, `drawings/${currentElement.id}`);
      set(drawingsRef, currentElement);
    }
    setIsDrawing(false);
    setCurrentElement(null);
  };

  return (
    
      <canvas
        ref={canvasRef}
        
        className={`absolute w-full h-full cursor-crosshair align-middle ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      
  );
}