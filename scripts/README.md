# Template Screenshot Generator

This script generates PNG screenshots of all resume templates for use as thumbnails in the template gallery.

## Usage

```bash
# Make sure the development server is running
npm run dev

# Generate screenshots for all templates
npm run screenshots -- --all

# Generate screenshot for a specific template
npm run screenshots -- modern

# Generate screenshots for multiple templates
npm run screenshots -- modern classic minimal

# Using the --template flag
npm run screenshots -- --template professional

# Show help
npm run screenshots -- --help
```

## Command Line Options

| Command | Description |
|---------|-------------|
| `npm run screenshots -- --all` | Generate screenshots for all templates |
| `npm run screenshots -- [template]` | Generate screenshot for specific template |
| `npm run screenshots -- [template1] [template2]` | Generate screenshots for multiple templates |
| `npm run screenshots -- --template [template]` | Generate screenshot using explicit flag |
| `npm run screenshots -- --help` | Show help message |
| `npm run screenshots` | Shows error - arguments required |

## Available Templates

- `modern` - Modern design with timeline and skill bars
- `classic` - Traditional serif-based layout
- `minimal` - Clean, minimalist design
- `professional` - Business-focused layout
- `creative` - Colorful, creative design
- `minimal-dark` - Dark theme minimalist
- `executive` - Sophisticated executive style
- `colorful` - Vibrant, eye-catching design
- `tech-modern` - Tech-inspired with code elements

## What it does

1. **Iterates through all templates**: modern, classic, minimal, professional, creative, minimal-dark, executive, colorful, tech-modern
2. **Uses HTML API routes**: More reliable than client-side rendering
3. **Captures high-quality screenshots**: 2x device scale factor for crisp images
4. **Saves to public/templates/**: Ready to use as template thumbnails

## Output

- **Location**: `public/templates/[template-name].png`
- **Format**: PNG with white background
- **Quality**: High DPI (2x scale factor)
- **Size**: Optimized for template gallery display

## Requirements

- Development server running on `http://localhost:3000`
- Puppeteer (already included in dependencies)
- Node.js

## Troubleshooting

If screenshots fail:
1. Ensure the dev server is running
2. Check that all template API routes are working
3. Verify the HTML API returns valid content
4. Check browser console for any errors

## Customization

You can modify the script to:
- Change output directory
- Adjust image quality/scale
- Add more templates
- Change screenshot dimensions
- Add custom CSS for better rendering
