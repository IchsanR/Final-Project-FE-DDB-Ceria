import { Home, Login, Register } from "../pages";
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
];

export default routes;
