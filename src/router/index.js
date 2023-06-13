import { Home, Login } from "../pages";

const routes = [
	{
		elements: <Home />,
		path: "/",
		layout: true,
	},
	{
		elements: <Login />,
		path: "/login",
		layout: false,
	},
];

export default routes;
