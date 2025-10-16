const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// All available template keys
const ALL_TEMPLATES = [
  'modern',
  'classic', 
  'minimal',
  'professional',
  'creative',
  'minimal-dark',
  'executive',
  'colorful',
  'tech-modern'
];

// Parse command line arguments
function parseArguments() {
  const args = process.argv.slice(2);
  const templates = [];
  let help = false;
  let all = false;
  
  // If no arguments provided, show help
  if (args.length === 0) {
    console.log('❌ No arguments provided. Use --help to see usage options.');
    process.exit(1);
  }
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--help' || arg === '-h') {
      help = true;
    } else if (arg === '--all' || arg === '-a') {
      all = true;
    } else if (arg === '--template' || arg === '-t') {
      const template = args[i + 1];
      if (template && ALL_TEMPLATES.includes(template)) {
        templates.push(template);
        i++; // Skip next argument as it's the template name
      } else {
        console.error(`❌ Invalid template: ${template}`);
        console.error(`Available templates: ${ALL_TEMPLATES.join(', ')}`);
        process.exit(1);
      }
    } else if (!arg.startsWith('-')) {
      // If it's not a flag, treat it as a template name
      if (ALL_TEMPLATES.includes(arg)) {
        templates.push(arg);
      } else {
        console.error(`❌ Invalid template: ${arg}`);
        console.error(`Available templates: ${ALL_TEMPLATES.join(', ')}`);
        process.exit(1);
      }
    }
  }
  
  return { templates, help, all };
}

// Show help message
function showHelp() {
  console.log(`
📸 Template Screenshot Generator

Usage:
  npm run screenshots -- --all          # Generate screenshots for all templates
  npm run screenshots -- --help         # Show this help message
  npm run screenshots -- --template modern  # Generate screenshot for specific template
  npm run screenshots -- modern         # Generate screenshot for specific template (short form)
  npm run screenshots -- modern classic # Generate screenshots for multiple templates

Available templates:
  ${ALL_TEMPLATES.join(', ')}

Examples:
  npm run screenshots -- --all
  npm run screenshots -- modern
  npm run screenshots -- --template professional
  npm run screenshots -- modern classic minimal
  npm run screenshots -- --template modern --template classic
`);
}

// Configuration
const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = './public/templates';
const SELECTOR = '.resume-container';

async function generateScreenshots(templatesToProcess) {
  console.log('🚀 Starting template screenshot generation...');
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Created output directory: ${OUTPUT_DIR}`);
  }

  // Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport for consistent screenshots
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2 // Higher DPI for better quality
    });

    console.log(`📸 Generating screenshots for ${templatesToProcess.length} template(s): ${templatesToProcess.join(', ')}`);

    for (const templateKey of templatesToProcess) {
      try {
        console.log(`\n🎯 Processing template: ${templateKey}`);
        
        const url = `${BASE_URL}/api/templates/${templateKey}/render/1/html`;
        console.log(`   📍 URL: ${url}`);
        
        // Navigate to the HTML API route (faster and more reliable)
        await page.goto(url, { 
          waitUntil: 'networkidle0',
          timeout: 30000 
        });

        // Wait for the template content to load
        await page.waitForSelector('body', { timeout: 10000 });
        
        // Additional wait for any animations or fonts to load
        await page.evaluateHandle('document.fonts.ready');
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Get the template container element
        const element = await page.$(SELECTOR);
        if (!element) {
          console.log(`   ❌ Template container not found for ${templateKey}`);
          continue;
        }

        // Take screenshot of the template container
        const outputPath = path.join(OUTPUT_DIR, `${templateKey}.png`);
        await element.screenshot({
          path: outputPath,
          type: 'png',
          omitBackground: false // Keep white background
        });

        console.log(`   ✅ Screenshot saved: ${outputPath}`);

      } catch (error) {
        console.log(`   ❌ Error processing ${templateKey}:`, error.message);
      }
    }

    console.log('\n🎉 Screenshot generation completed!');
    console.log(`📁 Screenshots saved in: ${OUTPUT_DIR}`);

  } finally {
    await browser.close();
  }
}

// Run the script
if (require.main === module) {
  const { templates, help, all } = parseArguments();
  
  if (help) {
    showHelp();
    process.exit(0);
  }
  
  // Determine which templates to process
  let templatesToProcess;
  if (all) {
    templatesToProcess = ALL_TEMPLATES;
  } else if (templates.length > 0) {
    templatesToProcess = templates;
  } else {
    console.log('❌ No templates specified. Use --all to generate all templates or specify individual templates.');
    console.log('Use --help to see usage options.');
    process.exit(1);
  }
  
  generateScreenshots(templatesToProcess).catch(console.error);
}

module.exports = { generateScreenshots, ALL_TEMPLATES };
