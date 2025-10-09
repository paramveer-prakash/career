import React, { useState } from 'react';
import { Button, ButtonProps } from './button';

interface LinkButtonProps extends Omit<ButtonProps, 'onClick'> {
  href: string;
  children: React.ReactNode;
  loadingText?: string;
}

export function LinkButton({ 
  href, 
  children, 
  loadingText = 'Loading...',
  ...props 
}: LinkButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // Show loading state briefly for visual feedback
    setIsLoading(true);
    
    // Reset loading state after a short delay
    setTimeout(() => setIsLoading(false), 150);
    
    // Add a small delay to prevent flash
    e.preventDefault();
    setTimeout(() => {
      window.location.href = href;
    }, 50);
  };

  return (
    <Button
      {...props}
      loading={isLoading}
      loadingText={loadingText}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}

// Convenience components for common navigation use cases
export function PrimaryLinkButton(props: Omit<LinkButtonProps, 'variant'>) {
  return <LinkButton variant="primary" {...props} />;
}

export function SecondaryLinkButton(props: Omit<LinkButtonProps, 'variant'>) {
  return <LinkButton variant="secondary" {...props} />;
}
