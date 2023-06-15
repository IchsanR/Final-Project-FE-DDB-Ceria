import React, { useState } from "react";
import { Buttons, Inputs, Logo } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/api/User";
import Swal from "sweetalert2";

const Login = () => {
	const [form, setForm] = useState({
		email: "",
		password: ''
	});
	const [checked, setChecked] = useState(false);
	const navigate = useNavigate();
	const [loginUser] = useLoginUserMutation();

	const handleChecked = (e) => {
		e.preventDefault();
		if (e.target.checked === true) return setChecked(true);
		if (e.target.checked === false) return setChecked(false);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const handleSuccess = (response) => {
			if (response.data.code === 200) {
				Swal.fire({
					title: "Success!",
					text: `Selamat datang ${response.data.data.name}`,
					icon: "success",
					timer: 3000,
				});
				localStorage.setItem('token', response.data.data.token.split(' ')[1]);
			} else {
				Swal.fire({
					title: "Error!",
					text: response.data.message,
					timer: 2500,
					icon: "error",
					showConfirmButton: false,
				});
			}
		};

		if (checked === false)
			return Swal.fire({
				title: "Error!",
				text: "Please, accept the user agreement",
				icon: "error",
				showConfirmButton: true,
				confirmButtonText: "OK!",
			});
		if (checked === true) {
			return loginUser(form)
				.then((response) => {
					handleSuccess(response);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (
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
						<Inputs id={"email"} placeholder={"name@company.com"} label={"Your Email"} type={"email"} onChange={(e) => setForm({ ...form, email: e.target.value })}
						/>
					</div>
					<div className="mb-3">
						<Inputs id={"password"} placeholder={"**********"} label={"Your Password"} type={"password"} onChange={(e) => setForm({ ...form, password: e.target.value })}
						/>
					</div>
					<div className="flex justify-between my-3">
						<div>
							<input type="checkbox" id="rememberMe" className="w-4 h-4 mr-3 top-1/2 relative -translate-y-1/2" onChange={(e) => handleChecked(e)} />
							<label htmlFor="rememberMe" className="text-[#6B7280]">Remember Me</label>
						</div>
						<div>
							<Link to={'/'} className="text-violet-800 font-semibold" >Forgot Password?</Link>
						</div>
					</div>
					<div className="my-6">
						<Buttons type={'submit'} classname={'w-full bg-violet-800 text-white h-12 rounded-lg hover:bg-violet-900'} description={'Sign In'} />
					</div>
				</form>
				<div>
					<p className="text-[#6B7280]" >Don't have account yet? <span><Link className="text-violet-800 font-semibold">Sign Up</Link></span></p>
				</div>
			</main>
		</div>
	);
};

export default Login;
