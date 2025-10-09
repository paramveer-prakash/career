import React from 'react';
import { Loader } from './loader';
import { buttonVariants, buttonSizes } from '@/lib/design-system';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText,
  children,
  className = '',
  disabled,
  asChild = false,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantConfig = buttonVariants[variant];
  const sizeConfig = buttonSizes[size];
  
  const variantClasses = [
    variantConfig.base,
    variantConfig.hover,
    variantConfig.focus,
    variantConfig.disabled,
  ].join(' ');
  
  const sizeClasses = [
    sizeConfig.padding,
    sizeConfig.fontSize,
    sizeConfig.gap,
  ].join(' ');
  
  const isDisabled = disabled || loading;
  
  const buttonClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;
  
  if (asChild && React.isValidElement(children)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childProps = children.props as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.cloneElement(children as any, {
      className: `${buttonClasses} ${childProps.className || ''}`,
      disabled: isDisabled,
      ...props,
    });
  }
  
  return (
    <button
      className={buttonClasses}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader 
            size="sm" 
            color={variant === 'outline' || variant === 'ghost' ? 'secondary' : 'white'} 
          />
          {loadingText || 'Loading...'}
        </>
      ) : (
        children
      )}
    </button>
  );
}

// Convenience components for common use cases
export function PrimaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="primary" {...props} />;
}

export function SecondaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="secondary" {...props} />;
}

export function DestructiveButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="destructive" {...props} />;
}

export function OutlineButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="outline" {...props} />;
}

export function GhostButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="ghost" {...props} />;
}

export function SuccessButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="success" {...props} />;
}