const stats = [
  { label: 'Complaints Resolved', value: '1.2K' },
  { label: 'Active Officers', value: '46' },
  { label: 'Average Response Time', value: '18 hrs' },
];

const Stats = () => (
  <section className="section section-sm section-dark">
    <div className="container">
      <div className="stats-grid">
        {stats.map((item) => (
          <div key={item.label} className="stats-card">
            <p className="stats-value">{item.value}</p>
            <p className="stats-label">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
