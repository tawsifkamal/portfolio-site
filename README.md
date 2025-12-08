# Portfolio Website

A modern, responsive personal portfolio website showcasing professional work experience, projects, and technical articles. Built with Angular 17 using the standalone components architecture and server-side rendering (SSR) for optimal performance and SEO.

## 🌟 Features

- **Work Experience Timeline** - Interactive timeline displaying professional experience with companies like IBM Consulting, NCR Corporation, and more
- **Projects Showcase** - Featured projects with technology stack tags, images, and links to demos/repositories
- **Articles Section** - Curated list of technical articles and publications
- **Responsive Design** - Optimized layouts for small, medium, and large screens
- **Server-Side Rendering** - Angular Universal for improved SEO and initial page load performance
- **Interactive UI Effects** - Mouse follower effect with radial gradient following cursor movement
- **Smooth Navigation** - Scroll-based active section highlighting with smooth anchor navigation
- **Google Cloud Integration** - Backend support for AI-powered features using Vertex AI

## 🚀 Tech Stack

### Frontend
- **Angular 17** - Latest Angular with standalone components architecture
- **TypeScript 5.2** - Strongly typed JavaScript
- **Angular Material 17** - Material Design components (Indigo-Pink theme)
- **RxJS 7.8** - Reactive programming with observables
- **Angular CDK** - Component dev kit for responsive design

### Backend
- **Node.js & Express 4.18** - Server runtime and web framework
- **Angular Universal** - Server-side rendering with Express
- **Google Cloud Vertex AI** - AI/ML integration for advanced features
- **Google Cloud Storage** - Asset and file storage

### Development Tools
- **Angular CLI 17.0.6** - Project scaffolding and build tools
- **Karma & Jasmine** - Unit testing framework
- **GitHub Actions** - CI/CD pipeline
- **TypeScript** - Strict mode enabled for type safety

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **Angular CLI** - Install globally: `npm install -g @angular/cli`

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-site
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

## 🏃 Running the Application

### Development Server (Frontend Only)

Run the Angular development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you make changes to the source files.

### Development Server with SSR

To run the application with server-side rendering:

```bash
npm run dev:ssr
```

This starts the Angular Universal server on `http://localhost:4000/`.

### Backend Server (Separate)

To run the Express backend server:

```bash
cd server
node index.js
```

The backend server runs on `http://localhost:3000/`.

## 🏗️ Building for Production

### Build Frontend

```bash
ng build
```

Build artifacts will be stored in the `dist/portfolio-website/browser/` directory.

### Build with SSR

```bash
npm run build:ssr
```

This creates optimized bundles for both client and server in the `dist/` directory.

### Serve Production Build

```bash
npm run serve:ssr:portfolio-website
```

This serves the production build with SSR on port 4000.

## 🧪 Testing

### Running Unit Tests

```bash
ng test
```

Executes unit tests via [Karma](https://karma-runner.github.io) test runner.

### Running End-to-End Tests

```bash
ng e2e
```

Note: You need to install an e2e testing package first (e.g., Protractor, Cypress, or Playwright).

## 📁 Project Structure

```
portfolio-site/
├── src/                          # Angular application source
│   ├── app/                      # Application components and services
│   │   ├── interfaces/           # TypeScript interfaces (Article, Project, WorkExperience)
│   │   ├── services/             # Angular services (ScreenSizeService)
│   │   ├── navigation/           # Navigation component
│   │   ├── project-section/      # Projects showcase with project cards
│   │   ├── work-experience-section/  # Work timeline with experience cards
│   │   ├── tag/                  # Skill tag components
│   │   └── app.component.*       # Root component with main layout
│   ├── assets/                   # Static assets (images, fonts, icons)
│   ├── styles.css                # Global styles
│   └── index.html                # HTML entry point
├── server/                       # Express backend (separate application)
│   ├── index.js                  # Express server entry point
│   ├── genAi.js                  # Google Cloud Vertex AI integration
│   └── package.json              # Backend dependencies
├── server.ts                     # Angular Universal SSR configuration
├── angular.json                  # Angular CLI configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Frontend dependencies and scripts
└── .github/workflows/            # CI/CD configuration
```

## 🔧 Configuration

### Environment Variables

For the backend server with Google Cloud integration, you may need to set:

- `GOOGLE_APPLICATION_CREDENTIALS` - Path to your Google Cloud service account key
- `PORT` - Port for the SSR server (default: 4000)

### Angular Configuration

Key configuration files:

- `angular.json` - Build configuration, SSR settings, Material theme
- `tsconfig.json` - TypeScript compiler options (ES2022, strict mode)
- `app.config.ts` - Application providers and configuration
- `app.routes.ts` - Routing configuration

## 📦 Key Dependencies

### Frontend
- `@angular/core`: ^17.0.0
- `@angular/material`: ^17.0.1
- `rxjs`: ~7.8.0
- `tslib`: ^2.3.0

### Backend
- `express`: ^4.18.2
- `@google-cloud/vertexai`: ^1.1.0
- `@google-cloud/storage`: ^7.7.0

## 🎨 Responsive Breakpoints

The application uses the following screen size breakpoints (defined in `ScreenSizeService`):

- **Small**: max-width 1023px
- **Medium**: 1024px - 1439px
- **Large**: 1440px and above

## 📝 Code Scaffolding

Generate new components using Angular CLI:

```bash
ng generate component component-name
ng generate directive|pipe|service|class|guard|interface|enum|module
```

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines and best practices.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [Angular Documentation](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)
- [Angular Universal](https://angular.io/guide/universal)
- [Google Cloud Vertex AI](https://cloud.google.com/vertex-ai/docs)

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill the process using the port
lsof -ti:4200 | xargs kill -9  # For dev server
lsof -ti:4000 | xargs kill -9  # For SSR server
```

**Build errors**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**SSR rendering issues**
```bash
# Rebuild the SSR bundle
npm run build:ssr
```

## 📧 Contact

For questions or feedback, please open an issue in the repository.

---

Built with ❤️ using Angular 17
