# AppliQ - Job Application Tracking System

[![Angular](https://img.shields.io/badge/Angular-20.0.0-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.8-38B2AC.svg)](https://tailwindcss.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.6-7952B3.svg)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

AppliQ is a modern, feature-rich job application tracking system built with Angular 20. It helps job seekers organize, monitor, and optimize their job search process with powerful analytics, intuitive dashboards, and comprehensive application management tools.

## 🚀 Features

### Core Functionality
- **Application Tracking**: Comprehensive job application management with status tracking
- **Dashboard Analytics**: Visual insights with charts and metrics using NGX Charts
- **Status Management**: Track applications through various stages (Applied, Test, Interview, Offer, etc.)
- **Timeline Tracking**: Detailed history of application progress with notes and timestamps
- **Search & Filtering**: Advanced filtering by status, date range, and company
- **Responsive Design**: Mobile-first design that works on all devices

### Advanced Features
- **Real-time Analytics**: Interactive charts showing application trends and success rates
- **Smart Notifications**: Reminders and deadline tracking
- **Document Management**: Store and organize resumes, cover letters, and related documents
- **Interview Tracking**: Manage interview rounds, feedback, and preparation notes
- **Data Export**: Export application data for external analysis
- **Dark Theme**: Modern dark UI with excellent contrast and readability

### Technical Features
- **Server-Side Rendering (SSR)**: Fast initial page loads and SEO optimization
- **Progressive Web App (PWA)**: Offline capabilities and app-like experience
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Component Architecture**: Modular, reusable components following Angular best practices
- **State Management**: Efficient data flow and state management
- **Form Validation**: Comprehensive form validation with custom validators

## 🛠️ Technology Stack

### Frontend Framework
- **Angular 20.0.0**: Latest Angular framework with standalone components
- **TypeScript 5.8.3**: Type-safe JavaScript development
- **RxJS 7.8.2**: Reactive programming with observables

### UI & Styling
- **Tailwind CSS 4.1.8**: Utility-first CSS framework
- **Bootstrap 5.3.6**: Component library for responsive design
- **Bootstrap Icons 1.13.1**: Comprehensive icon library
- **Angular Material 20.0.1**: Material Design components

### Data Visualization
- **NGX Charts 22.0.0**: Powerful charting library for Angular
- **Chart.js 4.4.9**: Additional charting capabilities
- **NGX Graph 10.0.0**: Network and graph visualizations

### Development Tools
- **Angular CLI 20.0.0**: Command-line interface for Angular development
- **Bun**: Fast JavaScript runtime and package manager
- **ESLint**: Code linting and quality assurance
- **Prettier**: Code formatting

### Testing
- **Jasmine 5.7.1**: Testing framework
- **Karma 6.4.4**: Test runner
- **Angular Testing Utilities**: Built-in testing tools

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **Bun** (latest version) - [Installation Guide](https://bun.sh/docs/installation)
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/appliq-web-angular.git
cd appliq-web-angular
```

### 2. Install Dependencies
```bash
bun install
```

### 3. Start Development Server
```bash
bun start
# or
bun run ng serve
```

The application will be available at `http://localhost:4200/`

### 4. Build for Production
```bash
bun run build
```

### 5. Run Tests
```bash
bun test
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/           # Shared components
│   │   ├── sidebar/         # Navigation sidebar
│   │   ├── topbar/          # Top navigation bar
│   │   └── theme-switch/    # Theme toggle component
│   ├── core/                # Core functionality
│   │   ├── guards/          # Route guards
│   │   ├── interceptors/    # HTTP interceptors
│   │   ├── models/          # TypeScript interfaces and types
│   │   └── services/        # Core services
│   ├── features/            # Feature modules
│   │   ├── applications/    # Application management
│   │   ├── auth/           # Authentication
│   │   ├── dashboard/      # Analytics dashboard
│   │   ├── home-page/      # Landing page
│   │   └── settings/       # User settings
│   ├── layout/             # Layout components
│   │   ├── card/           # Reusable card components
│   │   ├── page-layout/    # Main page layout
│   │   └── side-nav/       # Alternative navigation
│   ├── shared/             # Shared utilities
│   │   ├── components/     # Reusable components
│   │   ├── directives/     # Custom directives
│   │   ├── pipes/          # Custom pipes
│   │   ├── services/       # Shared services
│   │   └── utils/          # Utility functions
│   ├── app.config.ts       # App configuration
│   ├── app.routes.ts       # Route definitions
│   └── app.ts              # Root component
├── assets/                 # Static assets
├── styles.css              # Global styles
└── index.html              # Main HTML file
```

## 🎨 Design System

### Color Palette
- **Primary**: Slate/Blue gradient theme
- **Background**: Dark slate (#0F172A, #1F2937)
- **Text**: Light gray (#D6D6D6) with variations
- **Accents**: Blue (#3B82F6), Green (#22C55E), Purple (#8B5CF6)

### Typography
- **Font Family**: Itim (cursive) for a friendly, approachable feel
- **Headings**: Bold weights with proper hierarchy
- **Body Text**: Regular weight with good contrast ratios

### Components
- **Cards**: Rounded corners with subtle shadows and borders
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Dark theme with proper validation states
- **Navigation**: Fixed sidebar with collapsible mobile menu

## 🔧 Configuration

### Environment Setup
The application uses Angular's environment configuration:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  // Add your configuration here
};
```

### Tailwind Configuration
Tailwind CSS is configured with custom colors and utilities:

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'appliq': '#0F172A',
        'appliq-50': '#1F2937',
      }
    }
  }
}
```

## 📊 Features Deep Dive

### Application Management
- **CRUD Operations**: Create, read, update, and delete job applications
- **Status Tracking**: Track applications through multiple stages
- **Timeline View**: Visual representation of application progress
- **Bulk Operations**: Manage multiple applications simultaneously

### Dashboard Analytics
- **Visual Charts**: Bar charts, line charts, and pie charts
- **Key Metrics**: Success rates, response times, and conversion rates
- **Filtering**: Date range and status-based filtering
- **Export Options**: Download data in various formats

### Authentication System
- **User Registration**: Secure signup with validation
- **Login/Logout**: Session management
- **Password Reset**: Forgot password functionality
- **Form Validation**: Comprehensive client-side validation

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Adapted layouts for tablet screens
- **Desktop Enhancement**: Full-featured desktop experience
- **Touch Friendly**: Optimized for touch interactions

## 🧪 Testing

### Unit Tests
```bash
# Run unit tests
bun test

# Run tests with coverage
bun run test:coverage

# Run tests in watch mode
bun run test:watch
```

### E2E Tests
```bash
# Run end-to-end tests
bun run e2e
```

### Test Structure
- **Component Tests**: Test individual components
- **Service Tests**: Test business logic and data services
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows

## 🚀 Deployment

### Development Build
```bash
bun run build:dev
```

### Production Build
```bash
bun run build
```

### Server-Side Rendering
```bash
bun run build:ssr
bun run serve:ssr
```

### Deployment Platforms
- **Netlify**: Static site deployment
- **Vercel**: Full-stack deployment with SSR
- **AWS S3**: Static hosting
- **Firebase Hosting**: Google Cloud deployment

## 🔒 Security

### Authentication
- Secure password hashing
- JWT token management
- Session timeout handling
- CSRF protection

### Data Protection
- Input sanitization
- XSS prevention
- SQL injection protection
- Secure HTTP headers

## 🌟 Performance Optimization

### Bundle Optimization
- **Tree Shaking**: Remove unused code
- **Code Splitting**: Lazy load feature modules
- **Compression**: Gzip compression for assets
- **Caching**: Browser caching strategies

### Runtime Performance
- **OnPush Change Detection**: Optimized change detection
- **Virtual Scrolling**: Handle large datasets efficiently
- **Image Optimization**: Lazy loading and responsive images
- **Service Workers**: Offline functionality and caching

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
   ```bash
   git fork https://github.com/yourusername/appliq-web-angular.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow the coding standards
   - Add tests for new features
   - Update documentation

4. **Commit Your Changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

5. **Push to Your Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**

### Coding Standards
- Use TypeScript strict mode
- Follow Angular style guide
- Write meaningful commit messages
- Add JSDoc comments for public APIs
- Maintain test coverage above 80%

## 📝 API Documentation

### Application Endpoints
```typescript
// Get all applications
GET /api/applications
Response: Application[]

// Create new application
POST /api/applications
Body: CreateApplicationDto
Response: Application

// Update application
PUT /api/applications/:id
Body: UpdateApplicationDto
Response: Application

// Delete application
DELETE /api/applications/:id
Response: { success: boolean }
```

### Authentication Endpoints
```typescript
// User registration
POST /api/auth/register
Body: RegisterDto
Response: { user: User, token: string }

// User login
POST /api/auth/login
Body: LoginDto
Response: { user: User, token: string }

// Password reset
POST /api/auth/reset-password
Body: ResetPasswordDto
Response: { success: boolean }
```

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules bun.lockb
bun install

# Clear Angular cache
bun run ng cache clean
```

**Development Server Issues**
```bash
# Check port availability
lsof -i :4200

# Start on different port
bun run ng serve --port 4201
```

**TypeScript Errors**
```bash
# Check TypeScript configuration
bun run ng build --verbose

# Update TypeScript
bun update typescript
```

## 📚 Learning Resources

### Angular Resources
- [Angular Documentation](https://angular.io/docs)
- [Angular CLI Guide](https://angular.io/cli)
- [Angular Best Practices](https://angular.io/guide/styleguide)

### TypeScript Resources
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)

### Tailwind CSS Resources
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer**: [Your Name](https://github.com/yourusername)
- **UI/UX Designer**: [Designer Name](https://github.com/designerusername)
- **Backend Developer**: [Backend Dev](https://github.com/backendusername)

## 🙏 Acknowledgments

- Angular team for the amazing framework
- Tailwind CSS for the utility-first approach
- NGX Charts for beautiful data visualizations
- Bootstrap team for responsive components
- All contributors and beta testers

## 📞 Support

- **Documentation**: [Wiki](https://github.com/yourusername/appliq-web-angular/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/appliq-web-angular/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/appliq-web-angular/discussions)
- **Email**: support@appliq.com

---

**Made with ❤️ by the AppliQ Team**

*Transform your job search with AppliQ - where organization meets opportunity.*