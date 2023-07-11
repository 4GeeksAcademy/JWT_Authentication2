import React, { useState, useEffect } from 'react';

// Private Component
export const Private = () => {
    const history = useHistory();
  
    const handleLogout = () => {
      // Remove token from sessionStorage
      sessionStorage.removeItem('token');
      // Redirect to home page
      history.push('/');
    };
  
    useEffect(() => {
      // Check if token exists in sessionStorage
      const token = sessionStorage.getItem('token');
      if (!token) {
        // Redirect to login page if token doesn't exist
        history.push('/login');
      }
    }, [history]);
  
    return (
      <div>
        <h2>Private Page</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }