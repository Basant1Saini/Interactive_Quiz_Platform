# Interactive Quiz Platform - Vanilla JS + Node.js

## Project Overview
A full-stack interactive quiz platform built with MongoDB, Express.js, and Vanilla JavaScript.

## Tech Stack
- **Frontend**: Vanilla JavaScript, CSS3, HTML5
- **Backend**: Node.js, Express 4.19, Mongoose 8.0
- **Database**: MongoDB
- **Authentication**: JWT
- **Development**: http-server

## Project Status ✅

### Phase 1: Project Setup - COMPLETED
- [x] Initialize vanilla JS app structure
- [x] Setup Express.js server
- [x] Configure MongoDB connection
- [x] Setup project structure
- [x] Install dependencies

### Phase 2: Backend Development - COMPLETED
- [x] User authentication (register/login)
- [x] Quiz CRUD operations
- [x] Question management
- [x] Score tracking
- [x] API routes and middleware

### Phase 3: Frontend Development - COMPLETED
- [x] Vanilla JS SPA with routing
- [x] Quiz taking interface
- [x] Client-side navigation
- [x] API integration with fetch
- [x] Responsive CSS design

### Phase 4: Integration & Testing - COMPLETED
- [x] Connect frontend to backend
- [x] User authentication flow
- [x] Quiz functionality testing
- [x] Vanilla JS conversion complete

## Features Implemented
- ✅ User registration/login with JWT
- ✅ Quiz creation and retrieval
- ✅ Quiz taking interface
- ✅ Score submission and tracking
- ✅ MongoDB data persistence
- ✅ Vanilla JS SPA with hash routing
- ✅ Zero framework dependencies

## Features To Add
- [ ] Quiz timer functionality
- [ ] Admin panel for quiz management
- [ ] User dashboard with quiz history
- [ ] Quiz analytics and reporting
- [ ] Enhanced UI/UX design

## File Structure
```
Interactive_Quiz_Platform/
├── client/
│   ├── js/
│   │   ├── pages/       # home.js, login.js, quiz.js
│   │   ├── api.js       # HTTP requests
│   │   ├── auth.js      # Authentication
│   │   ├── router.js    # Client routing
│   │   └── app.js       # App initialization
│   ├── css/
│   │   └── styles.css   # Responsive styles
│   ├── index.html       # SPA shell
│   └── package.json
├── server/
│   ├── server.js        # Express app
│   └── package.json
├── models/              # User, Quiz, Result
├── routes/              # auth, quizzes
├── middleware/          # JWT auth
├── .env                 # Environment variables
└── package.json         # Root scripts
```

## API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get quiz by ID
- `POST /api/quizzes` - Create quiz (auth required)
- `POST /api/quizzes/:id/submit` - Submit quiz result (auth required)

## Getting Started
1. **Install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Setup environment:**
   - Copy `.env` and update MongoDB URI
   - Start MongoDB service

3. **Start development:**
   ```bash
   npm run dev
   ```
   - Server: http://localhost:5000
   - Client: http://localhost:3000

## Recent Updates
- ✅ Converted from React to Vanilla JavaScript
- ✅ Implemented client-side SPA routing
- ✅ Zero framework dependencies
- ✅ Modular JS architecture
- ✅ Responsive CSS design
- ✅ Fixed deprecated code patterns