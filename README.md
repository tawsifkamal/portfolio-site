# Portfolio Website

A modern, responsive personal portfolio website built with Angular 17, showcasing projects, work experience, and technical articles. The site features server-side rendering (SSR), smooth scroll-based navigation, and an elegant interactive design.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Architecture](#architecture)
- [Components](#components)
- [Services](#services)
- [Data Models](#data-models)
- [Styling](#styling)
- [Build and Deployment](#build-and-deployment)
- [Adding Content](#adding-content)

## Overview

This portfolio website serves as a professional showcase for Tawsif Kamal, a Computer Science student at Georgia Tech and Machine Learning Engineering Intern at IBM. The site presents:

- **7 Featured Projects**: Technical projects with descriptions, skills, demos, and links
- **5 Work Experiences**: Professional positions with roles, technologies, and achievements
- **4 Technical Articles**: Curated technical writing on Medium
- **Professional Profile**: Contact information and social media links

The website is built with Angular's standalone components architecture, featuring responsive design across mobile, tablet, and desktop breakpoints.

## Features

### Core Features

- **Responsive Design**: Three breakpoints for optimal viewing on all devices
  - Mobile: ≤1023px
  - Tablet: 1024-1439px
  - Desktop: ≥1440px

- **Scroll-Based Navigation**: Automatically highlights the active section as users scroll through the page

- **Interactive Project Cards**: Hover effects that blur non-active cards for visual focus

- **Server-Side Rendering (SSR)**: Pre-rendered HTML for improved initial load performance and SEO

- **Mouse Follower Effect**: Custom visual effect with radial gradient that tracks cursor movement

- **Smooth Scrolling**: Click navigation items to smoothly scroll to sections

## Tech Stack

### Frontend Framework
- **Angular 17**: Latest Angular with standalone components
- **TypeScript 5.2**: Strict mode enabled for type safety
- **RxJS 7.8**: Reactive programming for state management

### UI & Styling
- **Angular Material 17**: Material Design components (indigo-pink theme)
- **CSS3**: Custom properties (CSS variables) for theming
- **Angular CDK**: Layout utilities for responsive design

### Server-Side Rendering
- **Angular SSR**: Built-in server-side rendering
- **Express.js**: Node.js server for SSR delivery
- **Prerendering**: Static HTML generation at build time

### Build Tools
- **Angular CLI 17**: Build system and development server
- **TypeScript Compiler**: Strict compilation with ES2022 target

## Project Structure

```
portfolio-site/
├── src/
│   ├── app/
│   │   ├── project-section/              # Project showcase system
│   │   │   ├── project-card/             # Individual project display
│   │   │   │   ├── project-card.component.ts
│   │   │   │   ├── project-card.component.html
│   │   │   │   └── project-card.component.css
│   │   │   ├── project-section.component.ts
│   │   │   ├── project-section.component.html
│   │   │   └── project-section.component.css
│   │   ├── work-experience-section/      # Work history system
│   │   │   ├── work-experience-card/     # Individual experience display
│   │   │   │   ├── work-experience-card.component.ts
│   │   │   │   ├── work-experience-card.component.html
│   │   │   │   └── work-experience-card.component.css
│   │   │   ├── work-experience-section.component.ts
│   │   │   ├── work-experience-section.component.html
│   │   │   └── work-experience-section.component.css
│   │   ├── navigation/                   # Section navigation component
│   │   │   ├── navigation.component.ts
│   │   │   ├── navigation.component.html
│   │   │   └── navigation.component.css
│   │   ├── tag/                          # Reusable skill tag component
│   │   │   ├── tag.component.ts
│   │   │   ├── tag.component.html
│   │   │   └── tag.component.css
│   │   ├── services/
│   │   │   ├── screen-size.service.ts    # Responsive state management
│   │   │   └── screen-size.service.spec.ts
│   │   ├── interfaces/
│   │   │   ├── project.ts                # Project data structure
│   │   │   ├── work-experience.ts        # Work experience data structure
│   │   │   └── article.ts                # Article data structure
│   │   ├── app.component.ts              # Root component logic
│   │   ├── app.component.html            # Main layout template
│   │   ├── app.component.css             # Global component styles
│   │   ├── app.config.ts                 # Application configuration
│   │   └── app.routes.ts                 # Route definitions
│   ├── assets/
│   │   ├── images/                       # Static images (logos, thumbnails)
│   │   └── profileIcons/                 # Social media icons
│   ├── index.html                        # Application entry point
│   ├── main.ts                           # Client-side bootstrap
│   ├── main.server.ts                    # Server-side bootstrap (SSR)
│   └── styles.css                        # Global styles & CSS variables
├── server/
│   ├── index.js                          # Express server (basic)
│   ├── test.js                           # Google Cloud Storage test
│   ├── genAi.js                          # Vertex AI integration test
│   └── package.json                      # Server dependencies
├── server.ts                             # SSR server configuration
├── angular.json                          # Angular CLI configuration
├── tsconfig.json                         # Base TypeScript configuration
├── tsconfig.app.json                     # App build TypeScript config
├── tsconfig.spec.json                    # Test TypeScript config
└── package.json                          # Main dependencies & scripts
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tawsifkamal/portfolio-site.git
cd portfolio-site
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

#### Development Server
```bash
npm start
# or
ng serve
```
Navigate to `http://localhost:4200/`. The application will automatically reload when you change source files.

#### Production Build with SSR
```bash
npm run build
npm run serve:ssr:portfolio-website
```
The SSR server will run on `http://localhost:4000/`.

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build the project for production
- `npm run watch` - Build in watch mode for development
- `npm test` - Run unit tests via Karma
- `npm run serve:ssr:portfolio-website` - Run SSR server

### Code Scaffolding

Generate new components using Angular CLI:
```bash
ng generate component component-name
ng generate directive|pipe|service|class|guard|interface|enum|module
```

### Running Tests

Execute unit tests:
```bash
npm test
```

## Architecture

### Application Flow

1. **Bootstrap**: Application starts from `main.ts` (client) or `main.server.ts` (SSR)
2. **Root Component**: `AppComponent` initializes and manages the main layout
3. **Layout**: Two-column design with sticky left section (profile/navigation) and scrollable right section (content)
4. **Navigation**: Scroll position tracked via `@HostListener` to update active section
5. **Sections**: About, Experience, Projects, and Articles sections rendered in sequence

### Standalone Components Architecture

This project uses Angular 17's standalone components pattern, eliminating the need for NgModules:

- Each component declares its own imports
- Components are self-contained and reusable
- Simplified dependency management
- Better tree-shaking for smaller bundle sizes

### Server-Side Rendering (SSR)

The application uses Angular Universal for SSR:

- **Build Process**: Generates both browser and server bundles
- **Prerendering**: Static HTML generated at build time
- **Express Server**: Serves pre-rendered content via `server.ts`
- **Hydration**: Client-side Angular takes over after initial render

## Components

### AppComponent

**Location**: `src/app/app.component.ts`

The root component that orchestrates the entire application.

**Responsibilities**:
- Manages scroll-based navigation state
- Tracks current section based on scroll position
- Implements mouse follower effect
- Provides layout structure (left/right sections)
- Stores articles data

**Key Properties**:
- `currentSection`: Tracks active section ('ABOUT', 'EXPERIENCE', 'PROJECTS')
- `offsets`: Stores pixel positions of sections for scroll tracking
- `articles`: Array of Article objects

**Key Methods**:
- `navigateToSection(section)`: Scrolls to specified section
- `onWindowScroll()`: Updates current section based on scroll position
- `onMouseMove(e)`: Updates mouse follower gradient position

### ProjectSectionComponent

**Location**: `src/app/project-section/project-section.component.ts`

Container component managing the project showcase.

**Responsibilities**:
- Stores array of 7 projects
- Manages hover state for blur effect
- Renders project cards

**Key Properties**:
- `projects`: Array of Project objects with full details
- `hoveredProject`: Tracks which project is currently hovered

### ProjectCardComponent

**Location**: `src/app/project-section/project-card/project-card.component.ts`

Displays individual project information.

**Inputs**:
- `project`: Project object to display
- `hoveredProject`: Currently hovered project name

**Features**:
- Responsive image display
- Skill tags
- External link with icon
- Optional prize badge
- Blur effect when not hovered

### WorkExperienceSectionComponent

**Location**: `src/app/work-experience-section/work-experience-section.component.ts`

Container component managing work experience display.

**Responsibilities**:
- Stores array of 5 work experiences
- Renders work experience cards

**Key Properties**:
- `workExperiences`: Array of WorkExperience objects

### WorkExperienceCardComponent

**Location**: `src/app/work-experience-section/work-experience-card/work-experience-card.component.ts`

Displays individual work experience information.

**Inputs**:
- `workExperience`: WorkExperience object to display

**Features**:
- Company logo display
- Role and date information
- Description text
- Skill tags
- Optional additional info

### NavigationComponent

**Location**: `src/app/navigation/navigation.component.ts`

Section navigation menu component.

**Inputs**:
- `selectedItem`: Currently active section

**Outputs**:
- `sectionChangeEvent`: Emits when user clicks a navigation item

**Features**:
- Highlights active section
- Smooth scroll to sections
- Responsive design

### TagComponent

**Location**: `src/app/tag/tag.component.ts`

Reusable skill tag component used throughout the application.

**Inputs**:
- `text`: Tag text to display

**Features**:
- Consistent styling
- Used in both project and experience cards

## Services

### ScreenSizeService

**Location**: `src/app/services/screen-size.service.ts`

Centralized responsive state management service using Angular CDK's BreakpointObserver.

**Breakpoints**:
- `SMALL_SCREEN`: `(max-width: 1023px)` - Mobile devices
- `MEDIUM_SCREEN`: `(min-width: 1024px) and (max-width: 1439px)` - Tablets
- `LARGE_SCREEN`: `(min-width: 1440px)` - Desktop displays

**Properties**:
- `isSmall`: Boolean flag for small screens
- `isMedium`: Boolean flag for medium screens
- `isLarge`: Boolean flag for large screens

**Usage**:
```typescript
constructor(public screen: ScreenSizeService) {}

// In template
<div *ngIf="screen.isLarge">Desktop content</div>
<div *ngIf="screen.isSmall">Mobile content</div>
```

## Data Models

### Project Interface

**Location**: `src/app/interfaces/project.ts`

```typescript
export interface Project {
  name: string;              // Project name
  description: string;       // Project description
  imageUrl: string;          // Path to project thumbnail
  linkIconSrc?: string;      // Icon for external link (optional)
  link?: string;             // External link URL (optional)
  skills: string[];          // Array of skill tags
  prize?: string;            // Award or prize information (optional)
}
```

### WorkExperience Interface

**Location**: `src/app/interfaces/work-experience.ts`

```typescript
export interface WorkExperience {
  role: string;              // Job title
  dateWorked: string;        // Employment period
  company: string;           // Company name
  description: string;       // Role description
  skills: string[];          // Array of skill tags
  logoSrc: string;           // Path to company logo
  additionalInfo?: string;   // Extra info (e.g., "Project Lead") (optional)
}
```

### Article Interface

**Location**: `src/app/interfaces/article.ts`

```typescript
export interface Article {
  name: string;              // Article title
  link: string;              // URL to article
}
```

## Styling

### Global Styles

**Location**: `src/styles.css`

Defines CSS custom properties (variables) for consistent theming:

```css
:root {
  --primary-bg-color: #0f172a;
  --secondary-bg-color: #1e293b;
  --primary-text-color: #e2e8f0;
  --secondary-text-color: #94a3b8;
  --tertiary-text-color: #64748b;
  --accent-color: #3b82f6;
  --hover-color: #2563eb;
  --font-family: 'Inter', sans-serif;
}
```

### Component Styles

Each component has its own scoped CSS file following Angular's component styling pattern.

### Material Theme

The application uses Angular Material's indigo-pink prebuilt theme, configured in `angular.json`:

```json
"styles": [
  "@angular/material/prebuilt-themes/indigo-pink.css",
  "src/styles.css"
]
```

### Responsive Design

Responsive styles are implemented using:
- CSS media queries
- ScreenSizeService for conditional rendering
- Flexbox and CSS Grid for layouts

## Build and Deployment

### Production Build

Build the application for production:

```bash
npm run build
```

Build artifacts are stored in `dist/portfolio-website/` directory with:
- `browser/`: Client-side bundle
- `server/`: Server-side bundle for SSR

### Build Configuration

**TypeScript Configuration**:
- Strict mode enabled
- ES2022 target
- Module resolution: bundler

**Angular Build Options**:
- Output hashing for cache busting
- Bundle budgets for size monitoring
- Optimization enabled in production
- Source maps in development

### Deployment Options

#### Static Hosting (without SSR)
Deploy the `dist/portfolio-website/browser/` folder to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

#### Node.js Hosting (with SSR)
Deploy the entire `dist/portfolio-website/` folder to:
- Heroku
- AWS Elastic Beanstalk
- Google Cloud Run
- DigitalOcean App Platform

Run the SSR server:
```bash
node dist/portfolio-website/server/server.mjs
```

## Adding Content

### Adding a New Project

1. Add project thumbnail to `src/assets/images/`
2. Open `src/app/project-section/project-section.component.ts`
3. Add new project object to the `projects` array:

```typescript
{
  name: 'Your Project Name',
  description: 'Project description here...',
  imageUrl: 'assets/images/your-thumbnail.png',
  skills: ['Skill1', 'Skill2', 'Skill3'],
  linkIconSrc: 'assets/images/linkIcon.png',
  link: 'https://your-project-url.com',
  prize: 'Optional prize information'
}
```

### Adding a New Work Experience

1. Add company logo to `src/assets/images/`
2. Open `src/app/work-experience-section/work-experience-section.component.ts`
3. Add new experience object to the `workExperiences` array:

```typescript
{
  role: 'Your Job Title',
  dateWorked: 'Month Year - Month Year',
  company: 'Company Name',
  logoSrc: 'assets/images/company-logo.png',
  description: 'Description of your role and achievements...',
  skills: ['Skill1', 'Skill2', 'Skill3'],
  additionalInfo: 'Optional additional info'
}
```

### Adding a New Article

1. Open `src/app/app.component.ts`
2. Add new article object to the `articles` array:

```typescript
{
  name: 'Your Article Title',
  link: 'https://medium.com/@username/article-slug'
}
```

### Updating Profile Information

Profile information is in the left section of `src/app/app.component.html`. Update:
- Name and title
- Bio text
- Social media links
- Profile icons in `src/assets/profileIcons/`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- **SSR**: Improves initial load time and SEO
- **Lazy Loading**: Components loaded on demand
- **Bundle Optimization**: Tree-shaking removes unused code
- **Image Optimization**: Use optimized images in `assets/`
- **CSS Variables**: Efficient theming without JavaScript

## License

This project is private and proprietary.

## Contact

Tawsif Kamal
- GitHub: [@tawsifkamal](https://github.com/tawsifkamal)
- LinkedIn: [Tawsif Kamal](https://www.linkedin.com/in/tawsif-kamal/)

---

Built with Angular 17 and ❤️
