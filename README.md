# Documentation for Samurai Social Network (IT-Kamasutra YouTube channel course)

## Table of Contents
1. [Overview](#overview)
2. [Application Structure](#application-structure)
3. [Features](#features)
4. [Redux Store](#redux-store)
5. [API Integration](#api-integration)
6. [Routing](#routing)
7. [Components](#components)
8. [Technical Details](#technical-details)

## Overview

Samurai Social Network is a React-based social media application with the following key features:
- User profiles with posts
- Messaging system (in progress)
- User discovery and following
- Real-time chat
- Authentication system
- News feed and multimedia sections (in progress)

## Application Structure

The application follows a standard React-Redux structure with:

```
src/
├── components/         # React components
├── redux/              # Redux store and reducers
├── api/                # API communication layer
├── types/              # TypeScript type definitions
└── App.css             # Main styles
```

## Features

### 1. User Authentication
- Login/logout functionality
- Form validation
- Captcha protection for suspicious activity
- Persistent sessions

### 2. User Profiles
- View and edit profile information
- Create posts
- Upload profile photos
- View and update status

### 3. Messaging (in progress)
- Private messaging system
- Conversation threads

### 4. Users Discovery
- Browse all users
- Filter users by name and follow status
- Follow/unfollow functionality

### 5. Real-time Chat
- WebSocket-based chat
- Message history
- Online status indicators

### 6. Additional Sections (in progress)
- News feed
- Music player
- Settings panel

## Redux Store

The application uses Redux for state management with the following reducers:

### 1. Auth Reducer
- Manages authentication state
- Handles login/logout
- Stores user credentials
- Captcha functionality

### 2. Profile Reducer
- User posts data
- Profile information
- User status
- Profile photo management

### 3. Dialogs Reducer
- Private messages data

### 4. Users Reducer
- Users list
- Pagination
- Following status
- Filtering functionality

### 5. Chat Reducer
- Real-time messages
- WebSocket status

## API Integration

The app communicates with a backend API through these modules:

### 1. Auth API
- `authorizeMeAPI()` - Checks current auth status
- `loginAPI()` - Handles user login
- `logoutAPI()` - Handles user logout

### 2. Profile API
- `getProfileAPI()` - Fetches user profile
- `getStatusAPI()` - Gets user status
- `updateStatusAPI()` - Updates user status
- `saveAvatarAPI()` - Uploads profile photo
- `saveProfileInfoAPI()` - Updates profile info

### 3. Users API
- `getUsersAPI()` - Fetches users list
- `followAPI()` - Follows a user
- `unfollowAPI()` - Unfollows a user

### 4. Chat API
- WebSocket-based communication
- `startAPI()`/`stopAPI()` - Manages connection
- `sendMessageToChatAPI()` - Sends new messages
- Subscription handlers for real-time updates

## Routing

The app uses React Router with these routes:

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Redirect | Redirects to login |
| `/profile/:userId?` | ProfileContainer | User profile |
| `/users` | UsersContainer | Users discovery |
| `/dialogs/*` | Dialogs | Messaging system |
| `/login` | Login | Authentication |
| `/news` | News | News feed |
| `/music` | Music | Music player |
| `/settings` | Settings | App settings |
| `/chat` | Chat | Real-time chat |
| `*` | 404 | Not found page |

## Components

### Main Layout Components
- `App` - Root component
- `Header` - Top navigation bar
- `NavBar` - Side navigation menu
- `Footer` - Application footer

### Feature Components
- `ProfileContainer` - User profile with posts
- `UsersContainer` - Users discovery
- `Dialogs` - Messaging system
- `Chat` - Real-time chat
- `Login` - Authentication form

### UI Components
- `Preloader` - Loading indicator
- Various form controls and UI elements

## Technical Details

### Technologies Used
- React 18 (with hooks)
- Redux (with Thunk middleware)
- React Router 6
- TypeScript
- WebSocket for real-time chat
- Ant Design components

### Performance Features
- Code splitting with `React.lazy`
- Suspense fallbacks for lazy loading
- Optimized reducers with immutable updates
- Memoization where appropriate

### Type System
- Comprehensive TypeScript types
- Strongly typed Redux actions and thunks
- Type inference utilities
