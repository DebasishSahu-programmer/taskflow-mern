# TaskFlow — MERN Stack Task Management Application

TaskFlow is a full-stack task management application built using the MERN stack. It allows users to securely manage personal tasks, track progress, set priorities, and organize deadlines through a simple and responsive interface.

Live Demo

Live Application: https://taskflow-mern-clientsite.onrender.com

## Features

* User registration and login
* JWT authentication using HTTP-only cookies
* Create, view, update, and delete tasks
* Track task status: To Do, In Progress, and Done
* Set task priority: Low, Medium, and High
* Add optional descriptions and due dates
* Protected routes for authenticated users
* User-specific task access
* Loading states and error handling

## Technologies Used

**Frontend**

* React
* Vite
* React Router
* Redux Toolkit
* Axios
* Tailwind CSS

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Tokens (JWT)
* Bcrypt
* Cookie Parser

**AI Development Tool**

* Code0

## Project Structure

taskflow/
├── client/
│   └── src/
│       ├── app/
│       │   └── store.js
│       ├── components/
│       │   ├── AuthBootstrap.jsx
│       │   ├── Navbar.jsx
│       │   ├── ProtectedRoute.jsx
│       │   └── tasks/
│       │       ├── TaskForm.jsx
│       │       ├── TaskItem.jsx
│       │       └── TaskList.jsx
│       ├── features/
│       │   ├── auth/
│       │   │   └── authSlice.js
│       │   └── tasks/
│       │       └── taskSlice.js
│       ├── pages/
│       │   ├── DashboardPage.jsx
│       │   ├── HomePage.jsx
│       │   ├── LoginPage.jsx
│       │   └── RegisterPage.jsx
│       ├── utils/
│       │   └── axios.js
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
└── server/
    └── src/
        ├── controllers/
        │   ├── task.controller.js
        │   └── user.controller.js
        ├── db/
        │   └── index.js
        ├── middlewares/
        │   └── auth.middleware.js
        ├── models/
        │   ├── task.models.js
        │   └── user.models.js
        ├── routes/
        │   ├── task.routes.js
        │   └── user.routes.js
        ├── utils/
        │   ├── ApiError.js
        │   ├── ApiResponse.js
        │   └── asyncHandler.js
        ├── app.js
        ├── constant.js
        └── index.js


## Installation and Setup

### Prerequisites

* Node.js and npm
* MongoDB local instance or MongoDB Atlas

### 1. Install Dependencies

Install the backend dependencies:

```bash
cd server
npm install
```

Install the frontend dependencies:

```bash
cd client
npm install
```

### 2. Configure Environment Variables

Create a `.env` file inside the `server` directory and configure the following variables:

```env
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d
```

Create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Replace the placeholder values with your own configuration. Use separate, strong secrets for access and refresh tokens. Never commit `.env` files or credentials to the repository.

### 3. Run the Application

Start the backend from the `server` directory:

```bash
npm run dev
```

Start the frontend from the `client` directory in a separate terminal:

```bash
npm run dev
```

Open the local URL provided by Vite, usually `http://localhost:5173`.

## API Endpoints

The API base path is `/api/v1`.

| Method | Endpoint               | Description                             |
| ------ | ---------------------- | --------------------------------------- |
| POST   | `/users/register`      | Register a new user                     |
| POST   | `/users/login`         | Authenticate a user                     |
| POST   | `/users/logout`        | Log out a user                          |
| POST   | `/users/refresh-token` | Refresh authentication tokens           |
| GET    | `/users/current-user`  | Retrieve the current user               |
| GET    | `/tasks`               | Retrieve the authenticated user's tasks |
| POST   | `/tasks`               | Create a task                           |
| GET    | `/tasks/:taskId`       | Retrieve a specific task                |
| PATCH  | `/tasks/:taskId`       | Update a task                           |
| DELETE | `/tasks/:taskId`       | Delete a task                           |

Task endpoints require authentication. The listed endpoints should be checked against the actual backend implementation before submission.

## AI Development Experience

I used Code0 as an AI development assistant while working on TaskFlow. It helped me explore implementation approaches, understand code, and investigate development issues.

Examples of tasks where I used AI assistance included:

* Planning the project architecture and folder structure.
* Understanding the design of Mongoose models.
* Exploring JWT authentication and password-hashing patterns.
* Working through REST API routes and task CRUD operations.
* Investigating errors and reviewing possible solutions.

I reviewed the suggestions, adapted them to the project requirements, and tested the relevant functionality. I used AI as a development aid while taking responsibility for understanding and validating the resulting implementation.

The examples above should reflect the actual tasks performed during development.

## Future Enhancements

* Task search, filtering, and sorting
* Calendar view for deadlines
* Task reminders and notifications
* Dashboard analytics
* Team collaboration and task assignment

These are planned improvements and are not part of the current feature set unless implemented.

## Author

**Debasish Sahu**
B.Tech Computer Science Engineering, 2025

---

TaskFlow was developed as a full-stack development assessment project.
