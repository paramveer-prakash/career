import React, { useState } from 'react';
import Link from 'next/link';

interface SmoothLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SmoothLink({ href, children, className = '', onClick }: SmoothLinkProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    
    // Show loading state briefly for visual feedback
    if (href.startsWith('/')) {
      setIsLoading(true);
      
      // Reset loading state after a short delay
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  return (
    <Link 
      href={href} 
      className={`${className} ${isLoading ? 'opacity-70' : ''} transition-opacity duration-200`}
      onClick={handleClick}
    >
      {children}
      {isLoading && (
        <span className="ml-2 inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
    </Link>
  );
}
