# Contributing to Portfolio Website

Thank you for your interest in contributing to this project! This document provides guidelines and best practices for development.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Component Architecture](#component-architecture)
- [Testing Guidelines](#testing-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17 or higher)
- Git

### Setup Development Environment

1. **Fork and clone the repository**
   ```bash
   git clone <your-fork-url>
   cd portfolio-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd server && npm install && cd ..
   ```

3. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Start the development server**
   ```bash
   ng serve
   ```

## 🔄 Development Workflow

### Running the Application

**Frontend development:**
```bash
ng serve
# Navigate to http://localhost:4200/
```

**SSR development:**
```bash
npm run dev:ssr
# Navigate to http://localhost:4000/
```

**Backend server:**
```bash
cd server
node index.js
# Server runs on http://localhost:3000/
```

### File Watching

Angular CLI automatically watches for file changes and recompiles. The browser will auto-reload when you save changes.

## 📐 Code Standards

### TypeScript Guidelines

This project uses **TypeScript strict mode**. Follow these guidelines:

#### Type Safety
- **Always** use explicit types for function parameters and return values
- **Avoid** using `any` type - use `unknown` or proper types instead
- **Use** interfaces for object shapes (see `src/app/interfaces/`)
- **Enable** all strict TypeScript checks

```typescript
// ✅ Good
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Bad
function calculateTotal(items: any): any {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

#### Interfaces and Models

Define reusable interfaces in `src/app/interfaces/`:

```typescript
// src/app/interfaces/project.ts
export interface Project {
  name: string;
  description: string;
  imageUrl: string;
  skills: string[];
  link?: string;
  linkIconSrc?: string;
  prize?: string;
}
```

### Angular Guidelines

#### Standalone Components

This project uses Angular 17's **standalone components architecture**. All components should:

- Use `standalone: true`
- Explicitly import all dependencies
- Avoid NgModules

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'
})
export class ExampleComponent { }
```

#### Component Structure

Follow this file organization pattern:

```
component-name/
├── component-name.component.ts      # Component logic
├── component-name.component.html    # Template
├── component-name.component.css     # Styles
└── component-name.component.spec.ts # Tests
```

#### Services

- Create services in `src/app/services/`
- Use `providedIn: 'root'` for application-wide services
- Keep services focused on a single responsibility

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Service implementation
}
```

### CSS Guidelines

#### Styling Approach

- Use **component-scoped CSS** (avoid global styles when possible)
- Follow **Angular Material theming** conventions
- Use **CSS variables** for reusable values
- Ensure **responsive design** using media queries

```css
/* Component-scoped styles */
:host {
  display: block;
  padding: 1rem;
}

/* Responsive design */
@media (max-width: 1023px) {
  .container {
    flex-direction: column;
  }
}
```

#### Responsive Breakpoints

Use the `ScreenSizeService` for responsive logic:

- **Small**: max-width 1023px
- **Medium**: 1024px - 1439px
- **Large**: 1440px and above

```typescript
constructor(private screenSizeService: ScreenSizeService) {
  this.screenSizeService.isSmallScreen$.subscribe(isSmall => {
    // Handle small screen layout
  });
}
```

### Code Formatting

This project uses `.editorconfig` for consistent code formatting:

- **Indentation**: 2 spaces
- **Line endings**: LF (Unix-style)
- **Charset**: UTF-8
- **Trim trailing whitespace**: Yes
- **Insert final newline**: Yes

Configure your editor to respect `.editorconfig` settings.

## 🏗️ Component Architecture

### Data Flow

Follow Angular's **unidirectional data flow**:

1. **Parent to Child**: Use `@Input()` properties
2. **Child to Parent**: Use `@Output()` EventEmitters
3. **Shared State**: Use services with RxJS subjects/observables

```typescript
// Parent to Child
@Input() project!: Project;

// Child to Parent
@Output() projectClicked = new EventEmitter<string>();

onClick() {
  this.projectClicked.emit(this.project.name);
}
```

### Reactive Programming

Use **RxJS** for asynchronous operations:

```typescript
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

projects$: Observable<Project[]>;

ngOnInit() {
  this.projects$ = this.dataService.getProjects().pipe(
    map(projects => projects.filter(p => p.featured)),
    // Use async pipe in template
  );
}
```

## 🧪 Testing Guidelines

### Unit Tests

Write unit tests for:
- Components
- Services
- Pipes
- Utilities

```typescript
describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display project name', () => {
    component.project = { name: 'Test Project', /* ... */ };
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('h3');
    expect(element.textContent).toContain('Test Project');
  });
});
```

### Running Tests

```bash
# Run all tests
ng test

# Run tests in headless mode (CI)
ng test --watch=false --browsers=ChromeHeadless

# Run tests with coverage
ng test --code-coverage
```

### Test Coverage

Aim for:
- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## 📝 Commit Guidelines

Follow **Conventional Commits** specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (dependencies, build config, etc.)
- **ci**: CI/CD changes

### Examples

```bash
# Feature
git commit -m "feat(projects): add filtering by technology stack"

# Bug fix
git commit -m "fix(navigation): correct active section highlighting on scroll"

# Documentation
git commit -m "docs(readme): add installation instructions"

# Refactoring
git commit -m "refactor(services): simplify screen size detection logic"
```

### Commit Best Practices

- Write clear, concise commit messages
- Use present tense ("add feature" not "added feature")
- Keep subject line under 72 characters
- Reference issues when applicable: `fixes #123`

## 🔀 Pull Request Process

### Before Submitting

1. **Update your branch** with the latest changes:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Run tests** and ensure they pass:
   ```bash
   ng test
   ```

3. **Build the project** without errors:
   ```bash
   ng build
   npm run build:ssr
   ```

4. **Lint your code** (if linter is configured):
   ```bash
   ng lint
   ```

### Pull Request Template

When creating a PR, include:

**Title**: Brief description of changes (use conventional commit format)

**Description**:
```markdown
## Description
Brief overview of what this PR does

## Changes
- List of specific changes made
- Another change

## Testing
- How to test these changes
- Test cases covered

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Tests pass
- [ ] Build succeeds
- [ ] Documentation updated
- [ ] No console errors
```

### Review Process

- All PRs require at least one approval
- Address all review comments
- Keep PRs focused and reasonably sized
- Squash commits if requested before merging

## 🎨 Adding New Content

### Adding Work Experience

Edit `src/app/work-experience-section/work-experience-section.component.ts`:

```typescript
workExperiences: WorkExperience[] = [
  {
    role: 'Your Role',
    dateWorked: 'Jan 2024 - Present',
    company: 'Company Name',
    description: 'What you did...',
    skills: ['Skill1', 'Skill2'],
    logoSrc: 'assets/images/company-logo.png'
  },
  // ... existing experiences
];
```

### Adding Projects

Edit `src/app/project-section/project-section.component.ts`:

```typescript
projects: Project[] = [
  {
    name: 'Project Name',
    description: 'Project description...',
    imageUrl: 'assets/images/project-thumbnail.png',
    skills: ['Tech1', 'Tech2'],
    link: 'https://project-url.com',
    prize: 'Optional award info'
  },
  // ... existing projects
];
```

### Adding Articles

Edit `src/app/app.component.ts`:

```typescript
articles: Article[] = [
  {
    name: 'Article Title',
    link: 'https://article-url.com'
  },
  // ... existing articles
];
```

## 🐛 Reporting Issues

When reporting bugs, include:
- Angular version
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots or error messages
- Console errors

## 💡 Feature Requests

For feature requests:
- Describe the feature clearly
- Explain the use case and benefits
- Provide examples if applicable
- Discuss potential implementation approach

## 📚 Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [RxJS Documentation](https://rxjs.dev/)
- [Angular Material](https://material.angular.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## ❓ Questions?

If you have questions about contributing:
- Open a discussion on GitHub
- Check existing issues and PRs
- Review the documentation

---

Thank you for contributing! 🎉
