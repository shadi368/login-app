import React, { useState } from 'react';

const SignUpForm = ({ closeForm }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      setError('User with this email already exists.');
    } else {
      const newUser = { username, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('User signed up successfully!');
      setIsLoggedIn(true);
      setCurrentUser(newUser);
      clearFields(); // Reset input fields
      closeForm(); // Close the form after successful sign-up
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      setError('');
      alert('Logged in successfully!');
      clearFields(); // Reset input fields
      closeForm(); // Close the form after successful login
    } else {
      setError('Invalid email or password.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    alert('Logged out successfully!');
    clearFields(); // Reset input fields on logout
  };

  const clearFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">{isLoggedIn ? 'Welcome!' : 'Sign Up'}</h2>
        {!isLoggedIn ? (
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
            <p className="text-sm text-center mt-2">Already have an account? Log in below!</p>
          </form>
        ) : (
          <div className="text-center">
            <p className="bg-red-500 text-white p-2 rounded mb-3">
              You are logged in as {currentUser.username}
            </p>
            <button onClick={handleLogout} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
              Logout
            </button>
          </div>
        )}
        {!isLoggedIn && (
          <form onSubmit={handleLogin} className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Or Log In</h3>
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
            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
              Log In
            </button>
          </form>
        )}
        <button onClick={closeForm} className="mt-3 text-sm text-gray-500 underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
