# Backend Notes for Career Frontend

No backend code changes were made by the frontend work. If anything is needed, use this checklist.

## Required Career Endpoints
- `GET /api/v1/resumes`
- `GET /api/v1/resumes/{id}`
- `PUT /api/v1/resumes/{id}`
- `POST /api/v1/resumes/files` (multipart file upload)
- `GET/POST/PUT/DELETE /api/v1/resumes/{id}/skills`
- `GET/POST/PUT/DELETE /api/v1/resumes/{id}/work-experiences`
- `GET/POST/PUT/DELETE /api/v1/resumes/{id}/educations`
- `GET/POST/PUT/DELETE /api/v1/resumes/{id}/contacts`
- `GET/POST/PUT/DELETE /api/v1/resumes/{id}/certifications`
- `GET/POST/PUT/DELETE /api/v1/resumes/{id}/languages`
- `GET/POST/PUT/DELETE /api/v1/resumes/{id}/links`
- `GET/POST/PUT/DELETE /api/v1/resumes/{id}/hobbies`
- `GET/POST/PUT/DELETE /api/v1/resumes/{id}/extracurriculars`

## Auth / CORS
- Cognito JWT validation should be enabled (same as other modules)
- CORS should allow the frontend origin (e.g., `http://localhost:3000` during dev)
- Ensure endpoints require authenticated user and enforce ownership/tenant

## File Upload
- Endpoint `POST /api/v1/resumes/files` must accept `multipart/form-data` with `file` field
- Returns created resume id or updated list (frontend re-fetches `/resumes` afterward)

## Response Shapes
- Resume list item: `{ id, primaryName?, title?, primaryEmail? }`
- Resume detail: `{ id, primaryName, primaryEmail, primaryPhone, primaryLocation, summary, ... }`
- Section items use their respective entity fields (`name`, `jobTitle`, `institution`, etc.)

## Performance / Pagination
- List endpoints may add pagination later; frontend currently fetches full lists
- Consider `sortOrder` support for sections

## Error Handling
- Use consistent error responses; 401/403 for auth issues, 4xx for validation, 5xx for server errors

## Future Additions
- Add export endpoints (PDF/DOC) for resumes
- Add versioning APIs if needed (`resume versions`)
