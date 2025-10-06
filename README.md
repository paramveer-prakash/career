# Career – Resume Manager (Next.js)

A Next.js app for managing resumes: upload multiple resumes, list, view, and edit resume details (primary info, skills, work experience, education). Uses AWS Cognito (OIDC) for authentication and integrates with the backend Career APIs.

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- react-oidc-context (AWS Cognito via OIDC)
- Zustand (state)
- Axios (API)

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Environment config:
```bash
cp env.example .env.local
```
Then edit `.env.local`:
```env
NEXT_PUBLIC_COGNITO_AUTHORITY=your-cognito-authority-url
NEXT_PUBLIC_COGNITO_CLIENT_ID=your-cognito-client-id
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/auth/callback
```

3. Dev server:
```bash
npm run dev
```

4. Open:
- http://localhost:3000

## Features
- Sign-in with AWS Cognito
- Upload resumes (`.pdf`, `.doc`, `.docx`, `.txt`)
- List user resumes
- Edit resume primary info
- Manage sections: Skills, Work Experience, Education

## Routing
- `/` → Landing
- `/resumes` → List + Upload
- `/resumes/[id]` → Resume editor (primary info, skills, work exp, education)

## API integration
Reads `NEXT_PUBLIC_API_URL` and attaches Cognito tokens via the shared API client.

Endpoints used (prefix: `/api/v1`):
- `GET /resumes` – list
- `GET /resumes/{id}` – get by id
- `PUT /resumes/{id}` – update primary info
- `POST /resumes/files` – upload resume file
- `GET/POST/PUT/DELETE /resumes/{id}/skills`
- `GET/POST/PUT/DELETE /resumes/{id}/work-experiences`
- `GET/POST/PUT/DELETE /resumes/{id}/educations`

## Notes
- This app mirrors the `ai-chat` auth/provider setup to keep auth consistent across apps.
- Add more sections (contacts, certifications, languages, links, hobbies, extracurriculars) following the same pattern in `/resumes/[id]/page.tsx`.

## Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run start` – start production server
- `npm run lint` – run ESLint