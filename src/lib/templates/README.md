# Template System Documentation

## 🚀 Quick Start - Adding New Templates

### Method 1: One-Line Template Addition

```typescript
import { addTemplate } from '@/lib/templates/template-registry';

// Add a professional template
addTemplate('professional', 'finance', 'Finance Professional', 'Clean design for finance professionals', {
  primaryColor: '#059669'
});

// Add a modern template
addTemplate('modern', 'developer', 'Developer', 'Modern design for developers', {
  primaryColor: '#dc2626'
});

// Add a creative template
addTemplate('creative', 'designer', 'Designer', 'Creative designer portfolio', {
  primaryColor: '#ec4899'
});

// Add a minimal template
addTemplate('minimal', 'clean', 'Clean', 'Ultra-clean minimal design', {
  primaryColor: '#374151'
});
```

### Method 2: Quick Templates (Pre-configured)

```typescript
import { addQuickTemplate } from '@/lib/templates/template-registry';

// Add pre-configured templates
addQuickTemplate('corporate');    // Professional corporate style
addQuickTemplate('executive');    // Executive-level design
addQuickTemplate('tech');         // Modern tech industry style
addQuickTemplate('startup');      // Dynamic startup vibe
addQuickTemplate('designer');     // Creative designer portfolio
addQuickTemplate('artist');       // Artistic and expressive
addQuickTemplate('clean');        // Ultra-clean minimal design
addQuickTemplate('simple');       // Simple and elegant
```

### Method 3: Custom Templates (Full Control)

```typescript
import { addTemplate } from '@/lib/templates/template-registry';

addTemplate('custom', 'medical', 'Medical Professional', 'Clean design for medical professionals', {
  customConfig: {
    category: 'professional',
    layout: {
      header: {
        style: 'centered',
        showAvatar: true,
        showTitle: true
      },
      sections: {
        skills: {
          style: 'chips',
          position: 'full-width'
        },
        experience: {
          style: 'detailed',
          position: 'full-width'
        },
        education: {
          style: 'cards',
          position: 'full-width'
        }
      }
    },
    colors: {
      primary: '#0891b2',
      secondary: '#0e7490',
      accent: '#06b6d4',
      background: '#ffffff',
      text: '#0f172a'
    }
  }
});
```

## 🎨 Template Types

### Professional Templates
- **Style**: Clean, corporate, business-focused
- **Layout**: Split header, skills on left, experience on right
- **Colors**: Professional blues, grays, greens
- **Use Case**: Business professionals, executives, corporate roles

### Modern Templates
- **Style**: Contemporary, tech-focused, dynamic
- **Layout**: Centered header, timeline experience, skill bars
- **Colors**: Modern blues, teals, oranges
- **Use Case**: Tech professionals, developers, modern industries

### Creative Templates
- **Style**: Artistic, expressive, portfolio-focused
- **Layout**: Full-width sections, creative layouts
- **Colors**: Vibrant purples, pinks, creative palettes
- **Use Case**: Designers, artists, creative professionals

### Minimal Templates
- **Style**: Clean, sparse, typography-focused
- **Layout**: Simple two-column, minimal elements
- **Colors**: Black, white, grays
- **Use Case**: Minimalist preferences, academic, clean design

## 🔧 Template Configuration Options

### Header Options
```typescript
header: {
  style: 'centered' | 'left-aligned' | 'right-aligned' | 'split',
  showAvatar: boolean,
  showTitle: boolean
}
```

### Section Styles
```typescript
sections: {
  skills: {
    style: 'chips' | 'list' | 'grid' | 'bars',
    position: 'left' | 'right' | 'full-width'
  },
  experience: {
    style: 'cards' | 'timeline' | 'simple' | 'detailed',
    position: 'left' | 'right' | 'full-width'
  },
  education: {
    style: 'cards' | 'list' | 'simple',
    position: 'left' | 'right' | 'full-width'
  }
}
```

### Color Scheme
```typescript
colors: {
  primary: string,      // Main brand color
  secondary: string,    // Secondary color
  accent: string,       // Accent color
  background: string,   // Background color
  text: string         // Text color
}
```

### Typography
```typescript
typography: {
  headingFont: string,
  bodyFont: string,
  headingSize: 'small' | 'medium' | 'large'
}
```

## 📱 Automatic Features

### ✅ What's Generated Automatically

1. **HTML Structure**: Complete resume HTML with proper semantic markup
2. **CSS Styling**: Responsive CSS with print media queries
3. **Preview SVG**: Template gallery tile with exact visual representation
4. **Print Optimization**: A4-optimized styles for PDF generation
5. **Responsive Design**: Mobile-friendly layouts
6. **Accessibility**: Proper ARIA labels and semantic HTML

### 🎯 Consistency Guaranteed

- **App Preview**: Matches exactly what users see in the app
- **PDF Output**: Identical styling in generated PDFs
- **Template Gallery**: Preview tiles show exact template appearance
- **Responsive**: Works on all screen sizes
- **Print-Ready**: Optimized for A4 paper size

## 🚀 Integration with Existing System

### Update Template Gallery
Templates are automatically added to the template gallery with:
- Correct preview images
- Proper categorization
- Hover effects
- Selection states

### Update CSS Loader
CSS is automatically generated and cached for:
- Fast loading
- Consistent styling
- Print optimization

### Update HTML Generator
HTML generation is automatically handled with:
- Proper data binding
- Semantic markup
- Responsive design

## 📝 Example: Adding a New Template

```typescript
// 1. Import the function
import { addTemplate } from '@/lib/templates/template-registry';

// 2. Add your template (one line!)
addTemplate('professional', 'lawyer', 'Legal Professional', 'Professional design for legal professionals', {
  primaryColor: '#1e40af'
});

// 3. That's it! Your template is now:
// ✅ Available in the template gallery
// ✅ Has proper CSS styling
// ✅ Shows correct preview
// ✅ Works in PDF generation
// ✅ Is responsive and print-ready
```

## 🔍 Template Registry API

### Getting Templates
```typescript
import { getAllTemplates, getTemplatesByCategory, getTemplate } from '@/lib/templates/template-registry';

// Get all templates
const allTemplates = getAllTemplates();

// Get templates by category
const professionalTemplates = getTemplatesByCategory('professional');

// Get specific template
const template = getTemplate('finance');
```

### Generating Content
```typescript
import { generateHTML, getTemplateCSS, getTemplatePreview } from '@/lib/templates/template-registry';

// Generate HTML
const html = generateHTML('finance', resumeData);

// Get CSS
const css = getTemplateCSS('finance');

// Get preview SVG
const preview = getTemplatePreview('finance');
```

## 🎨 Color Helpers

The system automatically generates:
- **Light variants** of your primary color for secondary elements
- **Dark variants** for accent elements
- **Contrast ratios** that meet accessibility standards
- **Print-friendly** color schemes

## 📊 Template Statistics

```typescript
import { templateRegistry } from '@/lib/templates/template-registry';

const stats = templateRegistry.getStats();
console.log(stats);
// {
//   totalTemplates: 12,
//   templatesByCategory: { professional: 5, modern: 3, creative: 2, minimal: 2 },
//   cachedCSS: 12,
//   cachedPreviews: 12
// }
```

## 🚀 Best Practices

1. **Use descriptive names**: Make template names clear and descriptive
2. **Choose appropriate categories**: Select the right category for better organization
3. **Test colors**: Ensure good contrast and readability
4. **Keep descriptions concise**: Short, clear descriptions work best
5. **Use semantic colors**: Choose colors that match the industry/profession

## 🎯 That's It!

Adding new templates is now as simple as one function call. The system handles all the complexity behind the scenes, ensuring consistency across the app, PDF generation, and template gallery.
