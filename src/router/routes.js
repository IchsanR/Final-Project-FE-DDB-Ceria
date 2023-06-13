import React from "react";
import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from "react-router-dom";
import routers from "./routers";
import Swal from "sweetalert2";

const Router = () => {
	const PrivateRoute = () => {
		const token = localStorage.getItem("token");
		const session = localStorage.getItem("session");
		if (token && session) {
			return <Outlet />;
		} else {
			Swal.fire({
				title: "Halaman tidak bisa di akses",
				text: "Harap login terlebih dahulu",
				icon: "error",
			});
			return <Navigate to={"/"} />;
		}
	};
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					{routers.map((item) => (
						<>
							{item.layout === true ? (
								<Route key={item.elements} element={<PrivateRoute />}>
									<Route index element={item.elements} path={item.path} />
								</Route>
							) : (
								<Route
									path={item.path}
									element={item.elements}
									key={item.elements}
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
