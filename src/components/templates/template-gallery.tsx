import React, { useState } from 'react';
import { ResumeTemplateKey } from './preview';

interface TemplateInfo {
  key: ResumeTemplateKey;
  name: string;
  description: string;
  category: 'professional' | 'creative' | 'minimal' | 'modern';
  preview: string; // Base64 or URL to preview image
}

const templates: TemplateInfo[] = [
  {
    key: 'modern',
    name: 'Modern',
    description: 'Bold headings, chips, accent gradient',
    category: 'modern',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDE1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzNiODJmNiIgcng9IjQiLz4KPHRleHQgeD0iMTUiIHk9IjI1IiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iYm9sZCI+Sm9obiBEb2U8L3RleHQ+Cjx0ZXh0IHg9IjE1IiB5PSI0MCIgZmlsbD0iIzMzMyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj5Tb2Z0d2FyZSBFbmdpbmVlcjwvdGV4dD4KPHJlY3QgeD0iMTAiIHk9IjU1IiB3aWR0aD0iNjAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZjlmYWZiIiByeD0iMiIvPgo8dGV4dCB4PSIxNSIgeT0iNzAiIGZpbGw9IiMzMzMiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiPlNraWxsczwvdGV4dD4KPHJlY3QgeD0iMTUiIHk9IjkwIiB3aWR0aD0iNDAiIGhlaWdodD0iMTIiIGZpbGw9IiNlZmY2ZmYiIHN0cm9rZT0iIzNiODJmNiIgcng9IjYiLz4KPHRleHQgeD0iMTciIHk9Ijk4IiBmaWxsPSIjMzMzIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iOCI+SmF2YVNjcmlwdDwvdGV4dD4KPHJlY3QgeD0iODAiIHk9IjU1IiB3aWR0aD0iNjAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZmZmZmZmIiByeD0iMiIvPgo8dGV4dCB4PSI4NSIgeT0iNzAiIGZpbGw9IiMzMzMiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiPkV4cGVyaWVuY2U8L3RleHQ+CjxyZWN0IHg9Ijg1IiB5PSI5MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZjlmYWZiIiByeD0iMiIvPgo8dGV4dCB4PSI4NyIgeT0iMTAzIiBmaWxsPSIjMzMzIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iOCI+U2VuaW9yIERldjwvdGV4dD4KPHJlY3QgeD0iMTAiIHk9IjE2NSIgd2lkdGg9IjEzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI2Y5ZmFmYiIgcng9IjIiLz4KPHRleHQgeD0iMTUiIHk9IjE4NSIgZmlsbD0iIzMzMyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iYm9sZCI+RWR1Y2F0aW9uPC90ZXh0Pgo8L3N2Zz4K'
  },
  {
    key: 'classic',
    name: 'Classic',
    description: 'Conventional, readable, clean',
    category: 'professional',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDE1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjEwIiB5PSIyMCIgZmlsbD0iIzMzMyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+Sm9obiBEb2U8L3RleHQ+Cjx0ZXh0IHg9IjEwIiB5PSIzNSIgZmlsbD0iIzY2NiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj5qb2huQGV4YW1wbGUuY29tPC90ZXh0Pgo8cmVjdCB4PSIxMCIgeT0iNTAiIHdpZHRoPSIxMzAiIGhlaWdodD0iMiIgZmlsbD0iIzAwN2FjYyIvPgo8dGV4dCB4PSIxMCIgeT0iNjUiIGZpbGw9IiMzMzMiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9ImJvbGQiPlN1bW1hcnk8L3RleHQ+Cjx0ZXh0IHg9IjEwIiB5PSI4MCIgZmlsbD0iIzMzMyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj5FeHBlcmllbmNlZCBzb2Z0d2FyZSBlbmdpbmVlci48L3RleHQ+Cjx0ZXh0IHg9IjEwIiB5PSIxMDAiIGZpbGw9IiMzMzMiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9ImJvbGQiPlNraWxsczwvdGV4dD4KPHJlY3QgeD0iMTAiIHk9IjExNSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjE1IiBmaWxsPSIjZjNmNGY2IiBzdHJva2U9IiNlNWU3ZWIiIHJ4PSIyIi8+Cjx0ZXh0IHg9IjEyIiB5PSIxMjUiIGZpbGw9IiMzMzMiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4Ij5KYXZhU2NyaXB0PC90ZXh0Pgo8dGV4dCB4PSIxMCIgeT0iMTQwIiBmaWxsPSIjMzMzIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSJib2xkIj5FeHBlcmllbmNlPC90ZXh0Pgo8cmVjdCB4PSIxMCIgeT0iMTU1IiB3aWR0aD0iMTMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNlMGUwZTAiIHN0cm9rZS13aWR0aD0iMSIgcng9IjIiLz4KPHRleHQgeD0iMTUiIHk9IjE3NSIgZmlsbD0iIzMzMyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj5TZW5pb3IgRGV2ZWxvcGVyPC90ZXh0Pgo8dGV4dCB4PSIxNSIgeT0iMTkwIiBmaWxsPSIjNjY2IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iOCI+VGVjaCBDb3JwPC90ZXh0Pgo8L3N2Zz4K'
  },
  {
    key: 'minimal',
    name: 'Minimal',
    description: 'Sparse, two-column, airy',
    category: 'minimal',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDE1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjEwIiB5PSIyMCIgZmlsbD0iIzMzMyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+Sm9obiBEb2U8L3RleHQ+Cjx0ZXh0IHg9IjEwIiB5PSIzNSIgZmlsbD0iIzY2NiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj5qb2huQGV4YW1wbGUuY29tPC90ZXh0Pgo8cmVjdCB4PSIxMCIgeT0iNTUiIHdpZHRoPSI2NSIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmOWZhZmIiIHJ4PSIyIi8+Cjx0ZXh0IHg9IjE1IiB5PSI3NSIgZmlsbD0iIzMzMyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iYm9sZCI+U2tpbGxzPC90ZXh0Pgo8dGV4dCB4PSIxNSIgeT0iOTUiIGZpbGw9IiMzMzMiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4Ij5KYXZhU2NyaXB0PC90ZXh0Pgo8dGV4dCB4PSI4NSIgeT0iNzUiIGZpbGw9IiMzMzMiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiPkV4cGVyaWVuY2U8L3RleHQ+Cjx0ZXh0IHg9Ijg1IiB5PSI5NSIgZmlsbD0iIzMzMyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjgiPlNlbmlvciBEZXY8L3RleHQ+Cjx0ZXh0IHg9IjEwIiB5PSIxNjUiIGZpbGw9IiMzMzMiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiPkVkdWNhdGlvbjwvdGV4dD4KPHJlY3QgeD0iMTAiIHk9IjE4MCIgd2lkdGg9IjEzMCIgaGVpZ2h0PSIxNSIgZmlsbD0iI2Y5ZmFmYiIgcng9IjIiLz4KPHRleHQgeD0iMTUiIHk9IjE5MCIgZmlsbD0iIzMzMyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjgiPkJTIENvbXB1dGVyIFNjaWVuY2U8L3RleHQ+Cjwvc3ZnPgo='
  },
  {
    key: 'professional',
    name: 'Professional',
    description: 'Corporate, structured, formal',
    category: 'professional',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMWYyOTM3Ii8+CjxjaXJjbGUgY3g9IjgwIiBjeT0iNTAiIHI9IjMwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjEyMCIgeT0iNDAiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIj5Kb2huIERvZTwvdGV4dD4KPHRleHQgeD0iMTIwIiB5PSI2MCIgZmlsbD0iI2QxZDVkYiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5Tb2Z0d2FyZSBFbmdpbmVlcjwvdGV4dD4KPHRleHQgeD0iMTIwIiB5PSI4MCIgZmlsbD0iI2QxZDVkYiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5qb2huQGV4YW1wbGUuY29tPC90ZXh0Pgo8cmVjdCB4PSIyMCIgeT0iMTIwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZjhmYWZjIiBzdHJva2U9IiMzYjgyZjYiIHN0cm9rZS13aWR0aD0iNCIgcng9IjQiLz4KPHRleHQgeD0iMzAiIHk9IjE0MCIgZmlsbD0iIzFmMjkzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCI+U3VtbWFyeTwvdGV4dD4KPHRleHQgeD0iMzAiIHk9IjE2MCIgZmlsbD0iIzM3NDE1MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5FeHBlcmllbmNlZCBzb2Z0d2FyZSBlbmdpbmVlciB3aXRoIDUrIHllYXJzIG9mIGV4cGVyaWVuY2UuPC90ZXh0Pgo8cmVjdCB4PSIyMCIgeT0iMjAwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZTU1NzViIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSI0Ii8+Cjx0ZXh0IHg9IjMwIiB5PSIyMjAiIGZpbGw9IiMxZjI5MzciIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPlNraWxsczwvdGV4dD4KPHJlY3QgeD0iMzAiIHk9IjI0MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMiIgcng9IjQiLz4KPHRleHQgeD0iMzUiIHk9IjI1NSIgZmlsbD0iIzM3NDE1MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj5KYXZhU2NyaXB0PC90ZXh0Pgo8cmVjdCB4PSIxNjAiIHk9IjIwMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2U1NTc1YiIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iNCIvPgo8dGV4dCB4PSIxNzAiIHk9IjIyMCIgZmlsbD0iIzFmMjkzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+RXhwZXJpZW5jZTwvdGV4dD4KPHJlY3QgeD0iMTcwIiB5PSIyNDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2U1NTc1YiIgc3Ryb2tlLXdpZHRoPSIxIiByeD0iNCIvPgo8dGV4dCB4PSIxNzUiIHk9IjI1NSIgZmlsbD0iIzFmMjkzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iYm9sZCI+U2VuaW9yIERldmVsb3BlcjwvdGV4dD4KPHRleHQgeD0iMTc1IiB5PSIyNzAiIGZpbGw9IiM2YjcyODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCI+VGVjaCBDb3JwPC90ZXh0Pgo8L3N2Zz4K'
  },
  {
    key: 'creative',
    name: 'Creative',
    description: 'Colorful, artistic, unique',
    category: 'creative',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNjY3ZWVhO3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM3NjRiYTI7c3RvcC1vcGFjaXR5OjEiIC8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZ3JhZCkiLz4KPGNpcmNsZSBjeD0iMTUwIiBjeT0iODAiIHI9IjQwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNCIvPgo8dGV4dCB4PSIxNTAiIHk9IjQwIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Sm9obiBEb2U8L3RleHQ+Cjx0ZXh0IHg9IjE1MCIgeT0iMTMwIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Tb2Z0d2FyZSBFbmdpbmVlcjwvdGV4dD4KPHJlY3QgeD0iMjAiIHk9IjE2MCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSIyMDAiIGZpbGw9IndoaXRlIiByeD0iMTIiLz4KPHRleHQgeD0iMzAiIHk9IjE4MCIgZmlsbD0iIzY2N2VlYSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCI+U3VtbWFyeTwvdGV4dD4KPHRleHQgeD0iMzAiIHk9IjIwMCIgZmlsbD0iIzM3NDE1MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5FeHBlcmllbmNlZCBzb2Z0d2FyZSBlbmdpbmVlciB3aXRoIGNyZWF0aXZlIHNvbHV0aW9ucy48L3RleHQ+Cjx0ZXh0IHg9IjMwIiB5PSIyNDAiIGZpbGw9IiM2NjdlZWEiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiPlNraWxsczwvdGV4dD4KPHJlY3QgeD0iMzAiIHk9IjI2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjI0IiBmaWxsPSIjNjY3ZWVhIiByeD0iMTIiLz4KPHRleHQgeD0iMzUiIHk9IjI3NSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCI+SmF2YVNjcmlwdDwvdGV4dD4KPHJlY3QgeD0iMzAiIHk9IjMwMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNjY3ZWVhIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSI4Ii8+Cjx0ZXh0IHg9IjM1IiB5PSIzMjAiIGZpbGw9IiM2NjdlZWEiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9ImJvbGQiPlNlbmlvciBEZXZlbG9wZXI8L3RleHQ+Cjx0ZXh0IHg9IjM1IiB5PSIzMzUiIGZpbGw9IiM2YjcyODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCI+VGVjaCBDb3JwPC90ZXh0Pgo8L3N2Zz4K'
  },
  {
    key: 'minimal-dark',
    name: 'Minimal Dark',
    description: 'Dark theme, clean, modern',
    category: 'minimal',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMTExODI3Ii8+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMWYyOTM3Ii8+CjxjaXJjbGUgY3g9IjgwIiBjeT0iNTAiIHI9IjMwIiBmaWxsPSIjZjlmYWZiIiBzdHJva2U9IiNmOWZhZmIiIHN0cm9rZS13aWR0aD0iNCIvPgo8dGV4dCB4PSIxMjAiIHk9IjQwIiBmaWxsPSIjZjlmYWZiIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIj5Kb2huIERvZTwvdGV4dD4KPHRleHQgeD0iMTIwIiB5PSI2MCIgZmlsbD0iI2QxZDVkYiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5Tb2Z0d2FyZSBFbmdpbmVlcjwvdGV4dD4KPHRleHQgeD0iMTIwIiB5PSI4MCIgZmlsbD0iI2QxZDVkYiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5qb2huQGV4YW1wbGUuY29tPC90ZXh0Pgo8cmVjdCB4PSIyMCIgeT0iMTIwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMWYyOTM3IiBzdHJva2U9IiMxMGI5ODEiIHN0cm9rZS13aWR0aD0iNCIgcng9IjQiLz4KPHRleHQgeD0iMzAiIHk9IjE0MCIgZmlsbD0iIzEwYjk4MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCI+U3VtbWFyeTwvdGV4dD4KPHRleHQgeD0iMzAiIHk9IjE2MCIgZmlsbD0iI2QxZDVkYiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5FeHBlcmllbmNlZCBzb2Z0d2FyZSBlbmdpbmVlciB3aXRoIGRhcmsgdGhlbWUuPC90ZXh0Pgo8cmVjdCB4PSIyMCIgeT0iMjAwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iIzFmMjkzNyIgc3Ryb2tlPSIjMTBiOTgxIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSI0Ii8+Cjx0ZXh0IHg9IjMwIiB5PSIyMjAiIGZpbGw9IiMxMGI5ODEiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPlNraWxsczwvdGV4dD4KPHJlY3QgeD0iMzAiIHk9IjI0MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMWYyOTM3IiBzdHJva2U9IiMxMGI5ODEiIHN0cm9rZS13aWR0aD0iMiIgcng9IjQiLz4KPHRleHQgeD0iMzUiIHk9IjI1NSIgZmlsbD0iI2Y5ZmFmYiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj5KYXZhU2NyaXB0PC90ZXh0Pgo8cmVjdCB4PSIxNjAiIHk9IjIwMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiMxZjI5MzciIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iNCIvPgo8dGV4dCB4PSIxNzAiIHk9IjIyMCIgZmlsbD0iIzEwYjk4MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+RXhwZXJpZW5jZTwvdGV4dD4KPHJlY3QgeD0iMTcwIiB5PSIyNDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiMxZjI5MzciIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIxIiByeD0iNCIvPgo8dGV4dCB4PSIxNzUiIHk9IjI1NSIgZmlsbD0iIzEwYjk4MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iYm9sZCI+U2VuaW9yIERldmVsb3BlcjwvdGV4dD4KPHRleHQgeD0iMTc1IiB5PSIyNzAiIGZpbGw9IiM5Y2EzYWYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCI+VGVjaCBDb3JwPC90ZXh0Pgo8L3N2Zz4K'
  },
  {
    key: 'executive',
    name: 'Executive',
    description: 'Leadership, sophisticated, premium',
    category: 'professional',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkZGRkZGIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImV4ZWNHcmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzFmMjkzNztzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMzc0MTUxO3N0b3Atb3BhY2l0eToxIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI2V4ZWNHcmFkKSIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI2MCIgcj0iNDAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI2Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iNDAiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjgiIGZvbnQtd2VpZ2h0PSJib2xkIj5Kb2huIERvZTwvdGV4dD4KPHRleHQgeD0iMTYwIiB5PSI2NSIgZmlsbD0iI2QxZDVkYiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij5DaGllZiBUZWNobm9sb2d5IE9mZmljZXI8L3RleHQ+Cjx0ZXh0IHg9IjE2MCIgeT0iOTAiIGZpbGw9IiNkMWQ1ZGIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+am9obkBleGFtcGxlLmNvbTwvdGV4dD4KPHJlY3QgeD0iMjAiIHk9IjE0MCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iI2Y4ZmFmYyIgc3Ryb2tlPSIjM2I4MmY2IiBzdHJva2Utd2lkdGg9IjYiIHJ4PSI4Ii8+Cjx0ZXh0IHg9IjMwIiB5PSIxNjAiIGZpbGw9IiMxZjI5MzciIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiPlN1bW1hcnk8L3RleHQ+Cjx0ZXh0IHg9IjMwIiB5PSIxODAiIGZpbGw9IiMzNzQxNTEiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPkV4ZWN1dGl2ZSB3aXRoIDEwKyB5ZWFycyBvZiBsZWFkZXJzaGlwIGV4cGVyaWVuY2UuPC90ZXh0Pgo8cmVjdCB4PSIyMCIgeT0iMjQwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZTU1NzViIiBzdHJva2Utd2lkdGg9IjMiIHJ4PSI2Ii8+Cjx0ZXh0IHg9IjMwIiB5PSIyNjAiIGZpbGw9IiMxZjI5MzciIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9ImJvbGQiPkNvbXBldGVuY2llczwvdGV4dD4KPHJlY3QgeD0iMzAiIHk9IjI4MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI4IiBmaWxsPSIjZTU1NzViIiByeD0iNCIvPgo8cmVjdCB4PSIzMCIgeT0iMjkwIiB3aWR0aD0iODAiIGhlaWdodD0iOCIkZmlsbD0iIzNiODJmNiIgcng9IjQiLz4KPHRleHQgeD0iMzUiIHk9IjMwNSIgZmlsbD0iIzM3NDE1MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj5TdHJhdGVneTwvdGV4dD4KPHJlY3QgeD0iMTYwIiB5PSIyNDAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNlNTU3NWIiIHN0cm9rZS13aWR0aD0iMyIgcng9IjYiLz4KPHRleHQgeD0iMTcwIiB5PSIyNjAiIGZpbGw9IiMxZjI5MzciIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9ImJvbGQiPkV4cGVyaWVuY2U8L3RleHQ+CjxyZWN0IHg9IjE3MCIgeT0iMjgwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNlNTU3NWIiIHN0cm9rZS13aWR0aD0iMiIgcng9IjYiLz4KPHRleHQgeD0iMTc1IiB5PSIyOTUiIGZpbGw9IiMxZjI5MzciIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPkNUTyAmIEZvdW5kZXI8L3RleHQ+Cjx0ZXh0IHg9IjE3NSIgeT0iMzEwIiBmaWxsPSIjNmI3MjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiPlRlY2ggQ29ycDwvdGV4dD4KPHRleHQgeD0iMTc1IiB5PSIzMjUiIGZpbGw9IiM5Y2EzYWYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCI+MjAyMC1QcmVzZW50PC90ZXh0Pgo8L3N2Zz4K'
  },
  {
    key: 'colorful',
    name: 'Colorful',
    description: 'Vibrant, energetic, fun',
    category: 'creative',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImNvbG9yR3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZjZiNmI7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iNTAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNGVjZGM0O3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM0NWI3ZDE7c3RvcC1vcGFjaXR5OjEiIC8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjY29sb3JHcmFkKSIvPgo8Y2lyY2xlIGN4PSIxNTAiIGN5PSI4MCIgcj0iNDAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iNDAiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjgiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Kb2huIERvZTwvdGV4dD4KPHRleHQgeD0iMTUwIiB5PSIxMzAiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZ1bGwtU3RhY2sgRGV2ZWxvcGVyPC90ZXh0Pgo8cmVjdCB4PSIyMCIgeT0iMTYwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjIwMCIgZmlsbD0id2hpdGUiIHJ4PSIxNSIvPgo8dGV4dCB4PSIzMCIgeT0iMTgwIiBmaWxsPSIjZmY2YjZiIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSJib2xkIj5TdW1tYXJ5PC90ZXh0Pgo8dGV4dCB4PSIzMCIgeT0iMjAwIiBmaWxsPSIjMzc0MTUxIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiPkNyZWF0aXZlIGFuZCBlbmVyZ2V0aWMgZGV2ZWxvcGVyIHdpdGggYSBwYXNzaW9uIGZvciBpbm5vdmF0aW9uLjwvdGV4dD4KPHRleHQgeD0iMzAiIHk9IjI0MCIgZmlsbD0iI2ZmNmI2YiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCI+U2tpbGxzPC90ZXh0Pgo8cmVjdCB4PSIzMCIgeT0iMjYwIiB3aWR0aD0iODAiIGhlaWdodD0iMjQiIGZpbGw9IiNmZjZiNmIiIHJ4PSIxMiIvPgo8dGV4dCB4PSIzNSIgeT0iMjc1IiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj5KYXZhU2NyaXB0PC90ZXh0Pgo8cmVjdCB4PSIxMjAiIHk9IjI2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjI0IiBmaWxsPSIjNGVjZGM0IiByeD0iMTIiLz4KPHRleHQgeD0iMTI1IiB5PSIyNzUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiPlJlYWN0PC90ZXh0Pgo8cmVjdCB4PSIyMTAiIHk9IjI2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjI0IiBmaWxsPSIjNDViN2QxIiByeD0iMTIiLz4KPHRleHQgeD0iMjE1IiB5PSIyNzUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiPk5vZGUuanM8L3RleHQ+Cjx0ZXh0IHg9IjMwIiB5PSIzMjAiIGZpbGw9IiNmZjZiNmIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiPkV4cGVyaWVuY2U8L3RleHQ+CjxyZWN0IHg9IjMwIiB5PSIzNDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmNmI2YiIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iOCIvPgo8dGV4dCB4PSIzNSIgeT0iMzU1IiBmaWxsPSIjZmY2YjZiIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSJib2xkIj5TZW5pb3IgRGV2ZWxvcGVyPC90ZXh0Pgo8dGV4dCB4PSIzNSIgeT0iMzcwIiBmaWxsPSIjNmI3MjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiPlRlY2ggQ29ycDwvdGV4dD4KPC9zdmc+'
  },
  {
    key: 'tech-modern',
    name: 'Tech Modern',
    description: 'Developer-focused, technical, sleek',
    category: 'modern',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InRlY2hHcmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzEwYjk4MTtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojM2I4MmY2O3N0b3Atb3BhY2l0eToxIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMTExODI3Ii8+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI3RlY2hHcmFkKSIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI1MCIgcj0iMzAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI0Ii8+Cjx0ZXh0IHg9IjE0MCIgeT0iNDAiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIj5Kb2huIERvZTwvdGV4dD4KPHRleHQgeD0iMTQwIiB5PSI2MCIgZmlsbD0iI2ZmZmZmZiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5Tb2Z0d2FyZSBFbmdpbmVlcjwvdGV4dD4KPHRleHQgeD0iMTQwIiB5PSI4MCIgZmlsbD0iI2ZmZmZmZiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5qb2huQGV4YW1wbGUuY29tPC90ZXh0Pgo8cmVjdCB4PSIyMCIgeT0iMTIwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMWYyOTM3IiBzdHJva2U9IiMxMGI5ODEiIHN0cm9rZS13aWR0aD0iNSIgcng9IjYiLz4KPHRleHQgeD0iMzAiIHk9IjE0MCIgZmlsbD0iIzEwYjk4MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCI+U3VtbWFyeTwvdGV4dD4KPHRleHQgeD0iMzAiIHk9IjE2MCIgZmlsbD0iI2QxZDVkYiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5UZWNobmljYWwgZGV2ZWxvcGVyIHdpdGggZXhwZXJ0aXNlIGluIG1vZGVybiB0ZWNobm9sb2dpZXMuPC90ZXh0Pgo8cmVjdCB4PSIyMCIgeT0iMjAwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iIzFmMjkzNyIgc3Ryb2tlPSIjMTBiOTgxIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSI2Ii8+Cjx0ZXh0IHg9IjMwIiB5PSIyMjAiIGZpbGw9IiMxMGI5ODEiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPlNraWxsczwvdGV4dD4KPHJlY3QgeD0iMzAiIHk9IjI0MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMWYyOTM3IiBzdHJva2U9IiMxMGI5ODEiIHN0cm9rZS13aWR0aD0iMiIgcng9IjYiLz4KPHRleHQgeD0iMzUiIHk9IjI1NSIgZmlsbD0iIzEwYjk4MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj5KYXZhU2NyaXB0PC90ZXh0Pgo8cmVjdCB4PSIxNjAiIHk9IjIwMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiMxZjI5MzciIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iNiIvPgo8dGV4dCB4PSIxNzAiIHk9IjIyMCIgZmlsbD0iIzEwYjk4MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+RXhwZXJpZW5jZTwvdGV4dD4KPHJlY3QgeD0iMTcwIiB5PSIyNDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiMxZjI5MzciIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIxIiByeD0iNiIvPgo8dGV4dCB4PSIxNzUiIHk9IjI1NSIgZmlsbD0iIzEwYjk4MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iYm9sZCI+U2VuaW9yIERldmVsb3BlcjwvdGV4dD4KPHRleHQgeD0iMTc1IiB5PSIyNzAiIGZpbGw9IiM5Y2EzYWYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCI+VGVjaCBDb3JwPC90ZXh0Pgo8L3N2Zz4K'
  }
];

interface TemplateGalleryProps {
  selectedTemplate: ResumeTemplateKey;
  onTemplateSelect: (template: ResumeTemplateKey) => void;
  className?: string;
  compact?: boolean;
}

export function TemplateGallery({ 
  selectedTemplate, 
  onTemplateSelect, 
  className = '',
  compact = false
}: TemplateGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All Templates', count: templates.length },
    { key: 'professional', label: 'Professional', count: templates.filter(t => t.category === 'professional').length },
    { key: 'modern', label: 'Modern', count: templates.filter(t => t.category === 'modern').length },
    { key: 'creative', label: 'Creative', count: templates.filter(t => t.category === 'creative').length },
    { key: 'minimal', label: 'Minimal', count: templates.filter(t => t.category === 'minimal').length },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  if (compact) {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Category Filter - Compact */}
        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                selectedCategory === category.key
                  ? 'bg-blue-600 text-gray-1100'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Template Grid - A4 Tiles */}
        <div className="grid grid-cols-2 gap-3">
          {filteredTemplates.map((template) => (
            <div
              key={template.key}
              onClick={() => onTemplateSelect(template.key)}
              className={`group cursor-pointer rounded-lg border transition-all duration-200 hover:shadow-lg relative overflow-hidden ${
                selectedTemplate === template.key
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {/* Template Preview - 150x200 Dimensions */}
              <div className="w-full h-[200px] relative overflow-hidden bg-gray-50 border border-gray-200">
                <img
                  src={template.preview}
                  alt={`${template.name} template preview`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                
                {/* Selection Indicator */}
                {selectedTemplate === template.key && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Hover Overlay with Name and Description */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-200 flex items-end">
                  <div className="w-full p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                    <h3 className="font-semibold text-white text-sm mb-1">{template.name}</h3>
                    <p className="text-xs text-gray-200 line-clamp-2">{template.description}</p>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                      template.category === 'professional' ? 'bg-blue-500 text-white' :
                      template.category === 'modern' ? 'bg-green-500 text-white' :
                      template.category === 'creative' ? 'bg-purple-500 text-white' :
                      'bg-gray-500 text-white'
                    }`}>
                      {template.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.key}
            onClick={() => onTemplateSelect(template.key)}
            className={`group cursor-pointer rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.key
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            {/* Template Preview */}
            <div className="aspect-[3/4] rounded-t-xl overflow-hidden bg-gray-50">
              <img
                src={template.preview}
                alt={`${template.name} template preview`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Template Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{template.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  template.category === 'professional' ? 'bg-blue-100 text-blue-800' :
                  template.category === 'modern' ? 'bg-green-100 text-green-800' :
                  template.category === 'creative' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {template.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              
              {/* Selection Indicator */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  selectedTemplate === template.key ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {selectedTemplate === template.key ? 'Selected' : 'Select'}
                </span>
                {selectedTemplate === template.key && (
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
