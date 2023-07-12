import { Navs } from "../components";
import { CreatePassword, ForgetPassword, ForgetVerification, Home, Login, Register, Verificationpage } from "../pages";
import NotFound from "../pages/NotFound";

const routes = [
	{
		elements: <Navs children={<Home />} />,
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
	{
		elements: <ForgetVerification />,
		path: "verification",
		layout: false
	},
	{
		elements: <CreatePassword />,
		path: "setpassword",
		layout: false
	}
];

export default routes;
