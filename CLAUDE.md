# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UNIPIA is a static website for a campus hub application, designed as a marketing/landing page. It's hosted on Firebase Hosting and uses vanilla HTML/CSS/JavaScript with jQuery for interactions.

## Architecture

The project structure consists of:
- **Main landing page**: `index.html` - Features Community, Marketplace, Employment sections with slide navigation
- **Coming soon page**: `coming-soon.html` - Placeholder for features under development  
- **Firebase deployment**: `unipia/` directory contains Firebase hosting files
- **Assets**: `Images/` contains all visual assets organized by feature

## Common Commands

### Development
```bash
# Install dependencies (Firebase tools)
npm install

# Serve locally with Firebase emulator
firebase serve

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

### File Structure
- Styles are in `css/style.css` - Uses modern CSS with flexbox/grid layouts
- JavaScript in `js/main.js` - Handles slide navigation, dropdown menus, smooth scrolling
- Images organized in `Images/` subdirectories by feature type

## Key Implementation Details

### Slide Navigation System
The site uses a custom slide system for the main content sections (Community, Marketplace, Employment, Coming Soon). Navigation is handled through:
- Arrow buttons for sequential navigation
- Dropdown menu for direct section access
- Smooth scrolling between sections

### Responsive Design
The site uses responsive breakpoints and mobile-first approach. Key breakpoints are handled in CSS for optimal display across devices.

### Firebase Configuration
- Public directory: `Unipia`
- Single-page app rewrites configured in `firebase.json`
- Firebase SDK v12.1.0 integrated

## External Dependencies
- Google Fonts (Inter)
- Font Awesome 6.4.0 for icons
- jQuery 3.6.0
- Slick Carousel 1.8.1 (loaded but not actively used in current implementation)