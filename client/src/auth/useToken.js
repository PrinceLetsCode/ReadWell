import { useState } from 'react';

const useToken = () => {

	// * setting the token value to the token which is stored in the local storage.
	const [token, setTokenInternal] = useState(() => {
		return localStorage.getItem('token');
	});

	// * setting the recived token from the response in the local storage.
	const setToken = newToken => {
		localStorage.setItem('token', newToken);
		setTokenInternal(newToken);
	}

	// * returning the token and the setToken.
	return [token, setToken];
}

export default useToken;