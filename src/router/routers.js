import { Navs } from "../components";
import { ForgetPassword, Home, Login, Register } from "../pages";
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
		elements: <ForgetPassword />,
		path: "forgot-password",
		layout: false,
	},
];

export default routes;
