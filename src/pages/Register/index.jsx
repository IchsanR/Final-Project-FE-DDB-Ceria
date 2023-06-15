import React from "react";
import { Buttons, Inputs, Logo } from "../../components";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-3 py-3">
      <header className="mb-2">
        <Logo />
      </header>
      <main className="md:w-[500px] w-full max-w-md">
        <form className="w-full">
          <div className="my-6">
            <h1 className="font-bold text-2xl">Create an Account</h1>
          </div>
          <div className="mb-3">
            <Inputs
              id={"name"}
              placeholder={"your name"}
              label={"Name"}
              type={"name"}
            />
          </div>
          <div className="mb-3">
            <Inputs
              id={"email"}
              placeholder={"name@company.com"}
              label={"Your Email"}
              type={"email"}
            />
          </div>
          <div className="mb-3">
            <Inputs
              id={"phone"}
              placeholder={"0812xxxxxx"}
              label={"Phone Number"}
              type={"number"}
            />
          </div>
          <div className="mb-3">
            <Inputs
              id={"password"}
              placeholder={"**********"}
              label={"Your Password"}
              type={"password"}
            />
          </div>
          <div className="flex justify-between my-3">
            <div>
              <input
                type="checkbox"
                id="rememberMe"
                className="w-4 h-4 mr-3 top-1/2 relative -translate-y-1/2"
              />
              <label htmlFor="rememberMe" className="text-[#6B7280]">
                I accept the{" "}
                <span>
                  <Link className="text-violet-800 font-semibold">
                    Terms and Conditions
                  </Link>
                </span>
              </label>
            </div>
          </div>
          <div className="my-6">
            <Buttons
              type={"submit"}
              classname={
                "w-full bg-violet-800 text-white h-12 rounded-lg hover:bg-violet-900"
              }
              description={"Sign Up"}
            />
          </div>
        </form>
        <div>
          <p className="text-[#6B7280]">
            Already have an account?{" "}
            <span>
              <Link className="text-violet-800 font-semibold">Login Here</Link>
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
