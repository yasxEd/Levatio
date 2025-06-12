# Levatio Architecture Documentation

## System Overview

Levatio is a modern fitness platform built with Next.js, featuring advanced animations, responsive design, and interactive components.

## Component Architecture

```
├── Layout Components
│   ├── Navbar (Navigation + Schedule Modal)
│   ├── Footer (Contact Info + Social Links)
│   ├── WhatsApp Button (Floating Action)
│   └── Custom Cursor (Interactive Effects)
│
├── Page Sections
│   ├── Hero (Video Background + CTA)
│   ├── Features (Interactive Grid + Video)
│   ├── Gyms (Location Cards + Maps)
│   ├── Pricing (Membership Plans)
│   ├── Contact (Multi-step Form)
│   └── Testimonials (Carousel + Stats)
│
└── UI Components
    ├── Schedule Modal (Full-screen Viewer)
    ├── Interactive Maps (Google Maps Integration)
    ├── Form Components (Validation + State)
    └── Animation Wrappers (Framer Motion)
```

## Data Flow

1. **Static Content**: Images, videos, and text content served from `/public`
2. **Component State**: Local state management with React hooks
3. **Form Handling**: Multi-step forms with validation
4. **External APIs**: Google Maps, WhatsApp, Web Share API

## Performance Optimizations

- Next.js Image optimization
- Lazy loading for video content
- Intersection Observer for animations
- Component code splitting
- Responsive image serving

## Responsive Strategy

- Mobile-first design approach
- Breakpoint-specific layouts
- Touch-optimized interactions
- Adaptive video content

## Animation System

- Framer Motion for complex animations
- CSS transitions for simple effects
- Intersection Observer for scroll triggers
- Performance-optimized rendering
