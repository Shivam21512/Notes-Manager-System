# Notes Manager

A full-stack Notes Management application built with **React**, **Vite**, **Express**, **MongoDB**, and **JWT authentication**. Users can register, log in, create, update, and delete notes. Admins can view all users and notes.

---

## Features

- User authentication (JWT)
- Create, read, update, and delete personal notes
- Responsive frontend built with **React** and **TailwindCSS**
- Backend with **Express**, **MongoDB**, and **Mongoose**
- CORS enabled for secure API communication

---

## Tech Stack

- Frontend: React, Vite, TailwindCSS, Axios, Framer Motion, Lucide Icons  
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt  
- Deployment: Vercel (Frontend + Backend), MongoDB Atlas

---

## Live Demo

- Frontend: [https://notes-manager-system-uoxw.vercel.app](https://notes-manager-system-uoxw.vercel.app)  
- Backend API: [https://notes-manager-system.vercel.app](https://notes-manager-system.vercel.app)

---

## Setup Instructions

### Backend

1. Clone the repository and navigate to backend:

git clone <repo-url>
cd backend

Install dependencies:

npm install


Create a .env file in backend:

MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your secret key>
CLIENT_URL=<Your frontend URL, e.g. https://notes-manager-system-uoxw.vercel.app>
PORT=5000
NODE_ENV=development


Run the backend server:

npm run dev

