# Resume Rendering API

This Next.js application provides server-side API routes for rendering resumes in multiple formats and templates.

## API Endpoints

### 1. List Templates
```
GET /api/templates
```
Returns a list of available resume templates.

**Response:**
```json
[
  {
    "key": "modern",
    "name": "Modern", 
    "description": "Bold headings, chips, accent gradient"
  },
  {
    "key": "classic",
    "name": "Classic",
    "description": "Conventional, readable, clean"
  },
  {
    "key": "minimal",
    "name": "Minimal",
    "description": "Sparse, two-column, airy"
  }
]
```

### 2. Render Resume as HTML
```
GET /api/templates/{templateKey}/render/{resumeId}/html
```

**Parameters:**
- `templateKey`: Template to use (modern, classic, minimal)
- `resumeId`: ID of the resume to render

**Response:** HTML document with inline CSS

### 3. Render Resume as PDF
```
GET /api/templates/{templateKey}/render/{resumeId}/pdf
```

**Parameters:**
- `templateKey`: Template to use (modern, classic, minimal)
- `resumeId`: ID of the resume to render

**Response:** PDF file download

### 4. Test Resume Data
```
GET /api/test-resume
```
Returns sample resume data for testing.

## Usage Examples

### HTML Rendering
```bash
# Modern template
curl "http://localhost:3000/api/templates/modern/render/26/html"

# Classic template  
curl "http://localhost:3000/api/templates/classic/render/26/html"

# Minimal template
curl "http://localhost:3000/api/templates/minimal/render/26/html"
```

### PDF Generation
```bash
# Generate PDF
curl "http://localhost:3000/api/templates/modern/render/26/pdf" -o resume.pdf
```

## Demo Page

Visit `/resume-demo` to see an interactive demo of the resume rendering functionality.

## Template Styles

### Modern Template
- Bold headings with gradient accents
- Skill chips with blue styling
- Two-column layout (skills + experience)
- Clean, professional appearance

### Classic Template
- Traditional resume format
- Simple sections with clear hierarchy
- Gray color scheme
- Single-column layout

### Minimal Template
- Sparse, clean design
- Two-column grid layout
- Minimal styling
- Focus on content

## Data Structure

The API expects resume data in the following format:

```typescript
interface ResumeData {
  id: number;
  title: string;
  primaryName: string;
  primaryEmail: string;
  primaryPhone: string;
  primaryLocation: string;
  summary: string;
  skills: Array<{
    id: number;
    name: string;
  }>;
  workExperiences: Array<{
    id: number;
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate: string;
    responsibilities: Array<{
      id: number;
      description: string;
    }>;
  }>;
  educations: Array<{
    id: number;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: number;
    endDate: number;
  }>;
}
```

## Integration

To integrate with your backend API, update the `fetchResumeData` function in the route handlers to fetch from your actual API endpoint:

```typescript
async function fetchResumeData(resumeId: string) {
  const response = await fetch(`${process.env.BACKEND_API_URL}/api/v1/resumes/${resumeId}`, {
    headers: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
    },
  });
  
  if (!response.ok) {
    return null;
  }
  
  return await response.json();
}
```

## Features

- ✅ Server-side rendering
- ✅ Multiple template styles
- ✅ HTML and PDF output
- ✅ Inline CSS (no external dependencies)
- ✅ TypeScript support
- ✅ Next.js App Router compatible
- ✅ Responsive design
- ✅ Print-friendly styling
