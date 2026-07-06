import { useEffect, useState } from 'react';
import { BellRing, Megaphone, PencilLine, PlusCircle, Trash2 } from 'lucide-react';
import { announcementService } from '../services/announcementService';

const defaultAnnouncements = {
  client: [
    {
      id: 1,
      title: 'Heavy Rain Alert',
      category: 'Alert',
      body: 'Temporary disruptions to field services are expected in low-lying areas due to heavy rainfall.',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Water Supply Maintenance',
      category: 'Service Update',
      body: 'Scheduled maintenance will affect water supply in selected wards between 10 AM and 2 PM.',
      priority: 'Medium',
    },
    {
      id: 3,
      title: 'New Government Scheme',
      category: 'Notice',
      body: 'Citizens can now apply for the new welfare assistance scheme through the portal.',
      priority: 'Low',
    },
  ],
  officer: [
    {
      id: 1,
      title: 'New Policy Update',
      category: 'Policy',
      body: 'Please review the revised complaint escalation workflow before your next shift.',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Department Meeting',
      category: 'Meeting',
      body: 'A coordination meeting for all officers will be held at 3 PM in the district office.',
      priority: 'Medium',
    },
    {
      id: 3,
      title: 'Emergency Alert',
      category: 'Alert',
      body: 'Please stay available for urgent case reviews during the weather advisory window.',
      priority: 'High',
    },
  ],
  admin: [
    {
      id: 1,
      title: 'Portal Maintenance Window',
      category: 'System',
      body: 'The portal will be unavailable for 30 minutes on Thursday for scheduled maintenance.',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Department Guidelines',
      category: 'Policy',
      body: 'New response timelines for departments are now in effect for all service requests.',
      priority: 'Medium',
    },
  ],
};

const emptyForm = {
  title: '',
  category: 'Notice',
  body: '',
  priority: 'Medium',
};

const normalizeAnnouncement = (announcement) => ({
  id: announcement._id || announcement.id,
  title: announcement.title,
  category: announcement.category || 'Notice',
  body: announcement.message || announcement.body || '',
  priority: announcement.priority || 'Medium',
});

const AnnouncementsPanel = ({ role = 'client', editable = false }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const loadAnnouncements = async () => {
    setLoading(true);
    setError(null);

    try {
      const serverAnnouncements = await announcementService.getAnnouncements();
      setAnnouncements(serverAnnouncements.map(normalizeAnnouncement));
    } catch (err) {
      setError('Failed to load announcements. Showing default notices.');
      setAnnouncements(defaultAnnouncements[role] || defaultAnnouncements.client);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, [role]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.body.trim()) {
      return;
    }

    try {
      if (editingId) {
        await announcementService.updateAnnouncement(editingId, {
          title: formData.title.trim(),
          message: formData.body.trim(),
          category: formData.category,
          priority: formData.priority,
        });
      } else {
        await announcementService.createAnnouncement({
          title: formData.title.trim(),
          message: formData.body.trim(),
          category: formData.category,
          priority: formData.priority,
        });
      }

      resetForm();
      await loadAnnouncements();
    } catch (err) {
      setError('Unable to save announcement. Please try again.');
    }
  };

  const handleEdit = (announcement) => {
    setEditingId(announcement.id);
    setFormData({
      title: announcement.title,
      category: announcement.category,
      body: announcement.body,
      priority: announcement.priority,
    });
    setShowForm(true);
  };

  const handleDelete = async (announcementId) => {
    try {
      await announcementService.deleteAnnouncement(announcementId);
      setAnnouncements((current) => current.filter((item) => item.id !== announcementId));
    } catch (err) {
      setError('Unable to delete announcement. Please try again.');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  return (
    <section className="card announcement-card">
      <div className="announcement-header">
        <div>
          <p className="announcement-label">Announcements</p>
          <h3 className="announcement-title">Official notices and updates</h3>
        </div>
        {editable && (
          <button className="btn btn-outline btn-sm" type="button" onClick={() => setShowForm(true)}>
            <PlusCircle size={16} /> Create
          </button>
        )}
      </div>

      {editable && showForm && (
        <form className="announcement-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="form-group compact">
              <span className="form-label">Title</span>
              <input className="form-input" name="title" value={formData.title} onChange={handleChange} placeholder="Enter announcement title" />
            </label>
            <label className="form-group compact">
              <span className="form-label">Category</span>
              <select className="form-input" name="category" value={formData.category} onChange={handleChange}>
                <option>Notice</option>
                <option>Alert</option>
                <option>Policy</option>
                <option>Service Update</option>
                <option>System</option>
              </select>
            </label>
          </div>
          <label className="form-group compact">
            <span className="form-label">Details</span>
            <textarea className="form-input" rows="3" name="body" value={formData.body} onChange={handleChange} placeholder="Share the announcement details" />
          </label>
          <div className="form-grid">
            <label className="form-group compact">
              <span className="form-label">Priority</span>
              <select className="form-input" name="priority" value={formData.priority} onChange={handleChange}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>
            <div className="announcement-actions">
              <button className="btn btn-primary btn-sm" type="submit">{editingId ? 'Save changes' : 'Publish'}</button>
              <button className="btn btn-outline btn-sm" type="button" onClick={resetForm}>Cancel</button>
            </div>
          </div>
        </form>
      )}

      <div className="announcement-list">
        {announcements.map((announcement) => (
          <article key={announcement.id} className="announcement-item">
            <div className="announcement-item-top">
              <div className="announcement-item-title-group">
                <div className="announcement-icon">
                  {announcement.priority === 'High' ? <BellRing size={16} /> : <Megaphone size={16} />}
                </div>
                <div>
                  <h4>{announcement.title}</h4>
                  <p>{announcement.category}</p>
                </div>
              </div>
              <span className={`announcement-pill ${announcement.priority.toLowerCase()}`}>{announcement.priority}</span>
            </div>
            <p className="announcement-body">{announcement.body}</p>
            {editable && (
              <div className="announcement-item-actions">
                <button type="button" className="announcement-action-btn" onClick={() => handleEdit(announcement)}>
                  <PencilLine size={14} /> Edit
                </button>
                <button type="button" className="announcement-action-btn danger" onClick={() => handleDelete(announcement.id)}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default AnnouncementsPanel;
