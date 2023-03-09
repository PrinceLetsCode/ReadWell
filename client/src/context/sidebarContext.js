/**
	This module exports the SidebarContext, SidebarProvider, and useSidebarContext components.
	The SidebarContext is a React context that provides information about the sidebar state,
	and the SidebarProvider component is responsible for managing the state of the context.
	The useSidebarContext hook allows child components to access the sidebar state from the context.
*/

import React, { useContext, useState } from 'react';

// Create a new React context for the sidebar state
const SidebarContext = React.createContext();

/**
	The SidebarProvider component is responsible for managing the state of the SidebarContext.
	It uses the useState hook to keep track of the sidebar state, and provides a toggleSidebar
	function to update the state. The isSidebarOpen state is initially set to false.
	@param {Object} props - The children of the SidebarProvider component
	@return {JSX.Element} The JSX code representing the SidebarProvider component
*/
const SidebarProvider = ({ children }) => {
	// Set the initial state of isSidebarOpen to false
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// The toggleSidebar function toggles the value of isSidebarOpen
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	}

	// Provide the isSidebarOpen state and the toggleSidebar function to child components
	return (
		<SidebarContext.Provider value={{
			isSidebarOpen,
			toggleSidebar
		}}>
			{children}
		</SidebarContext.Provider>
	)
};

/**
	The useSidebarContext hook allows child components to access the sidebar state from the SidebarContext.
	@return {Object} An object containing the isSidebarOpen state and the toggleSidebar function
*/
export const useSidebarContext = () => {
	return useContext(SidebarContext);
}

export { SidebarProvider }
