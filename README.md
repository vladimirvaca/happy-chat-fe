# Happy Chat (Frontend)

A modern React + TypeScript frontend for Happy Chat, built with Vite. It includes a component-driven architecture, testing with Vitest and Testing Library, and UI powered by PrimeReact.

## Table of Contents
- Overview
- Technologies
- Prerequisites
- Getting Started
  - Install dependencies
  - Run the app (development)
  - Build for production
  - Preview production build
- Scripts
- Testing
- Linting & Formatting
- Project Structure

## Overview
This repository contains the frontend application for Happy Chat. It provides the user interface for authentication and real-time chat features with a clean, modular codebase.

## Technologies
- React 18
- TypeScript 5
- Vite 7 (build tool and dev server)
- PrimeReact + PrimeIcons (UI components)
- React Router 7
- Formik (forms)
- Vitest 3 + @testing-library/react + jsdom (unit/integration testing)
- ESLint 9 + TypeScript ESLint (linting)
- Prettier 3 (formatting)
- Husky (git hooks)

## Prerequisites
- Node.js 18+ (recommended) or 20+
- npm 9+ (or newer bundled with your Node.js)

Verify your versions:

```bash
node -v
```
```bash
npm -v
```

## Getting Started

### 1) Install dependencies
```bash
npm install
```
### 2) Run the app (development)
```bash
npm run dev
```

Vite will print a local URL (typically http://localhost:5173). Open it in your browser.

### 3) Build for production
```bash
npm run build
```

The production build is output to the dist folder.

### 4) Preview the production build
```bash
- npm run preview
```

This serves the dist build locally to validate the production bundle.

## Scripts
- dev: Start Vite dev server
- build: Type-check and build the app (tsc -b && vite build)
- preview: Preview the built app locally
- lint: Run ESLint on the project
- prepare: Initialize Husky (runs on install)
- test: Run unit tests once with Vitest
- test:watch: Run tests in watch mode
- test:coverage: Run tests with coverage report (text, json, html in coverage/)
- test:ui: Run Vitest with the UI runner

Run any script with:
```bash
npm run
``` 

## Testing
This project uses Vitest with jsdom and Testing Library.

Common commands:
- npm test: Run the test suite once
- npm run test:watch: Run tests in watch mode while developing
- npm run test:coverage: Generate coverage reports (HTML report at coverage/index.html)
- npm run test:ui: Interactive Vitest UI

Test environment configuration is in:
- vite.config.ts (test section)
- test/setup.ts (Testing Library configuration)

## Linting & Formatting
- Lint:
```bash
npm run lint
```
- Format: Prettier is configured (run via your editor integration or npx prettier . --write if desired)

## Project Structure
Top-level files and folders:
- src/: Application source code
- public/: Static assets
- test/: Test setup files
- dist/: Production build output (generated)
- coverage/: Test coverage reports (generated)
- vite.config.ts: Vite and Vitest configuration
- tsconfig*.json: TypeScript configuration
- eslint.config.js: ESLint configuration

> **Developed with ❤️ by vladimirvaca 👽**
