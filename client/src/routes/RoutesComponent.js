/** 
 * @description This is the main routes component which is used to render the routes of the application.
 * @returns routes of the application.
 */

// Importing the required modules and components.

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

import HomePage from "../pages/HomePage";
import HomeAfterLogin from "../pages/HomeAfterLogin";


import UserInfoPage from "../pages/settings/UserInfoPage";
import Settings from "../pages/settings/Settings";

import UpdatePassword from '../pages/settings/UpdatePassword';
import UpdateEmail from '../pages/settings/UpdateEmail';
import UpdateUsername from '../pages/settings/UpdateUsername';
import UpdatePhone from '../pages/settings/UpdatePhone';


import ErrorPage from "../pages/ErrorPage";

import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';

import AllBooks from "../pages/AllBooks";
import CompletedBooks from "../pages/CompletedBooks";
import FavouriteBooks from "../pages/FavouriteBooks";
import OngoingBooks from "../pages/OngoingBooks";


import ForgotPassword from "../pages/ForgotPassword";
import PleaseVerifyEmailPage from "../pages/PleaseVerifyEmailPage";
import EmailVerificationPage from "../pages/EmailVerificationoPage";

// Importing the context providers.
import { SidebarProvider } from "../context/sidebarContext";
import { LoggedInProvider } from "../context/loggedInContext";
import { AllBooksProvider } from "../context/allBooksContext";


export const RoutesComponent = () => {
	return (

		// Wrapping the routes with the context providers.
		<LoggedInProvider>
			<Router>

				{/*  Wrapping the sidebar and navbar with the sidebar context provider.  */}
				<SidebarProvider>
					<NavBar />
					<SideBar />
				</SidebarProvider>


				{/*  Routes of the application.  */}
				<Routes>
					<Route exact path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />


					<Route path="/user" element={<HomeAfterLogin />} />
					<Route path="/user/pleaseVerifyEmail" element={<PleaseVerifyEmailPage />} />
					<Route path="/user/verifyEmail/:verificationString" element={<EmailVerificationPage />} />
					<Route path="/user/settings" element={<Settings />} />
					<Route path="/user/settings/updateEmail" element={<UpdateEmail />} />
					<Route path="/user/settings/updatePhone" element={<UpdatePhone />} />
					<Route path="/user/settings/updatePassword" element={<UpdatePassword />} />
					<Route path="/user/settings/updateUsername" element={<UpdateUsername />} />
					<Route path="/user/userInfo" element={<UserInfoPage />} />


					{/*  Wrapping the routes with the all books context provider.*/}
					<Route
						path="/user/allbooks"
						element={
							<AllBooksProvider>
								<AllBooks />
							</AllBooksProvider>
						}
					/>

					{/*  Wrapping the routes with the all books context provider.*/}
					<Route
						path="/user/ongoingbooks"
						element={
							<AllBooksProvider>
								<OngoingBooks />
							</AllBooksProvider>}
					/>
					
					{/*  Wrapping the routes with the all books context provider.*/}
					<Route
						path="/user/favouritebooks"
						element={
							<AllBooksProvider>
								<FavouriteBooks />
							</AllBooksProvider>
						}
					/>

					{/*  Wrapping the routes with the all books context provider.*/}
					<Route
						path="/user/completedbooks"
						element={
							<AllBooksProvider>
								<CompletedBooks />
							</AllBooksProvider>
						}
					/>

					<Route path="login/forgotpassword" element={<ForgotPassword />} />
					<Route path="/*" element={<ErrorPage />} />
				</Routes>
			</Router>
		</LoggedInProvider>
	)
};

