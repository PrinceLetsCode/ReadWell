import React from 'react';
import { useNavigate } from 'react-router-dom';


const EmailVerificationFail = () => {

	const navigate = useNavigate();

	return (
		<section className='main-container'>
				<h1>Uh Oh...</h1>
				<p>Something went wrong while trying to verify your email.</p>

				<button className='btn' onClick={() => { navigate('/signup') }}>Back to Sign Up Page</button>
		</section>);
};

export default EmailVerificationFail;