const Footer = () => (
  <footer className="footer-section section">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3 className="footer-title">E-Grievance Portal</h3>
          <p>
            A secure government-grade platform that makes grievance submission, tracking, and resolution transparent for every citizen.
          </p>
        </div>
        <div>
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-list">
            <li><a href="#home" className="footer-link">Home</a></li>
            <li><a href="#features" className="footer-link">Features</a></li>
            <li><a href="#faq" className="footer-link">FAQ</a></li>
            <li><a href="#contact" className="footer-link">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-title">Resources</h4>
          <ul className="footer-list">
            <li><a href="#" className="footer-link">Support</a></li>
            <li><a href="#" className="footer-link">Privacy Policy</a></li>
            <li><a href="#" className="footer-link">Terms of Use</a></li>
            <li><a href="#" className="footer-link">Help Center</a></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-title">Contact</h4>
          <p className="footer-contact-text">support@egrievance-portal.com</p>
          <p className="footer-contact-text">+91 98765 43210</p>
          <p className="footer-contact-text">Government Service Center, New Delhi</p>
        </div>
      </div>
      <div className="footer-bottom">© 2026 E-Grievance Portal. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer;
