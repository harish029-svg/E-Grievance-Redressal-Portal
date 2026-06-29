import { HelpCircle, Phone, Mail, Clock, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Stats from '../components/Stats';
import Footer from '../components/Footer';

const faqs = [
  {
    question: 'How do I submit a grievance?',
    answer: 'Register as a client, file a complaint, and track its status through the dashboard.',
  },
  {
    question: 'How are officers assigned?',
    answer: 'Admin users assign officers by department and monitor response timelines.',
  },
  {
    question: 'What roles are supported?',
    answer: 'Client, officer, and admin roles are built in with role-specific dashboards and controls.',
  },
];

const Home = () => {
  return (
    <div className="page">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Stats />
        <section id="faq" className="section section-dark">
          <div className="container">
            <div className="section-header">
              <span className="section-label">FAQ</span>
              <h2 className="section-heading">Common questions answered</h2>
            </div>
            <div className="faq-grid">
              {faqs.map((item) => (
                <div key={item.question} className="faq-card">
                  <h3 className="faq-question">{item.question}</h3>
                  <p className="faq-answer">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Contact</span>
              <h2 className="section-heading">Need help getting started?</h2>
              <p className="section-copy">Reach out to our support team for guidance on the portal, roles, or complaint workflow.</p>
            </div>
            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-card-header">
                  <div className="contact-card-icon">
                    <HelpCircle size={22} />
                  </div>
                  <div>
                    <h3 className="contact-card-title">We’re here to help</h3>
                  </div>
                </div>
                <p className="contact-card-copy">
                  Our support team is available to answer questions about registration, complaint tracking, and officer assignments.
                </p>
                <div className="contact-info-grid">
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="contact-info-label">Phone</p>
                      <p className="contact-info-text">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="contact-info-label">Email</p>
                      <p className="contact-info-text">support@egrievance-portal.com</p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="contact-info-label">Office hours</p>
                      <p className="contact-info-text">Mon – Fri, 9:00 AM – 6:00 PM</p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="contact-info-label">Location</p>
                      <p className="contact-info-text">Government Service Center, New Delhi</p>
                    </div>
                  </div>
                </div>
              </div>
              <form className="contact-form">
                <input type="text" placeholder="Name" className="contact-field" />
                <input type="email" placeholder="Email" className="contact-field" />
                <input type="text" placeholder="Subject" className="contact-field" />
                <textarea rows="6" placeholder="Message" className="contact-textarea"></textarea>
                <div className="contact-submit">
                  <button type="button" className="site-btn-primary">Submit message</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
