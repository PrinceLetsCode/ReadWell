import { useState, useEffect } from 'react';
import useToken from './useToken';

const useUser = () => {

	// * 1. getting the token from useToken.
	const [token] = useToken();


	// * 3. getting the payload from the token.
	const getPayloadFromToken = token => {
		const encodedPayload = token.split('.')[1];
		return JSON.parse(atob(encodedPayload));
	}

	const [user, setUser] = useState(() => {
		// * 5. setting the user to the user details got in payload.
		if (!token) return null;
		return getPayloadFromToken(token);
	});

	// * 2. checking for the token to change.
	useEffect(() => {	
		// * if token doesn't exist set the user to null.
		if (!token) {
			setUser(null);
		} else {
			// * if user exists get the payload.
			setUser(getPayloadFromToken(token));
			// * 4. setUser(payload)
		}
	}, [token]);

	return user;
}

export default useUser;