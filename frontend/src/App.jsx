import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RaiseComplaint from "./pages/RaiseComplaint";
import MyComplaints from "./pages/MyComplaints";
import ComplaintDetails from "./pages/ComplaintDetails";
import OfficerComplaintDetails from "./pages/OfficerComplaintDetails";
import Profile from "./pages/Profile";
import OfficerDashboard from "./pages/OfficerDashboard";
import AssignedComplaints from "./pages/AssignedComplaints";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageComplaints from "./pages/ManageComplaints";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageAnnouncements from "./pages/ManageAnnouncements";
import Announcements from "./pages/Announcements";
import AssignOfficer from "./pages/AssignOfficer";
import Sidebar from "./components/Sidebar";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Citizen */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/raise-complaint"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <RaiseComplaint />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-complaints"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <MyComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaint/:id"
          element={
            <ProtectedRoute>
              <ComplaintDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
  path="/announcements"
  element={
    <ProtectedRoute>
      <Announcements />
    </ProtectedRoute>
  }
/>

        {/* Officer */}
        <Route
          path="/officer"
          element={
            <ProtectedRoute allowedRoles={["officer"]}>
              <OfficerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/officer/assigned"
          element={
            <ProtectedRoute allowedRoles={["officer"]}>
              <AssignedComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/officer/complaint/:id"
          element={
            <ProtectedRoute allowedRoles={["officer"]}>
              <OfficerComplaintDetails />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/complaints"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageComplaints />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/admin/departments"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageDepartments />
            </ProtectedRoute>
          }
        /> */}
        <Route
  path="/officer/complaint/:id"
  element={
    <ProtectedRoute>
      <OfficerComplaintDetails />
    </ProtectedRoute>
  }
/>

        <Route
  path="/admin/announcements"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <ManageAnnouncements />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/assign-officer"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AssignOfficer />
    </ProtectedRoute>
  }
/>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;