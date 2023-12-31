import React, { Fragment, useEffect, useState } from "react";
import { Buttons, Inputs, Logo, Spinner } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/api/user";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { revertAll } from "../../redux/api/resetState";
import { Helmet } from "react-helmet";


const Login = () => {
	const [form, setForm] = useState({
		email: "",
		password: ""
	});
	const [checked, setChecked] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLogged, setIsLogged] = useState(false);

	const handleChecked = (e) => {
		e.preventDefault();
		if (e.target.checked === true) return setChecked(true);
		if (e.target.checked === false) return setChecked(false);
	};

	const token = localStorage.getItem('token') || sessionStorage.getItem('token');
	useEffect(() => {
		if (token) {
			Swal.fire({
				title: "Error!",
				text: "You've logged in",
				icon: "error",
				timer: 3000,
			});
			return navigate('/');
		}
	}, []);

	const response = useSelector((state) => {
		return state.login;
	});

	useEffect(() => {
		dispatch(revertAll());
		if (response.isFulfilled && response.data.code == 200) {
			setIsLogged(false);
			Swal.fire({
				title: "Success!",
				text: `Welcome ${response.data.data[0].name}`,
				icon: "success",
				timer: 3000,
			});
			if (checked === false) {
				sessionStorage.setItem("token", response.data.data[0].token);
				sessionStorage.setItem("name", response.data.data[0].name);
				sessionStorage.setItem("email", response.data.data[0].email);
				// dispatch(revertAll());
				return navigate("/");
			} else {
				localStorage.setItem("name", response.data.data[0].name);
				localStorage.setItem("token", response.data.data[0].token);
				localStorage.setItem("email", response.data.data[0].email);
				// dispatch(revertAll());
				return navigate("/");
			}
		}

		if (response.isError && response.data.code === "ERR_NETWORK") {
			setIsLogged(false);
			Swal.fire({
				title: "Error!",
				text: "Internal Server Error",
				icon: "error",
				timer: 3000,
			});
			return;
		}

		if (response.isError && response.data.code === "ERR_BAD_REQUEST") {
			setIsLogged(false);
			Swal.fire({
				title: "Error!",
				text: `Email or password are incorrect`,
				timer: 2500,
				icon: "error",
				showConfirmButton: false,
			});
			return;
		}
	}, [response]);

	const onSubmit = (e) => {
		try {
			e.preventDefault();
			setIsLogged(true);
			if (!form.email || !form.password) {
				Swal.fire({
					title: "Error!",
					text: "Please input your email and password",
					icon: "error",
					timer: 3000,
				});
				setIsLogged(false);
				return;
			}
			dispatch(loginUser({ form }));
		} catch (error) {
			throw error;
		}

	};

	return (
		<Fragment>
			<Helmet>
				<title>Login | DDB Ceria</title>
			</Helmet>
			<div className="flex justify-center items-center flex-col h-screen w-screen px-4">
				<header>
					<Logo />
				</header>
				<main className="md:w-[500px] w-full">
					<form className=" w-full" onSubmit={(e) => onSubmit(e)}>
						<div className="my-10">
							<h1 className="font-bold text-2xl">Sign in to your account</h1>
						</div>
						<div className="mb-3">
							<Inputs id={"email"} placeholder={"name@company.com"} label={"Your Email"} type={"email"} onChange={(e) => setForm({ ...form, email: e.target.value })} required
							/>
						</div>
						<div className="mb-3">
							<Inputs id={"password"} placeholder={"**********"} label={"Your Password"} type={"password"} onChange={(e) => setForm({ ...form, password: e.target.value })} required
							/>
						</div>
						<div className="flex justify-between my-3">
							<div className="flex">
								<input type="checkbox" id="rememberMe" className="w-4 h-4 mr-3 my-auto" onChange={(e) => handleChecked(e)} />
								<label htmlFor="rememberMe" className="text-[#6B7280] my-auto">Remember Me</label>
							</div>
							<div>
								<Link to={"/forgot-password"} className="text-violet-800 font-semibold" >Forgot Password?</Link>
							</div>
						</div>
						<div className="my-6">
							<Buttons type={"submit"} classname={"w-full bg-violet-800 text-white h-12 rounded-lg hover:bg-violet-900"} description={!isLogged ? "Sign In" : <Spinner />} disabled={isLogged} />
						</div>
					</form>
					<div>
						<p className="text-[#6B7280]" >Don"t have account yet? <span><Link className="text-violet-800 font-semibold" to={"/register"}>Sign Up</Link></span></p>
					</div>
				</main>
			</div>
		</Fragment>
	);
};

export default Login;