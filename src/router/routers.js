import { Home, Login, Register } from "../pages";

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
];

export default routes;
