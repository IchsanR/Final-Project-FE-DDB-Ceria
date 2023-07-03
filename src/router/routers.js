import NotFound from "../pages/NotFound";
import { Home, Login, Register, TransactionPage } from "../pages";
import { Navs } from "../components";

const routes = [
	{
		elements: <Navs children={<Home/>} />,
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
	{
		elements: <Register />,
		path: "register",
		layout: false,
	},
	{
		elements: <TransactionPage />,
		path: "transaction-page",
		layout: false,
	},
	
];

export default routes;
