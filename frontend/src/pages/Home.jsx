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
        <section id="faq" className="section bg-slate-950/80">
          <div className="container">
            <div className="mb-12 text-center">
              <span className="text-sm uppercase tracking-[0.3em] text-violet-400">FAQ</span>
              <h2 className="text-4xl font-bold text-white mt-4">Common questions answered</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {faqs.map((item) => (
                <div key={item.question} className="glass-card p-8">
                  <h3 className="text-xl font-semibold text-white mb-3">{item.question}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="section">
          <div className="container">
            <div className="glass-card p-10 grid gap-8 md:grid-cols-2 items-center">
              <div>
                <span className="text-sm uppercase tracking-[0.3em] text-blue-400">Contact</span>
                <h2 className="text-4xl font-bold text-slate-900 mt-4">Need help getting started?</h2>
                <p className="text-gray-600 mt-4">Reach out to our support team for guidance on the portal, roles, or complaint workflow.</p>
                <div className="mt-8 space-y-4 text-gray-600">
                  <p>support@egrievance-portal.com</p>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              <div className="space-y-4">
                <input type="text" placeholder="Your name" className="form-input form-input-light" />
                <input type="email" placeholder="Your email" className="form-input form-input-light" />
                <textarea rows="5" placeholder="How can we help?" className="form-input form-input-light"></textarea>
                <button type="button" className="btn btn-primary btn-lg w-full">Send message</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
