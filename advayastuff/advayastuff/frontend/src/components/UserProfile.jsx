import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import './UserProfile.css';

const UserProfile = ({ user }) => {
  const navigate = useNavigate();

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div className="user-profile">
      <div className="profile-picture">
        {getInitial(user?.user_metadata?.name || 'User')}
      </div>
      <div className="profile-info">
        <span className="welcome-text">Welcome, {user?.user_metadata?.name || 'User'}!</span>
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserProfile; 