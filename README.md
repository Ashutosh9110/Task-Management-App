# Task Management Application

A full-stack **Task Management** application built with **TypeScript**, **React**, **Tailwind CSS**, **Express**, **Prisma**, and **Socket.io** for real-time updates.

---

## <u>Table of Contents</u>

1. [Project Setup](#project-setup)
2. [Frontend Setup](#frontend-setup)
3. [Backend Setup](#backend-setup)
4. [API Contract](#api-contract)
5. [Architecture & Design Decisions](#architecture--design-decisions)
6. [Socket.io Integration](#socketio-integration)
7. [Trade-offs & Assumptions](#trade-offs--assumptions)

---

## <u>Project Setup</u>

Ensure you have **Node.js v20+** and **npm** installed.

Clone the repository:

```bash
git clone <repo-url>
cd <repo-directory>


<u>Frontend Setup</u>

1: Navigate to the frontend folder:
cd Frontend

2:Install dependencies:
npm install

3: Run the development server:
npm run dev
The app will run on http://localhost:5173 (Vite default port).

4: Build for production:
npm run build

Netlify Deployment Settings:

Base directory: Frontend
Build command: npm run build
Publish directory: dist

<u>Backend Setup</u>

1: Navigate to the backend folder:
cd Backend

2:Install dependencies:
npm install

3:Configure environment variables:
Create a .env file:
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your_jwt_secret"

4:Run development server:
npm run dev

5:Build for production:
npm run build
npm start

The backend runs on http://localhost:3000 by default.

<u>API Contract</u>
<b>Auth Endpoints</b>
Method	Endpoint	Description	Body / Params
POST	/api/v1/auth/register	Register a new user	{ name, email, password }
POST	/api/v1/auth/login	Login user	{ email, password }
GET	/api/v1/auth/me	Get current logged-in user	Authorization header: Bearer <token>

<b>Task Endpoints</b>
Method	Endpoint	Description	Body / Params
POST	/api/v1/tasks	Create a new task	{ title, description?, dueDate, priority, status, assignedToId }
GET	/api/v1/tasks	Get all tasks	Query params: status, priority, sort
GET	/api/v1/tasks/:id	Get task details by ID	id in URL
PATCH	/api/v1/tasks/:id	Update a task	Task fields in body
DELETE	/api/v1/tasks/:id	Delete a task	id in URL

All protected endpoints require Authorization: Bearer <JWT> header.

<u>Architecture & Design Decisions</u>

1: Frontend:

React + TypeScript for type safety.

Tailwind CSS for rapid, responsive UI design.

React Query for data fetching and caching.

React Hook Form + Zod for form handling and validation.

2: Backend:

Express.js with TypeScript for structured, type-safe server code.

Prisma ORM for type-safe database queries.

PostgreSQL (or MySQL) chosen for relational data and scalability.

JWT for authentication and secure session management.

Service layer implemented to separate business logic from controllers.

Zod used for request validation at the backend.

3: State & Data Flow:

Client fetches tasks via React Query.

Real-time updates received via Socket.io subscriptions.

Forms validated on client with Zod and on server with Zod for safety.



<u>Socket.io Integration</u>

1: Backend:

import { Server } from "socket.io";
const io = new Server(httpServer, {
  cors: { origin: frontendURL, credentials: true }
});
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("task:update", (task) => {
    io.emit("task:updated", task);
  });
});

2: Frontend:

import { io } from "socket.io-client";
const socket = io(import.meta.env.VITE_API_URL, { withCredentials: true });
socket.on("task:updated", (task) => {
  queryClient.invalidateQueries("tasks"); // React Query
});

This ensures real-time task updates across multiple clients.


<u>Trade-offs & Assumptions</u>

1: Assumed single-role user management (Admin/User) for simplicity.
2: No pagination implemented for tasks (can be added if dataset grows).
3: Socket.io used only for task notifications and updates; real-time messaging not implemented.
4: JWT token expiration handled, but refresh tokens not implemented for simplicity.
5: Frontend & backend validation ensures type safety using Zod.

<u>License</u>

MIT © Ashutosh

<u>Contact</u>

For issues or contributions, contact ashutoshadhikari@outlook.com  