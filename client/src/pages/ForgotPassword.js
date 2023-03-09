import React, { useState } from 'react'
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const changePassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/login/forgotPassword', {
                email,
                newPassword,
            });


            setSuccessMessage('Password Reset Successful');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);


            setEmail('');
            setNewPassword('');
            setConfirmNewPassword('');

        } catch (error) {
            setErrorMessage(errorMessage);
            console.log(errorMessage);
        }

    }


    return (
        <section>
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
                    errorMessage && <div>{errorMessage}</div>
                }
                {
                    successMessage && <div>{successMessage}</div>
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

export default ForgotPassword;