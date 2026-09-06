"use client";
import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import GoldBookLoader from './GoldBookLoader';

export default function PageTransitionLoader({ duration = 180 }: { duration?: number }) {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(pathname ?? null);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (prevPath.current === null) {
      prevPath.current = pathname ?? null;
      return;
    }

    if (pathname && pathname !== prevPath.current) {
      setVisible(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setVisible(false);
      }, duration);
      prevPath.current = pathname;
    }

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [pathname, duration]);

  return <GoldBookLoader visible={visible} ariaLabel="Page transition" />;
}
