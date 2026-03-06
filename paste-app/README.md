# Paste App

A lightweight pastebin-style app to create, edit, search, and manage text snippets (“pastes”) right in the browser.

## Features

- Create and update pastes (title + content)
- View a paste on a dedicated route
- Search pastes by title
- Copy paste content to clipboard
- Share (copy) the current page URL
- Delete a paste
- Persistent storage using `localStorage` (no backend required)

## Tech Stack

- React (Vite)
- Redux Toolkit + React Redux
- React Router
- Tailwind CSS
- React Hot Toast

## Getting Started

This project lives inside the `paste-app/` folder.

```bash
cd paste-app
npm install
npm run dev
```

Build for production:

```bash
cd paste-app
npm run build
npm run preview
```

## Notes

- Data is stored locally in the browser via `localStorage`, so it persists across refreshes on the same device/browser.
- There’s no authentication or server-side storage in the current version.
