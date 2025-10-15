# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

GoCart is an open-source multi-vendor e-commerce platform built with Next.js. It supports three main user types: customers (public storefront), vendors (store dashboards), and administrators (admin panel).

## Development Commands

### Core Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server with Turbopack (http://localhost:3000)
- `npm run build` - Build for production (includes Prisma generation)
- `npm start` - Start production server
- `npm run lint` - Run Next.js linting

### Database Commands
- `npx prisma generate` - Generate Prisma client (runs automatically on install/build)
- `npx prisma db push` - Push schema changes to database
- `npx prisma studio` - Open Prisma Studio for database inspection
- `npx prisma migrate dev` - Create and apply migrations in development

## Architecture Overview

### App Router Structure
The application uses Next.js 15 App Router with three main route groups:

- **(public)** - Customer-facing storefront with public layout (Banner, Navbar, Footer)
- **admin** - Administrative dashboard for platform management
- **store** - Vendor dashboard for store owners to manage their products and orders

### Database Architecture
Uses PostgreSQL with Prisma ORM. Key entities:
- **User** - Handles authentication via Clerk, links to stores and orders
- **Store** - Vendor stores with approval workflow (pending/active status)
- **Product** - Store products with categories, pricing, and inventory
- **Order** - Complete order management with items, payments, and status tracking
- **Rating** - Product reviews and ratings system
- **Address** - User shipping addresses
- **Coupon** - Discount system with various rules

### State Management
Redux Toolkit implementation with feature-based slices:
- `cart` - Shopping cart state
- `product` - Product filtering and search
- `address` - Address management
- `rating` - Rating system

### Key Integrations
- **Authentication**: Clerk for user management
- **Database**: Neon PostgreSQL with Prisma adapter
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Charts**: Recharts for analytics
- **Notifications**: React Hot Toast

## File Organization

### Critical Directories
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components (general, admin, store-specific)
- `lib/` - Utilities, Prisma client, Redux store configuration
- `prisma/` - Database schema and migrations
- `inngest/` - Background job processing

### Component Structure
- Root components in `components/` for shared UI
- `components/admin/` - Admin dashboard specific components
- `components/store/` - Vendor dashboard specific components

## Development Workflow

### Environment Setup
1. Copy `.env.example` to `.env` and configure:
   - `DATABASE_URL` and `DIRECT_URL` for Neon PostgreSQL
   - Clerk authentication keys
   - Other service configurations

2. Database initialization:
   ```bash
   npx prisma db push
   ```

### Multi-tenant Architecture
The platform supports multiple vendors with isolated store management:
- Each vendor has their own dashboard at `/store`
- Products are associated with specific stores via `storeId`
- Orders track both buyer and seller relationships
- Store approval workflow managed through admin panel

### Key Development Patterns
- Server components by default, `'use client'` for interactive components
- Prisma relations extensively used for data consistency
- Redux for client-side state, server state handled via React Server Components
- Route-based layouts for different user roles
- Middleware for authentication routing via Clerk