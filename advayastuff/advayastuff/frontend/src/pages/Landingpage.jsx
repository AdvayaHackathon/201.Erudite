import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabase';
import UserProfile from '../components/UserProfile';
import './Landingpage.css';// Adjusted path to match src/styles/

const LandingPage = () => {
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
    <div className="landing-container">
      {/* Hero Section */}
      <header className="hero">
        <nav className="navbar">
          <div className="logo">HealthMonitor</div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="nav-buttons">
            {session ? (
              <UserProfile user={session.user} />
            ) : (
              <>
                <Link to="/auth" className="btn btn-secondary">Log In</Link>
                <Link to="/auth" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
        
        <div className="hero-content">
          <div className="hero-text">
            <h1>Transforming Healthcare Monitoring</h1>
            <p>Advanced, no-hardware health monitoring through everyday cameras. Empowering clinicians with AI-enhanced insights for better patient care.</p>
            <div className="hero-buttons">
              <Link 
                to={session ? "/dashboard" : "/auth"} 
                className="btn btn-primary"
              >
                {session ? "Go to Dashboard" : "Get Started"}
              </Link>
              <Link to="/learn-more" className="btn btn-outline">Learn More</Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-placeholder">
              <div className="dashboard-preview"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-header">
          <h2>Innovative Health Monitoring Features</h2>
          <p>Our platform leverages everyday cameras to deliver comprehensive health insights</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👁️</div>
            <h3>Neuro-Vision Screening</h3>
            <p>Advanced algorithms detect subtle neurological indicators through standard video capture.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Remote Photoplethysmography</h3>
            <p>Monitor heart rate and vital signs without physical contact using rPPG technology.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">😊</div>
            <h3>Micro-Expression Analysis</h3>
            <p>Capture subtle emotional and physiological responses through facial analysis.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🚶</div>
            <h3>Gait Analysis</h3>
            <p>Comprehensive mobility assessment through advanced pose detection algorithms.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Simple, non-invasive monitoring that integrates seamlessly into daily life</p>
        </div>
        
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Video Capture</h3>
              <p>Patients simply use their smartphone or webcam for brief daily health check-ins.</p>
            </div>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>AI Analysis</h3>
              <p>Our algorithms process the video to extract vital signs, neurological indicators, and mobility metrics.</p>
            </div>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Clinical Dashboard</h3>
              <p>Healthcare providers receive organized, actionable insights through our intuitive dashboard.</p>
            </div>
          </div>
          
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Personalized Care</h3>
              <p>Clinicians can make data-driven decisions to optimize patient treatment and care plans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo">HealthMonitor</div>
            <p>Advanced health monitoring without additional hardware</p>
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

export default LandingPage;