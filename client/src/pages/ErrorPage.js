import React from 'react'
import { useNavigate } from 'react-router-dom'
const ErrorPage = () => {

	const navigate = useNavigate();

	return (
		<section className='main-container'>
			<h1>Error 404 : Page Not Found</h1>
			<p>The page you are looking for is not found</p>
			<button onClick={() => navigate('/')}>Home Page</button>
		</section>
	)
}

export default ErrorPage