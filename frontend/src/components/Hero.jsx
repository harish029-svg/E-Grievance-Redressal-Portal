import { Link } from 'react-router-dom';

const Hero = () => (
  <section id="home" className="container section pt-32">
    <div className="grid gap-10 lg:grid-cols-2 items-center">
      <div>
        <span className="text-sm uppercase tracking-[0.3em] text-blue-400">E-Grievance Portal</span>
        <h1 className="text-5xl md:text-6xl font-bold text-white mt-6 leading-tight">
          Resolve citizen grievances quickly with a secure online portal.
        </h1>
        <p className="text-gray-300 mt-6 max-w-2xl">
          Manage complaints, assign officers, and keep all stakeholders informed with one easy-to-use platform.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/register" className="btn btn-accent btn-lg">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-outline btn-lg">
            Login
          </Link>
        </div>
      </div>
      <div className="rounded-[2rem] overflow-hidden glass-card" style={{ minHeight: '420px' }}>
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent_40%),_radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.2),_transparent_35%),_linear-gradient(180deg,_rgba(15,23,42,0.9),_rgba(15,23,42,0.75))] p-8">
          <p className="text-blue-300 text-sm uppercase tracking-[0.25em] mb-4">Citizen grievance summary</p>
          <div className="grid gap-4">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white">Track complaint status</h3>
              <p className="text-gray-300 mt-3">View pending, in-progress, and resolved grievances under one account.</p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white">Officer assignment</h3>
              <p className="text-gray-300 mt-3">Assign proper officers to complaints and manage workload efficiently.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
