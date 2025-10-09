import React, { useState } from 'react';
import Link from 'next/link';
import { Button, ButtonProps } from './button';

interface NavigationButtonProps extends Omit<ButtonProps, 'onClick'> {
  href: string;
  children: React.ReactNode;
  loadingText?: string;
}

export function NavigationButton({ 
  href, 
  children, 
  loadingText = 'Loading...',
  ...props 
}: NavigationButtonProps) {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = () => {
    setIsNavigating(true);
    // Reset loading state after a short delay to show the loading effect
    setTimeout(() => setIsNavigating(false), 500);
  };

  return (
    <Button
      {...props}
      loading={isNavigating}
      loadingText={loadingText}
      asChild
    >
      <Link href={href} onClick={handleClick}>
        {children}
      </Link>
    </Button>
  );
}

// Convenience components for common navigation use cases
export function PrimaryNavigationButton(props: Omit<NavigationButtonProps, 'variant'>) {
  return <NavigationButton variant="primary" {...props} />;
}

export function SecondaryNavigationButton(props: Omit<NavigationButtonProps, 'variant'>) {
  return <NavigationButton variant="secondary" {...props} />;
}
