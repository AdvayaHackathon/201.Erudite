import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-left">
          <h1 className="logo">HealthMonitor</h1>
        </div>
        <div className="nav-right">
          <button 
            className="btn btn-outline"
            onClick={() => {
              supabase.auth.signOut();
              navigate('/');
            }}
          >
            Log Out
          </button>
        </div>
      </nav>

      <main className="dashboard-content">
        <div className="dashboard-header">
          <h2>Welcome to Your Dashboard</h2>
          <p>Monitor your health metrics and insights here</p>
        </div>

        <div className="dashboard-grid">
          {/* Placeholder for future dashboard content */}
          <div className="dashboard-card">
            <h3>Health Metrics</h3>
            <p>Your health metrics will appear here</p>
          </div>
          <div className="dashboard-card">
            <h3>Recent Activity</h3>
            <p>Your recent health check-ins will appear here</p>
          </div>
          <div className="dashboard-card">
            <h3>Insights</h3>
            <p>AI-generated health insights will appear here</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 