const stats = [
  { label: 'Complaints Resolved', value: '1.2K' },
  { label: 'Active Officers', value: '46' },
  { label: 'Average Response Time', value: '18 hrs' },
];

const Stats = () => (
  <section className="section section-sm bg-slate-950/70">
    <div className="container">
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="glass-card p-8 text-center">
            <p className="text-xl font-medium text-blue-300">{item.label}</p>
            <p className="text-5xl font-bold text-white mt-4">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
