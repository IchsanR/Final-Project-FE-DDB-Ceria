import { ForgetPassword, Home, Login, Register, Verificationpage } from "../pages";
import NotFound from "../pages/NotFound";

const routes = [
	{
		elements: <Home />,
		path: "/",
		layout: true,
	},
	{
		elements: <Login />,
		path: "login",
		layout: false,
	},
	{
		elements: <Register />,
		path: "register",
		layout: false,
	},
	{
		elements: <NotFound />,
		path: "*",
		layout: false,
	},
	{
		elements: <Verificationpage />,
		path: "verificationpage",
		layout: false,
	},
	{
		elements: <ForgetPassword />,
		path: "forgot-password",
		layout: false,
	},
];

export default routes;
