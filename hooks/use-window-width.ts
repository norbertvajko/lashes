"use client";

import { breakpoints } from '@/constants/breakpoints/breakpoints';
import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  const [width, setWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    } else {
      return 0;
    }
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    setIsMobile(width < breakpoints.MOBILE);
  }, [width]);

  useEffect(() => {
    setIsTablet(width <= breakpoints.DESKTOP)
  }, [width]);

  return { width, isMobile, isTablet };
};

export default useWindowWidth;