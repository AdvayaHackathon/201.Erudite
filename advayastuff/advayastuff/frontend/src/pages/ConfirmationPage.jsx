import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const { type } = useParams();

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-icon">✓</div>
        <h1>{type === 'login' ? 'Login Successful!' : 'Sign Up Successful!'}</h1>
        <p>
          {type === 'login' 
            ? 'You have successfully logged in to your account.'
            : 'Please check your email for verification. Once verified, you can log in to your account.'
          }
        </p>
        <div className="confirmation-buttons">
          {type === 'login' ? (
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/auth" className="btn btn-primary">
              Go to Login
            </Link>
          )}
          <Link to="/" className="btn btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage; 