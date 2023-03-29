/** 
 * @description: This is the home page of the application. It has a welcome message and a button to navigate to the user page.
 * @return {JSX.Element} The JSX code representing the HomePage page.
 * @requires react (for JSX)
 * @requires react-router-dom (for navigation)
 * @requires ..context/loggedInContext (for checking if the user is logged in)
 */


// Import the required modules
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoggedInContext } from "../context/loggedInContext";


// The HomePage component
const HomePage = () => {

    // for navigation
    const navigate = useNavigate();

    // get the loggedIn state from the context
    const { loggedIn } = useLoggedInContext();


    // Return the JSX code
    return (
        <section className='main-container'>
            {loggedIn
                //  If the user is logged in, show the user page with the add books button
                ? <section className="home-container">
                    <h1> ReadWell</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatem nisi velit assumenda reprehenderit,
                        dolores eos accusantium beatae ea, eveniet quidem
                        veniam et suscipit delectus minus molestias commodi
                        vitae vel aliquid!
                    </p>
                    <div className="btn-div">
                        <button
                            className="btn"
                            onClick={() => {
                                navigate("/user");
                            }}
                        >
                            Add Books
                        </button>
                    </div>
                </section>
                :
                //  If the user is not logged in, show the home page with the login and signup buttons
                <section className="content-container">
                    <h1>ReadWell</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatem nisi velit assumenda reprehenderit,
                        dolores eos accusantium beatae ea, eveniet quidem
                        veniam et suscipit delectus minus molestias commodi
                        vitae vel aliquid!
                    </p>
                    <div className="btn-div">
                        <button
                            className="btn"
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Log In
                        </button>
                        <button
                            className="btn"
                            onClick={() => {
                                navigate("/signup");
                            }}
                        >
                            Sign Up
                        </button>
                    </div>
                </section>}
        </section>
    );
};


// Export the HomePage component
export default HomePage;
