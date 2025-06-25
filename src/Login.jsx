// src/components/Login.jsx
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../src/Auth/Firebase';              // correct relative path
import '../src/componants/Styles/SignUp.css';            // adjust if your CSS lives elsewhere
import { Link, useNavigate } from 'react-router-dom';

const auth = getAuth(app);

export default function Login({ onLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			// Use the login function, not the createUser one:
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			console.log('Logged in:', userCredential.user.uid);
			// If you have your own backend JWT, call it here and save the token.
			//   onLogin();           // mark app as authenticated
			navigate('/dashboard'); // or wherever your main dashboard lives
		} catch (err) {
			console.error('Login error:', err.code, err.message);
			if (err.code === 'auth/user-not-found') {
				alert('No such user. Please sign up first.');
				navigate('/signup');
			} else {
				alert(err.message);
			}
		}
	};

	return (
		<div className="signup-container">
			<form className="signup-form" onSubmit={handleSubmit}>
				<h2>Login</h2>

				<label htmlFor="email">
					Email:
					<input
						id="email"
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</label>

				<label htmlFor="password">
					Password:
					<input
						id="password"
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</label>

				<button type="submit">Login</button>
				<p>
					Don't have an account? <Link to="/signup">Sign Up</Link>
				</p>
			</form>
		</div>
	);
}
