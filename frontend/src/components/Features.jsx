import { FiLayers, FiShield, FiBell, FiBarChart2, FiMessageSquare, FiClock } from 'react-icons/fi';

const features = [
  {
    icon: FiLayers,
    title: 'Submit Complaints',
    description: 'Easily file detailed grievances with supporting details and categories.',
  },
  {
    icon: FiShield,
    title: 'Role-based Access',
    description: 'Client, officer, and admin each get dedicated dashboards and workflows.',
  },
  {
    icon: FiBell,
    title: 'Smart Notifications',
    description: 'Receive alerts for updates, approvals, and complaint status changes.',
  },
  {
    icon: FiBarChart2,
    title: 'Advanced Analytics',
    description: 'Monitor resolution metrics and team performance at a glance.',
  },
  {
    icon: FiMessageSquare,
    title: 'Direct Communication',
    description: 'Keep feedback and status messages between citizen and officer clear.',
  },
  {
    icon: FiClock,
    title: 'Track Progress',
    description: 'See every stage of complaint handling, from submission to resolution.',
  },
];

const Features = () => (
  <section id="features" className="section">
    <div className="container">
      <div className="section-header">
        <span className="section-label">Features</span>
        <h2 className="section-heading">Premium grievance management with intuitive controls.</h2>
      </div>
      <div className="feature-grid">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="feature-card">
              <div className="feature-icon">
                <Icon size={24} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Features;
