// src/components/SignUp.jsx
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../src/Auth/Firebase';        // adjust path if needed
import '../src/componants/Styles/SignUp.css';
import { Link, useNavigate } from 'react-router-dom';

const auth = getAuth(app);

export default function SignUp() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			console.log('Account Created:', userCredential.user.uid);
			navigate('/login');
		} catch (err) {
			if (err.code === 'auth/email-already-in-use') {
				alert('This email is already registered. Please log in instead.');
				navigate('/login');
			} else {
				console.error('Signup error:', err.code, err.message);
				alert(err.message);
			}
		}
	};


	return (
		<div className="signup-container">
			<form className="signup-form" onSubmit={handleSubmit}>
				<h2>Sign Up</h2>

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

				<button type="submit">Sign Up</button>
				<p>
					Already registered? <Link to="/login">Login</Link>
				</p>
			</form>
		</div>
	);
}
