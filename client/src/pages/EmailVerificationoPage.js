import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EmailVerificationFail from './EmailVerificationFail';
import EmailVerificationSuccess from './EmailVerificationSuccess';


const EmailVerificationPage = () => {


	const [isLoading, setIsLoading] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);
	const { verificationString } = useParams();


	useEffect(() => {
		const loadVerification = async () => {
			try {
				const res = await axios.post('/api/v1/user/verifyEmail', {
					verificationString
				});

				console.log(verificationString);
				
				const data = res.data;
				const { isVerified } = data;
				if (isVerified)
				{
					setIsSuccess(true);
				}
				else {
					setIsSuccess(false);
				}
				setIsLoading(false);

			} catch (error) {
				console.log(error);
				setIsSuccess(false);
				setIsLoading(false);
			}
		};

		loadVerification();
	}, [verificationString])

	if (isLoading) return <p>Loading...</p>;
	if (!isSuccess) return <EmailVerificationFail />
	return <EmailVerificationSuccess />
};

export default EmailVerificationPage;