import { Home, Login } from "../pages";
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
		elements: <NotFound />,
		path: "*",
		layout: false,
	},
];

export default routes;
