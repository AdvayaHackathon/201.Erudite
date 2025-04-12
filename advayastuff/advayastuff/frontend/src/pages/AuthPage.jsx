import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    number: false,
    uppercase: false,
    special: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check for OAuth callback
    const handleOAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session) {
        // Store user data in localStorage for the dashboard
        localStorage.setItem('user', JSON.stringify({
          name: session.user.user_metadata.name || 'User',
          email: session.user.email
        }));
        navigate('/dashboard');
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  const checkPasswordRequirements = (pass) => {
    setPasswordRequirements({
      length: pass.length >= 8,
      number: /[0-9]/.test(pass),
      uppercase: /[A-Z]/.test(pass),
      special: /[^A-Za-z0-9]/.test(pass)
    });
  };

  const handlePasswordChange = (e) => {
    const pass = e.target.value;
    setPassword(pass);
    checkPasswordRequirements(pass);
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        // Store user data in localStorage for the dashboard
        localStorage.setItem('user', JSON.stringify({
          name: data.user.user_metadata.name || 'User',
          email: data.user.email
        }));
        
        navigate('/dashboard');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
          },
        });

        if (error) throw error;
        
        // Store user data in localStorage for the dashboard
        localStorage.setItem('user', JSON.stringify({
          name: name,
          email: email
        }));
        
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p>{isLogin ? 'Sign in to continue to HealthVision' : 'Join HealthVision to get started'}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {!isLogin && (
              <div className="password-requirements">
                <div className={`requirement ${passwordRequirements.length ? 'valid' : ''}`}>
                  {passwordRequirements.length ? '✓' : '✗'} At least 8 characters
                </div>
                <div className={`requirement ${passwordRequirements.number ? 'valid' : ''}`}>
                  {passwordRequirements.number ? '✓' : '✗'} Contains a number
                </div>
                <div className={`requirement ${passwordRequirements.uppercase ? 'valid' : ''}`}>
                  {passwordRequirements.uppercase ? '✓' : '✗'} Contains uppercase letter
                </div>
                <div className={`requirement ${passwordRequirements.special ? 'valid' : ''}`}>
                  {passwordRequirements.special ? '✓' : '✗'} Contains special character
                </div>
              </div>
            )}
          </div>

          {isLogin && (
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button 
            type="submit" 
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="auth-toggle"
            >
              {isLogin ? ' Sign Up' : ' Sign In'}
            </button>
          </p>
        </div>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div className="social-auth">
          <button 
            type="button"
            className="social-btn"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <img src="/google-icon.svg" alt="Google" />
            Google
          </button>
          <button 
            type="button"
            className="social-btn"
            onClick={handleGoogleSignIn}
          >
            <img src="/microsoft-icon.svg" alt="Microsoft" />
            Microsoft
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 