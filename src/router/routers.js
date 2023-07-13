import { Navs } from "../components";
import NotFound from "../pages/NotFound";
import { Home, Login, Register, TransactionPage,Verificationpage, CreatePassword, ForgetPassword, ForgetVerification } from "../pages";

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
