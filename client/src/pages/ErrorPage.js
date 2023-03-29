/**
 * @description this page is displayed when the user tries to access a page that does not exist
 * @return {JSX.Element} The JSX code representing the ErrorPage page.
 * @requires react (for JSX)
 * @requires react-router-dom (for navigation) 
 * */  


// Import the required modules
import React from 'react'
import { useNavigate } from 'react-router-dom'

// The ErrorPage component 	
const ErrorPage = () => {

	// for navigation
	const navigate = useNavigate();

	// Return the JSX code
	return (
		<section className='main-container'>
			<h1>Error 404 : Page Not Found</h1>
			<p>The page you are looking for is not found</p>
			<button onClick={() => navigate('/')}>Home Page</button>
		</section>
	)
}

// Export the ErrorPage component
export default ErrorPage