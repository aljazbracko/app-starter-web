# Next.js Authentication Starter Template

A production-ready Next.js 15 starter template with complete authentication system built-in. Perfect for quickly bootstrapping new applications with user authentication.

## Features

- **Complete Authentication System**
  - User registration with email validation
  - Password confirmation matching
  - JWT-based authentication
  - Token expiry handling
  - Protected routes via middleware
  - Persistent login with localStorage and cookies

- **Modern Tech Stack**
  - Next.js 15 with App Router
  - React 19
  - TypeScript 5
  - Tailwind CSS 4
  - Ant Design 5 (UI components)
  - React Query (data fetching & caching)

- **Best Practices**
  - Clean architecture with separation of concerns
  - Centralized global styles
  - Client-side and server-side route protection
  - Error handling with user-friendly messages
  - Type-safe development with TypeScript

## Project Structure

```
src/
├── app/
│   ├── enums/              # Enumerations (error messages, input types, roles)
│   ├── login/              # Login page route
│   ├── register/           # Register page route
│   ├── globals.css         # Global styles and CSS variables
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Home page
├── components/
│   ├── buttons/            # Reusable button components
│   ├── forms/auth/         # Authentication forms (Login, Register)
│   ├── inputs/             # Form input components
│   ├── layout/             # Layout components (Header)
│   └── pages/              # Page-level components
├── context/
│   └── AuthContext.tsx     # Authentication state management
├── interfaces/
│   └── user.d.ts           # TypeScript type definitions
├── middleware.ts           # Route protection middleware
└── util/
    ├── api/                # API client functions
    ├── helpers/            # Utility helper functions
    └── hook/               # Custom React hooks
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A backend API with these endpoints:
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Configure your API endpoint in `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Authentication Flow

1. **Registration**: Users create an account with email and password
2. **Login**: Users authenticate and receive a JWT token
3. **Token Storage**: Token is stored in both localStorage and cookies
4. **Route Protection**: Middleware checks authentication for protected routes
5. **Logout**: Clears token and redirects to home page

### Protected Routes

Routes can be protected by adding them to the `protectedRoutes` array in [middleware.ts](src/middleware.ts):

```typescript
const protectedRoutes = ['/profile', '/dashboard'];
```

## Customization

### Update Branding

- App name: Update `App Starter` in [Header.tsx](src/components/layout/Header.tsx)
- Logo: Replace `AppstoreOutlined` icon in [Header.tsx](src/components/layout/Header.tsx)

### Modify Color Palette

Edit CSS variables in [globals.css](src/app/globals.css):

```css
:root {
  --clr-blue: #1890ff;
  --clr-neutral-90: #1a1a1a;
  /* ... */
}
```

### Add New Protected Routes

1. Add route to `protectedRoutes` in [middleware.ts](src/middleware.ts)
2. Create the page component in `src/app/your-route/page.tsx`

## API Integration

The starter expects a backend API with this response format:

**Login/Register Response:**
```json
{
  "user": {
    "email": "user@example.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**JWT Token Payload:**
```json
{
  "sub": 1,
  "role": "USER",
  "exp": 1234567890
}
```

## Security Features

- Password confirmation validation
- Token expiry checking
- Protected routes with middleware
- Error handling for invalid credentials
- Client-side JWT decoding (for UI only, validated server-side)

## Building Your Application

This starter provides authentication as a foundation. To build your app:

1. Add your business logic to the home page
2. Create new protected routes for your features
3. Extend the user interface with additional API calls
4. Customize the Header navigation
5. Add your application-specific components

## Tech Stack Details

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with improved hooks
- **TypeScript 5**: Type-safe JavaScript
- **Tailwind CSS 4**: Utility-first CSS framework
- **Ant Design 5**: Enterprise-class UI components
- **React Query**: Server state management
- **JWT**: JSON Web Tokens for authentication

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
