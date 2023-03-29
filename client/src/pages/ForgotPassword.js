/** 
 * @description This is the ForgotPassword page
 * @return {JSX.Element} The JSX code representing the ForgotPassword page.
 * @requires react (for JSX)
 * @requires axios (for making API calls)
 */

// Import the required modules
import React, { useState } from 'react';
import axios from 'axios';


// The ForgotPassword component
const ForgotPassword = () => {

    // State variables for the input fields
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // State variables for the error and success messages    
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    // Function to change the password
    const changePassword = async (e) => {
        e.preventDefault();
        try {

            console.log(email);
            console.log(newPassword);

            // Send a POST request to the server to change the password
            const res = await axios.post('/api/v1/login/forgotPassword', {
                email,
                newPassword,
            });

            console.log(res);
            // If the password is changed successfully then set the success message
            if (res.data.message === 'Password reset successful.') {
                setSuccessMessage(res.data.message);
            }else{
                setErrorMessage(res.data.message);
            }

            setTimeout(() => {
                setSuccessMessage('');
                setErrorMessage('');
            }, 3000);

            // Clear the input fields
            setEmail('');
            setNewPassword('');
            setConfirmNewPassword('');


        } catch (error) {
            // Set the error message
            setErrorMessage(errorMessage);
        }

    };

    // Return the JSX code
    return (
        <section className='main-container'>
            <h1 className='headings'>Reset Your Password</h1>
            <form method='post'>
                <input
                    type="email"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                />

                <input
                    type='password'
                    name='newPassword'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter New Password"
                />

                <input
                    type='password'
                    name='confirmNewPassword'
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm New Password"
                />

                <hr />
                {
                    errorMessage && <div className='fail'>{errorMessage}</div>
                }
                {
                    successMessage && <div className='success'>{successMessage}</div>
                }
                < button
                    disabled={!newPassword || !confirmNewPassword || newPassword !== confirmNewPassword}
                    onClick={changePassword}
                    className='btn'>
                    Change Password
                </button>
            </form>
        </section>
    );
};

// Export the ForgotPassword component
export default ForgotPassword;