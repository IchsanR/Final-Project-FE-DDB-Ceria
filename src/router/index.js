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
		layout: true,
	},
];

export default routes;
