# E-Grievance Portal

Production-quality MERN Stack complaint management platform.

## Project Structure

```
E-Grievance-Redressal-Portal/
│── frontend/          # React + Vite Frontend
│── backend/           # Node.js + Express Backend
│── docs/              # Documentation
│── README.md
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

> Make sure MongoDB is running locally or update the `.env` file with your MongoDB Atlas connection string.

### Backend Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### Backend Features

- User Authentication (JWT)
- Role-Based Access (Citizen, Officer, Admin)
- Complaint Management
- Department Management
- Announcement Management
- Dashboard APIs
- File Uploads
- MongoDB Database Integration

## Tech Stack

- **Frontend:** React 19, React Router, Axios, Framer Motion, CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT Authentication
