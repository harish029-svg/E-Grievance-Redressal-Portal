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
      <div className="mb-12 text-center">
        <span className="text-sm uppercase tracking-[0.3em] text-violet-400">Features</span>
        <h2 className="text-4xl font-bold text-white mt-4">Premium grievance management with intuitive controls.</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="glass-card p-8 border border-slate-800/90">
              <div className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white w-14 h-14 shadow-lg shadow-purple-500/20 mb-6">
                <Icon size={24} />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Features;
