'use client';

import { useEffect, useRef } from 'react';

const ClientCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    // Track cursor state
    let isVisible = false;
    let isHovering = false;
    
    // Cursor follows mouse directly
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursor) return;

      if (!isVisible) {
        cursor.style.opacity = '1';
        isVisible = true;
      }
      
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      // Detect background brightness under the cursor
      detectBackgroundColor(e);
    };
    
    // Function to detect if background is dark or light
    const detectBackgroundColor = (e: MouseEvent) => {
      if (!cursor) return;
      
      // Get element under cursor
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (!element) return;
      
      // Get background color
      const bgColor = getComputedStyle(element).backgroundColor;
      
      // If it's transparent/none, try parent elements
      if (bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
        let parent = element.parentElement;
        let maxAttempts = 5; // Limit how far up we search
        
        while (parent && maxAttempts > 0) {
          const parentBg = getComputedStyle(parent).backgroundColor;
          if (parentBg !== 'transparent' && parentBg !== 'rgba(0, 0, 0, 0)') {
            // Found a parent with a background
            checkBrightness(parentBg);
            return;
          }
          parent = parent.parentElement;
          maxAttempts--;
        }
        
        // If we get here and found no valid background, assume light
        cursor.classList.remove('on-dark');
        cursor.classList.add('on-light');
      } else {
        // We have a valid background color
        checkBrightness(bgColor);
      }
    };
    
    // Check if color is dark or light
    const checkBrightness = (color: string) => {
      if (!cursor) return;
      
      // Extract RGB values
      const rgb = color.match(/\d+/g);
      if (!rgb || rgb.length < 3) return;
      
      // Calculate brightness using standard formula
      const brightness = (
        parseInt(rgb[0]) * 0.299 + 
        parseInt(rgb[1]) * 0.587 + 
        parseInt(rgb[2]) * 0.114
      ) / 255;
      
      // Brightness < 0.5 is considered "dark"
      if (brightness < 0.5) {
        cursor.classList.add('on-dark');
        cursor.classList.remove('on-light');
      } else {
        cursor.classList.remove('on-dark');
        cursor.classList.add('on-light');
      }
    };
    
    // Mouse button events
    const handleMouseDown = () => {
      cursor.classList.add('clicking');
    };
    
    const handleMouseUp = () => {
      cursor.classList.remove('clicking');
    };
    
    // Detect interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('clickable') ||
        target.classList.contains('group') ||
        target.role === 'button'
      );
      
      if (interactive && !isHovering) {
        isHovering = true;
        cursor.classList.add('hovering');
      } else if (!interactive && isHovering) {
        isHovering = false;
        cursor.classList.remove('hovering');
      }
    };
    
    // Hide default cursor
    document.documentElement.classList.add('custom-cursor');
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    
    // Initial state
    cursor.style.opacity = '0';
    
    return () => {
      // Clean up
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.classList.remove('custom-cursor');
    };
  }, []);
  
  return <div ref={cursorRef} className="cursor-dot on-light" />;
};

export default ClientCursor;