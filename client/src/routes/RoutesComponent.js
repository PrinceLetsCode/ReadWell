import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import HomeAfterLogin from "../pages/HomeAfterLogin";
import Settings from "../pages/settings/Settings";
import UpdatePassword from '../pages/settings/UpdatePassword';
import UpdateEmail from '../pages/settings/UpdateEmail';
import UpdateUsername from '../pages/settings/UpdateUsername';
import UpdatePhone from '../pages/settings/UpdatePhone';
import ErrorPage from "../pages/ErrorPage";
import UserInfoPage from "../pages/settings/UserInfoPage";

import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import { SidebarProvider } from "../context/sidebarContext";
import { LoggedInProvider } from "../context/loggedInContext";


import AllBooks from "../pages/AllBooks";
import CompletedBooks from "../pages/CompletedBooks";
import FavouriteBooks from "../pages/FavouriteBooks";
import OngoingBooks from "../pages/OngoingBooks";

import ForgotPassword from "../pages/ForgotPassword";

export const RoutesComponent = () => {


	return (
		<LoggedInProvider>
			<Router>
				<SidebarProvider>
					<NavBar />
					<SideBar />
				</SidebarProvider>
				<Routes>
					<Route exact path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/user" element={<HomeAfterLogin />} />
					<Route path="/user/settings" element={<Settings />} />
					<Route path="/user/settings/updateEmail" element={<UpdateEmail />} />
					<Route path="/user/settings/updatePhone" element={<UpdatePhone />} />
					<Route path="/user/settings/updatePassword" element={<UpdatePassword />} />
					<Route path="/user/settings/updateUsername" element={<UpdateUsername />} />
					<Route path="/user/userInfo" element={<UserInfoPage/>}/>

					<Route path="/user/allbooks" element={<AllBooks />} />
					<Route path="/user/ongoingbooks" element={<OngoingBooks />} />
					<Route path="/user/favouritebooks" element={<FavouriteBooks />} />
					<Route path="/user/completedbooks" element={<CompletedBooks />} />

					<Route path="login/forgotpassword" element={<ForgotPassword />} />

					<Route path="/*" element={ <ErrorPage/>} />
				</Routes>
			</Router>
		</LoggedInProvider>
	)
};

