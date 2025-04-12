import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabase';
import UserProfile from '../components/UserProfile';
import './LearnMore.css';

const LearnMore = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="learn-more-container">
      <nav className="nav">
        <div className="nav-left">
          <Link to="/" className="logo">
            HealthMonitor
          </Link>
        </div>
        <div className="nav-right">
          <Link to="/learn-more" className="nav-link">
            Learn More
          </Link>
          {session ? (
            <UserProfile user={session.user} />
          ) : (
            <>
              <Link to="/auth" className="nav-link">
                Login
              </Link>
              <Link to="/auth" className="nav-link signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      {/* Hero Section */}
      <section className="learnmore-hero">
        <div className="section-header">
          <h1>Revolutionizing Health Monitoring</h1>
          <p>Discover how everyday technology transforms patient care</p>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">
            <img 
              src="https://media.licdn.com/dms/image/v2/D4D12AQFIZ6wp4OYCfQ/article-cover_image-shrink_720_1280/B4DZT6O6xvGcAI-/0/1739365006037?e=1749686400&v=beta&t=SIY8p-RT35zOPbIYBkhCtiJjJlGQ-nY-ymr0GvYGtYI" 
              alt="Smart Health Data Capture"
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="technology-section">
        <div className="section-header">
          <h2>Innovative Technology</h2>
          <p>Empowering healthcare with camera-based AI and computer vision</p>
        </div>
        <div className="technology-content">
          <div className="technology-text">
            <h3>Advanced Vision &amp; AI Analysis</h3>
            <p>
              Our system uses everyday smartphone cameras to conduct sophisticated neuro-vision screening, capturing subtle cognitive and visual responses without any additional hardware.
            </p>
            <p>
              Leveraging remote photoplethysmography (rPPG), we accurately measure vital signs by detecting minute skin color variations, ensuring continuous monitoring of cardiovascular and autonomic health.
            </p>
          </div>
          <div className="technology-image">
            <div className="image-placeholder">
              <img 
                src="https://www.impactqa.com/wp-content/uploads/2022/02/Artificial-Intelligence-AI-and-its-Assistance-in-Medical-Diagnosis-Blog.png"
                alt="Real-Time AI Diagnostics"
                className="tech-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits-section">
        <div className="section-header">
          <h2>Key Benefits</h2>
          <p>Transforming healthcare with non-invasive, cost-effective monitoring solutions</p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">📱</div>
            <h3>Seamless Integration</h3>
            <p>
              Capture essential health data effortlessly using your smartphone or webcam without the hassle of extra devices.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📊</div>
            <h3>Comprehensive Insights</h3>
            <p>
              Our platform integrates neuro-vision, rPPG, micro-expression, and pose detection to provide a holistic view of patient health.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">⏱️</div>
            <h3>Real-Time Monitoring</h3>
            <p>
              Enjoy continuous health tracking with instant analysis of vital signs and physiological responses throughout the day.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Cost Effective</h3>
            <p>
              Eliminate the need for expensive wearables with our software solution that leverages existing devices for monitoring.
            </p>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="research-section">
        <div className="section-header">
          <h2>Clinical Research &amp; Development</h2>
          <p>Grounded in evidence-based science and advanced machine learning</p>
        </div>
        <div className="research-content">
          <div className="research-image">
            <div className="image-placeholder">
              <img 
                src="https://www.bizzbuzz.news/h-upload/2021/06/01/1081904-new-project.webp"
                alt="R&D in HealthTech"
                className="research-img"
              />
            </div>
          </div>
          <div className="research-text">
            <h3>Evidence-Based Innovation</h3>
            <p>
              Our research combines state-of-the-art computer vision with clinical expertise to create a non-invasive health monitoring system that is both accurate and reliable.
            </p>
            <p>
              Continuous studies and improvements ensure that our platform achieves up to 95% accuracy in detecting vital health indicators and subtle patient responses.
            </p>
            <div className="research-stats">
              <div className="stat">
                <span className="stat-number">95%</span>
                <span className="stat-label">Detection Accuracy</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Continuous Monitoring</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Health Metrics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Experience the Future of Health Monitoring</h2>
          <p>Join healthcare providers who are leveraging innovative, real-time, non-invasive monitoring to enhance patient outcomes.</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Schedule a Demo</button>
            <button className="btn btn-secondary">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo">HealthMonitor</div>
            <p>Advanced health insights without additional hardware</p>
          </div>
          <div className="footer-links">
            <div className="link-column">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Case Studies</a>
              <a href="#">Documentation</a>
            </div>
            <div className="link-column">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
            </div>
            <div className="link-column">
              <h4>Resources</h4>
              <a href="#">Support</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">HIPAA Compliance</a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>© {new Date().getFullYear()} HealthMonitor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LearnMore;
