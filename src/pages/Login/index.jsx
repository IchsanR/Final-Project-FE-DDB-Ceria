import React from "react";
import { Inputs, Logo } from "../../components";

const Login = () => {
	return (
		<div className="flex justify-center items-center flex-col h-screen w-screen px-4">
			<header>
				<Logo />
			</header>
			<main className="md:w-[500px] w-full">
				<form className=" w-full">
					<div className="my-10">
						<h1 className="font-bold text-2xl">Sign in to your account</h1>
					</div>
					<div className="mb-3">
						<Inputs id={"email"} placeholder={"name@company.com"} label={"Your Email"} type={"email"}
						/>
					</div>
					<div className="mb-3">
						<Inputs id={"password"} placeholder={"**********"} label={"Your Password"} type={"password"}
						/>
					</div>
				</form>
			</main>
		</div>
	);
};

export default Login;
