const Loader = () => (
  <div className="page page-center">
    <div className="glass-card" style={{ textAlign: 'center' }}>
      <div className="loader" style={{ width: '56px', height: '56px', border: '6px solid rgba(255,255,255,0.15)', borderTopColor: '#38bdf8', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <p style={{ marginTop: '1rem', color: 'var(--color-gray-300)' }}>Loading…</p>
    </div>
  </div>
);

export default Loader;
