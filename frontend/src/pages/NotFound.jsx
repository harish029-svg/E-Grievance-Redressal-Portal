import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

const NotFound = () => {
  return (
    <div className="page page-center">
      <motion.div
        className="glass-card"
        style={{ textAlign: 'center', maxWidth: '480px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HiOutlineExclamationTriangle
          size={64}
          style={{ color: 'var(--color-accent)', margin: '0 auto var(--space-6)' }}
        />
        <h1 style={{ fontSize: 'var(--text-6xl)', marginBottom: 'var(--space-2)' }}>404</h1>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)', fontWeight: 600 }}>
          Page Not Found
        </h2>
        <p className="text-muted" style={{ marginBottom: 'var(--space-8)' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
