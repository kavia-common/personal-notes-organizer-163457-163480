# Angular Notes Frontend

This project provides a minimalistic, clean UI to create, view, edit, delete, and search notes with user authentication. It uses a sidebar layout with note list on the left and editor/viewer on the right.

## Environment variables
The app reads API base URL using Angular's environment system:
- NG_APP_API_BASE_URL: Base URL for backend API (e.g., http://localhost:8000/api)

You can pass this at build/run time using typical environment injection approaches for your platform. The default dev value is `http://localhost:8000/api`.

## Development server

```bash
npm install
ng serve
```

Open `http://localhost:3000/` (port configured in angular.json). The app supports SSR dev server settings present in the project.

## Features
- User login (token-based)
- Notes list with search
- Create, edit, view, delete notes
- Clean, light theme with palette:
  - Primary: #2F855A
  - Secondary: #3182CE
  - Accent: #F6AD55
