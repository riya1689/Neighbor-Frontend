Neighbo Frontend Requirement Document
(Client-Side System Specification)
1. Frontend Overview

The Neighbo frontend is a modern, responsive web application built using:

TECH STACK:
- Next.js 14 (App Router)
- Tailwind CSS
- Axios for API calls
- Zustand for state management

DESIGN SYSTEM:
- Primary accent: amber (#BA7517)
- Secondary: teal (#1D9E75)
- Clean, minimal, mobile-first
- Reusable component architecture
The UI/UX will follow patterns inspired by:

Reddit → Post feed + voting + comments
Facebook → Feed layout + interaction
Instagram → Follow system + profiles
TikTok → Creator-focused experience
2. Core UI Principles

The frontend must ensure:

Clean and minimal design
Fast loading
Mobile-first responsive layout
Reusable components
Smooth user interactions
3. Layout Structure (GLOBAL)

Every page must include:

3.1 Header (Navbar)

Contains:

Logo (Neighbo)
Search bar
Navigation links:
Home
Explore
Categories
Blog
About
Login / Register (if not logged in)
Profile dropdown (if logged in)
3.2 Footer

Contains:

Contact info
Social links
Terms & Privacy
Copyright
3.3 Main Layout

Structure:

Left Sidebar (optional desktop)
Main Feed
Right Sidebar (trending / suggestions)
4. Pages & UI Requirements
4.1 Home Page

Purpose: Entry point

Sections:

Hero Banner
Search Section
Featured Posts
Trending Posts
Category quick links
4.2 Explore / Feed Page

Core page (like Reddit/Facebook)

Features:

Infinite scroll / pagination
Filter + sort options
Category filter
Feed layout
Post Card Component

Each post card must show:

User avatar + name
Category badge
Post title
Short description
Media preview (image/video)
Vote buttons (↑ ↓)
Comment count
Share button
Premium badge (if applicable)
4.3 Post Details Page

Full post view

Sections:

Post header
Full content
Media (image/video/audio)
Vote system
Comments section
Comments UI (Reddit-style)
Nested replies
Collapsible threads
Reply button
Time + user info
4.4 Create Post Page

Form includes:

Title
Category (dropdown - required)
Description
Media upload
Premium toggle (if premium user)

UX Features:

Validation
Loading state
Preview before posting
4.5 Profile Page

Shows:

Profile info
Followers / Following
User posts
Saved posts
Premium badge (if user is premium)
4.6 Dashboard
Member Dashboard
My posts
Edit/delete posts
Followers list
Earnings (for premium users)
Admin Dashboard
User management
Category management
Payment tracking
Content moderation
4.7 Authentication Pages
Login Page
Register Page

Features:

Form validation
Error handling
Loading states
4.8 Premium Pages
Subscription Page
Show plans (3 months / 6 months / 1 year)
Purchase button
Payment Page
Payment method selection
Confirm payment
Show invoice
Invoice Page

Must display:

Invoice number
Date
Plan details
Amount
Print button
5. Core Features Implementation
5.1 Authentication UI
Login popup for restricted actions
Protected routes
Session handling
5.2 Follow System UI
Follow / Unfollow button
Followers list modal
Following list modal
5.3 Voting System UI
Upvote / Downvote buttons
Active state highlight
Real-time update
5.4 Premium Content UI
Locked content preview
“Unlock Content” button
Payment modal
5.5 Search & Filter UI
Search bar
Category filter
Sort dropdown
6. Component Architecture

Reusable components:

Navbar
Footer
PostCard
Comment
Button
Modal
Input Field
Dropdown
Loader
Toast Notification
7. State Management

Options:

React Context API (simple)
Zustand / Redux (advanced)

Used for:

Auth state
User data
Posts
UI state
8. API Integration

Frontend must connect with backend APIs for:

Authentication
Posts CRUD
Comments
Follow system
Payments
Invoice

Use:

Axios or Fetch API
9. Performance Optimization
Lazy loading images
Code splitting (Next.js)
API caching
Debounced search
10. UI/UX Requirements
Fully responsive
Smooth animations
Loading skeletons
Error handling UI
11. Technology Stack (Frontend)
Next.js
Tailwind CSS