import { Login } from "../pages";
import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from "react-router-dom";
import Swal from "sweetalert2";
import routers from "./routers";

const Router = () => {
	const PrivateRoute = () => {
		const token = localStorage.getItem("token") || sessionStorage.getItem("token");
		if (token) {
			return <Outlet />;
		} else {
			Swal.fire({
				title: "Halaman tidak bisa di akses",
				text: "Harap login terlebih dahulu",
				icon: "error",
			});
			return <Navigate to={"/login"} />;
		}
	};
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					{routers.map((item, i) => (
						<>
							{item.layout === true ? (
								<Route key={i} element={<PrivateRoute />}>
									<Route index element={item.elements} path={item.path} />
								</Route>
							) : (
								<Route
									path={item.path}
									element={item.elements}
								/>
							)}
						</>
					))}
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
