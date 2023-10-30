import React, { useContext, useState } from 'react';
import { UserContext } from './context'; 
import { useNavigate } from 'react-router-dom'; // 1. Import the useNavigate hook
import './CommonStyles.css';

function Login() {
  const { findUser, setLoggedInUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const navigate = useNavigate(); // 2. Initialize the useNavigate hook

  const handleLogin = (e) => {
    e.preventDefault();
    const user = findUser(email);
    if(user && user.password === password) {
        setLoggedInUser({
            ...user,         // Preserve other properties of the user
            avatarURL: user.avatarURL // Use the user's chosen avatar URL
        });
        setStatus(`Welcome back, ${user.name}!`);
        navigate('/'); // Redirect to the appropriate page
    } else {
        setStatus('Invalid email or password. Please try again.');
    }
}

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">Login</div>
        <div className="card-body">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email:</label>
              <input 
                type="email" 
                className="form-control"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input 
                type="password" 
                className="form-control"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <div className="mt-3">{status}</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
