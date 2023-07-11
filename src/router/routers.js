import NotFound from "../pages/NotFound";
import { Home, Login, Register, TransactionPage,Verificationpage } from "../pages";
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
		elements: <Navs children={<TransactionPage/>} />,
		path: "transaction-page",
		layout: false,
	},
	{
		elements: <Verificationpage />,
		path: "verificationpage",
		layout: false,
	},
	
];

export default routes;
