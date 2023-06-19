import NotFound from "../pages/NotFound";
import { Home, Login, Register, TransactionPage } from "../pages";

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
