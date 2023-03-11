import React from 'react'
import { useNavigate } from 'react-router-dom';


const EmailVerificationSuccess = () => {

	const navigate = useNavigate();

	return (
		<section className='main-container'>
			<h1>Success!</h1>
			<p>Thanks for verifying your email, now you can use all site features</p>

			<button className='btn' onClick={() => { navigate('/') }}>Go to Home Page</button>
		</section>
	);
};

export default EmailVerificationSuccess;