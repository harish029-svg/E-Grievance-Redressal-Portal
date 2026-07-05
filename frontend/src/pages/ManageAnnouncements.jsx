import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { adminService } from "../services/adminService";

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    console.log(localStorage.getItem("egp-token"));
    try {
      const data = await adminService.getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const announcement = await adminService.createAnnouncement({
        title,
        message,
      });

      setAnnouncements([announcement, ...announcements]);

      setTitle("");
      setMessage("");

      alert("Announcement created successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to create announcement.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminService.deleteAnnouncement(id);

      setAnnouncements(
        announcements.filter((item) => item._id !== id)
      );

      alert("Announcement deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to delete announcement.");
    }
  };

  return (
    <div className="page page-light">
      <Navbar />

      <div className="container py-24">

       <div className="users-header">

  <div>

    <span className="page-badge">
      ADMIN PANEL
    </span>

    <h1 className="users-title">
      📢 Announcement Management
    </h1>

    <p className="users-subtitle">
      Create, publish and manage announcements for all citizens.
    </p>

  </div>

</div>
<div className="users-stats">

  <div className="user-stat-card">
    <div className="stat-icon blue">📢</div>
    <div>
      <h2>{announcements.length}</h2>
      <p>Total Announcements</p>
    </div>
  </div>

  <div className="user-stat-card">
    <div className="stat-icon green">✔</div>
    <div>
      <h2>{announcements.length}</h2>
      <p>Published</p>
    </div>
  </div>

  <div className="user-stat-card">
    <div className="stat-icon orange">🗓</div>
    <div>
      <h2>
        {
          announcements.filter(
            a =>
              new Date(a.createdAt).toDateString() ===
              new Date().toDateString()
          ).length
        }
      </h2>
      <p>Today's Posts</p>
    </div>
  </div>

</div>

        <div className="users-card">

  <div style={{ padding: "30px" }}>

    <h2
      style={{
        fontSize: "28px",
        fontWeight: "700",
        marginBottom: "25px",
        color: "#0F172A",
      }}
    >
      📢 Create New Announcement
    </h2>

    <form onSubmit={handleCreate} className="user-form">

            <input
              type="text"
              className="form-input"
              placeholder="Announcement Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              className="form-input"
              rows={5}
              placeholder="Announcement Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            {/* <button
              className="btn btn-primary"
              type="submit"
            >
              Publish Announcement
            </button> */}

                <button
        type="submit"
        className="save-btn"
      >
        Publish Announcement
      </button>

    </form>

  </div>

</div>

        {loading ? (
          <div className="glass-card p-8 text-center">
            Loading...
          </div>
        ) : announcements.length === 0 ? (
          <div className="glass-card p-8 text-center">
            No announcements found.
          </div>
        ) : (
          <div className="grid gap-6">

            {announcements.map((announcement) => (

              <div
  key={announcement._id}
  className="users-card"
  style={{ padding: "28px", marginBottom: "22px" }}
>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    }}
  >

    <div>

      <h2
        style={{
          fontSize: "24px",
          fontWeight: "700",
          marginBottom: "10px",
          color: "#0F172A",
        }}
      >
        📢 {announcement.title}
      </h2>

      <p
        style={{
          color: "#475569",
          lineHeight: "1.8",
          marginBottom: "18px",
        }}
      >
        {announcement.message}
      </p>

      <span
        style={{
          color: "#94A3B8",
          fontSize: "14px",
        }}
      >
        {new Date(announcement.createdAt).toLocaleString()}
      </span>

    </div>

    <button
      className="delete-btn"
      onClick={() => handleDelete(announcement._id)}
    >
      🗑 Delete
    </button>

  </div>

</div>

            

            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default ManageAnnouncements;