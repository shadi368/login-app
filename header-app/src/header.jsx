// Header.js
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // State to control menu visibility

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowSignUpForm(false);
  };

  const handleSignUpClick = () => {
    setShowSignUpForm(true);
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setShowMenu(false); // Hide the menu on logout
    alert('You have logged out successfully!');
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Toggle menu visibility
  };

  return (
    <div>
      <header className={`flex justify-between items-center p-4 w-full border-b border-gray-300 ${isLoggedIn ? 'bg-red-500' : 'bg-gray-100'}`}>
        <h1 className="text-2xl font-bold text-gray-800">Logo</h1>
        <nav>
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={toggleMenu} className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800">
                Menu
              </button>
              {/* Menu */}
              {showMenu && <Menu handleLogout={handleLogout} />}
            </div>
          ) : (
            <>
              <button onClick={handleLoginClick} className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300">
                Log In
              </button>
              <button onClick={handleSignUpClick} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                Sign Up
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Conditionally Render Forms */}
      {showLoginForm && <LoginForm closeForm={() => { setShowLoginForm(false); setShowSignUpForm(false); }} setIsLoggedIn={setIsLoggedIn} />}
      {showSignUpForm && <SignUpForm closeForm={() => { setShowSignUpForm(false); setShowLoginForm(false); }} />}
    </div>
  );
};

const Menu = ({ handleLogout }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10">
      <ul className="py-2">
        <li>
          <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Profile
          </a>
        </li>
        <li>
          <a href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Settings
          </a>
        </li>
        <li>
          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

const LoginForm = ({ closeForm, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setIsLoggedIn(true);
      closeForm(); // Close the form after successful login
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Log In</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Log In
          </button>
        </form>
        <button onClick={closeForm} className="mt-3 text-sm text-gray-500 underline">
          Close
        </button>
      </div>
    </div>
  );
};

const SignUpForm = ({ closeForm }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      setError('User with this email already exists.');
    } else {
      const newUser = { username, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('User signed up successfully!');
      closeForm(); // Close the form after successful sign-up
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
        </form>
        <button onClick={closeForm} className="mt-3 text-sm text-gray-500 underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default Header;
