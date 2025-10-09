/**
 * Design System Constants
 * Centralized design tokens for consistent UI across the application
 */

export const designSystem = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb', // Main brand color
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    semantic: {
      success: '#10b981',
      successLight: '#d1fae5',
      warning: '#f59e0b',
      warningLight: '#fef3c7',
      error: '#ef4444',
      errorLight: '#fee2e2',
      info: '#06b6d4',
      infoLight: '#cffafe',
    },
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    }
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'Sora, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'JetBrains Mono, "Fira Code", Consolas, monospace',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    }
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  }
} as const;

// Button variant configurations
export const buttonVariants = {
  primary: {
    base: 'bg-primary-600 border-transparent',
    hover: 'hover:bg-primary-700',
    focus: 'focus:ring-primary-500',
    disabled: 'disabled:bg-primary-300 disabled:cursor-not-allowed',
  },
  secondary: {
    base: 'bg-neutral-100 text-neutral-900 border-transparent',
    hover: 'hover:bg-neutral-200',
    focus: 'focus:ring-neutral-500',
    disabled: 'disabled:bg-neutral-50 disabled:cursor-not-allowed',
  },
  destructive: {
    base: 'bg-semantic-error text-gray-900 border-transparent',
    hover: 'hover:bg-red-700 hover:text-gray-900',
    focus: 'focus:ring-red-500',
    disabled: 'disabled:bg-red-300 disabled:cursor-not-allowed',
  },
  outline: {
    base: 'bg-white text-neutral-700 border-neutral-300',
    hover: 'hover:bg-neutral-50',
    focus: 'focus:ring-primary-500',
    disabled: 'disabled:bg-neutral-50 disabled:cursor-not-allowed',
  },
  ghost: {
    base: 'bg-transparent text-neutral-700 border-transparent',
    hover: 'hover:bg-neutral-100',
    focus: 'focus:ring-neutral-500',
    disabled: 'disabled:bg-transparent disabled:cursor-not-allowed',
  },
  success: {
    base: 'bg-semantic-success text-gray-900 border-transparent',
    hover: 'hover:bg-green-700 hover:text-gray-900',
    focus: 'focus:ring-green-500',
    disabled: 'disabled:bg-green-300 disabled:cursor-not-allowed',
  },
} as const;

// Button size configurations
export const buttonSizes = {
  sm: {
    padding: 'px-3 py-1.5',
    fontSize: 'text-sm',
    gap: 'gap-1.5',
  },
  md: {
    padding: 'px-4 py-2',
    fontSize: 'text-sm',
    gap: 'gap-2',
  },
  lg: {
    padding: 'px-6 py-3',
    fontSize: 'text-base',
    gap: 'gap-2',
  },
} as const;

// Utility function to get CSS custom properties
export const getCSSVar = (property: string) => `var(--${property})`;

// Color utility functions
export const getColor = (colorPath: string): string => {
  const keys = colorPath.split('.');
  let value: Record<string, unknown> = designSystem.colors;
  for (const key of keys) {
    value = value[key] as Record<string, unknown>;
  }
  return value as unknown as string;
};
