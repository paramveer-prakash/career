#!/usr/bin/env tsx
/**
 * Generate thumbnail images for resume templates
 * 
 * This script:
 * 1. Renders each template with seed data
 * 2. Takes a screenshot using Puppeteer
 * 3. Saves thumbnails to public/templates/
 * 
 * Usage: npm run generate-thumbnails
 */

import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { getAllTemplates } from '../lib/templates/template-registry';
import { seedResume } from '../lib/templates/seed-resume';

const THUMBNAIL_WIDTH = 400;
const THUMBNAIL_HEIGHT = 533; // 3:4 aspect ratio
const OUTPUT_DIR = join(process.cwd(), 'public', 'templates');

async function generateThumbnails() {
  console.log('🚀 Starting thumbnail generation...\n');

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✅ Created output directory: ${OUTPUT_DIR}\n`);
  }

  // Get all templates
  const templates = getAllTemplates();
  console.log(`📋 Found ${templates.length} templates to process\n`);

  // Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (const template of templates) {
      console.log(`📸 Processing: ${template.name} (${template.key})...`);

      const page = await browser.newPage();
      
      // Set viewport to thumbnail size
      await page.setViewport({
        width: THUMBNAIL_WIDTH,
        height: THUMBNAIL_HEIGHT,
        deviceScaleFactor: 2 // 2x for retina/high-DPI
      });

      // Create HTML content with the template
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              body {
                margin: 0;
                padding: 16px;
                background: white;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              }
              * {
                box-sizing: border-box;
              }
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script type="module">
              // Render template here - we'll use the registry
              const data = ${JSON.stringify(seedResume)};
              const templateKey = '${template.key}';
              
              // This is a simplified version - you'll need to import your actual template components
              document.getElementById('root').innerHTML = \`
                <div class="text-sm">
                  <h1 class="text-xl font-bold mb-2">\${data.primaryName}</h1>
                  <p class="text-gray-600 text-xs mb-3">\${data.primaryEmail} • \${data.primaryLocation}</p>
                  <p class="text-xs text-gray-700 mb-3">\${data.summary}</p>
                  <div class="mb-3">
                    <h2 class="font-semibold text-sm mb-1">Skills</h2>
                    <div class="flex flex-wrap gap-1">
                      \${data.skills.slice(0, 6).map(s => \`<span class="text-xs px-2 py-0.5 bg-gray-100 rounded">\${s.name}</span>\`).join('')}
                    </div>
                  </div>
                  <div>
                    <h2 class="font-semibold text-sm mb-1">Experience</h2>
                    <div class="text-xs">
                      <div class="font-medium">\${data.workExperiences[0]?.jobTitle}</div>
                      <div class="text-gray-600">\${data.workExperiences[0]?.companyName}</div>
                    </div>
                  </div>
                </div>
              \`;
            </script>
          </body>
        </html>
      `;

      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
      
      // Wait a bit for rendering
      await new Promise(resolve => setTimeout(resolve, 500));

      // Take screenshot
      const screenshot = await page.screenshot({
        type: 'png',
        omitBackground: false
      });

      // Save thumbnail
      const outputPath = join(OUTPUT_DIR, `${template.key}.png`);
      writeFileSync(outputPath, screenshot);
      
      console.log(`   ✅ Saved: ${outputPath}`);

      await page.close();
    }

    console.log(`\n🎉 Successfully generated ${templates.length} thumbnails!`);
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);

  } catch (error) {
    console.error('❌ Error generating thumbnails:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run if executed directly
if (require.main === module) {
  generateThumbnails()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { generateThumbnails };

