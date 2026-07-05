import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import announcementService from "../services/announcementService";
const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
const data = await announcementService.getAnnouncements();      setAnnouncements(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this announcement?"
  );

  if (!confirmDelete) return;

  try {
    await announcementService.deleteAnnouncement(id);

    alert("Announcement deleted successfully");

    fetchAnnouncements();
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Failed to delete announcement"
    );
  }
};

  return (
    <div className="page-light">
      <Navbar />

      <main className="container py-24">

        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Announcements
          </h1>

          <p className="text-gray-600 mt-3">
            Stay updated with the latest notices, alerts and public information.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="card text-center p-10">
            <p className="text-lg text-slate-700">
              Loading announcements...
            </p>
          </div>
        ) : announcements.length === 0 ? (

          /* Empty State */
          <div className="card text-center p-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              No Announcements Available
            </h2>

            <p className="text-gray-500 mt-3">
              New announcements will appear here.
            </p>
          </div>

        ) : (

          /* Announcement List */
          <div className="grid gap-6">

            {announcements.map((announcement) => (
              <div
                key={announcement._id}
                className="card hover:-translate-y-1 hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-start flex-wrap gap-3">

                  <h2 className="text-2xl font-semibold text-slate-900">
                    {announcement.title}
                  </h2>

                  <span className="text-sm text-gray-500">
                    {new Date(
                      announcement.createdAt
                    ).toLocaleDateString()}
                  </span>

                </div>

                <p className="text-gray-600 mt-4">
  {announcement.message}
</p>

<div className="mt-5 flex justify-end">

  <button
    onClick={() => handleDelete(announcement._id)}
    className="delete-announcement-btn"
  >
    🗑 Delete
  </button>

</div>
              </div>
            ))}

          </div>

        )}

      </main>
    </div>
  );
};

export default Announcements;