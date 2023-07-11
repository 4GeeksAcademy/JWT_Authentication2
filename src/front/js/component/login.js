import React, { useState, useEffect } from 'react';

// Login Component
export const Login =() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        if (response.ok) {
          const token = await response.json();
          sessionStorage.setItem('token', token);
          // Redirect to private page
          history.push('/private');
        } else {
          // Handle error case
        }
      } catch (error) {
        // Handle error case
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}