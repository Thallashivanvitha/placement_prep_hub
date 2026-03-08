## Packages
framer-motion | Page transitions and scroll-triggered animations
@hookform/resolvers | For Zod validation in forms
react-hook-form | For building robust forms
date-fns | Date formatting

## Notes
- Tailwind Config - extend fontFamily:
  fontFamily: {
    sans: ["var(--font-sans)"],
    display: ["var(--font-display)"],
  }
- The application uses CSS print media queries for the Resume Builder export functionality.
- Auth protected routes check `/api/me` and redirect on 401.
