/**
 * Design System Constants
 * Centralized design tokens for consistent UI across the application
 */

export const designSystem = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7', // Main brand color - sophisticated blue
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
    },
    semantic: {
      success: '#059669',
      successLight: '#d1fae5',
      successDark: '#047857',
      warning: '#d97706',
      warningLight: '#fef3c7',
      warningDark: '#b45309',
      error: '#dc2626',
      errorLight: '#fee2e2',
      errorDark: '#b91c1c',
      info: '#0891b2',
      infoLight: '#cffafe',
      infoDark: '#0e7490',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    surface: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      elevated: '#ffffff',
      overlay: 'rgba(0, 0, 0, 0.5)',
    }
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      display: 'Sora, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'JetBrains Mono, "Fira Code", Consolas, "Liberation Mono", Menlo, Courier, monospace',
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
      '7xl': '4.5rem',   // 72px
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    }
  },
  spacing: {
    0: '0px',
    px: '1px',
    0.5: '0.125rem',  // 2px
    1: '0.25rem',     // 4px
    1.5: '0.375rem',  // 6px
    2: '0.5rem',      // 8px
    2.5: '0.625rem',  // 10px
    3: '0.75rem',     // 12px
    3.5: '0.875rem',  // 14px
    4: '1rem',        // 16px
    5: '1.25rem',     // 20px
    6: '1.5rem',      // 24px
    7: '1.75rem',     // 28px
    8: '2rem',        // 32px
    9: '2.25rem',     // 36px
    10: '2.5rem',     // 40px
    11: '2.75rem',    // 44px
    12: '3rem',       // 48px
    14: '3.5rem',     // 56px
    16: '4rem',       // 64px
    20: '5rem',       // 80px
    24: '6rem',       // 96px
    28: '7rem',       // 112px
    32: '8rem',       // 128px
  },
  borderRadius: {
    none: '0px',
    sm: '0.125rem',   // 2px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    glow: '0 0 20px rgb(59 130 246 / 0.15)',
  },
  transitions: {
    none: 'none',
    all: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slower: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  }
} as const;

// Button variant configurations
export const buttonVariants = {
  primary: {
    base: 'bg-primary-600 text-white border-transparent shadow-sm',
    hover: 'hover:bg-primary-700 hover:shadow-md hover:-translate-y-0.5',
    focus: 'focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    disabled: 'disabled:bg-primary-300 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none',
  },
  secondary: {
    base: 'bg-secondary-100 text-secondary-900 border-secondary-200 shadow-sm',
    hover: 'hover:bg-secondary-200 hover:shadow-md hover:-translate-y-0.5',
    focus: 'focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2',
    disabled: 'disabled:bg-secondary-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none',
  },
  destructive: {
    base: 'bg-semantic-error text-white border-transparent shadow-sm',
    hover: 'hover:bg-semantic-errorDark hover:shadow-md hover:-translate-y-0.5',
    focus: 'focus:ring-2 focus:ring-semantic-error focus:ring-offset-2',
    disabled: 'disabled:bg-semantic-errorLight disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none',
  },
  outline: {
    base: 'bg-white text-secondary-700 border-secondary-300 shadow-sm',
    hover: 'hover:bg-secondary-50 hover:border-secondary-400 hover:shadow-md hover:-translate-y-0.5',
    focus: 'focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    disabled: 'disabled:bg-secondary-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none',
  },
  ghost: {
    base: 'bg-transparent text-secondary-700 border-transparent',
    hover: 'hover:bg-secondary-100 hover:shadow-sm',
    focus: 'focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2',
    disabled: 'disabled:bg-transparent disabled:cursor-not-allowed',
  },
  success: {
    base: 'bg-semantic-success text-white border-transparent shadow-sm',
    hover: 'hover:bg-semantic-successDark hover:shadow-md hover:-translate-y-0.5',
    focus: 'focus:ring-2 focus:ring-semantic-success focus:ring-offset-2',
    disabled: 'disabled:bg-semantic-successLight disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none',
  },
  accent: {
    base: 'bg-accent-600 text-white border-transparent shadow-sm',
    hover: 'hover:bg-accent-700 hover:shadow-md hover:-translate-y-0.5',
    focus: 'focus:ring-2 focus:ring-accent-500 focus:ring-offset-2',
    disabled: 'disabled:bg-accent-300 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none',
  },
} as const;

// Button size configurations
export const buttonSizes = {
  xs: {
    padding: 'px-2.5 py-1',
    fontSize: 'text-xs',
    gap: 'gap-1',
    height: 'h-6',
  },
  sm: {
    padding: 'px-3 py-1.5',
    fontSize: 'text-sm',
    gap: 'gap-1.5',
    height: 'h-8',
  },
  md: {
    padding: 'px-4 py-2',
    fontSize: 'text-sm',
    gap: 'gap-2',
    height: 'h-10',
  },
  lg: {
    padding: 'px-6 py-3',
    fontSize: 'text-base',
    gap: 'gap-2',
    height: 'h-12',
  },
  xl: {
    padding: 'px-8 py-4',
    fontSize: 'text-lg',
    gap: 'gap-3',
    height: 'h-14',
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
