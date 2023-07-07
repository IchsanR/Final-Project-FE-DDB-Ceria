import React, { useEffect, useState } from "react";
import { Buttons, Inputs, Logo, Spinner } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { sendEmailForgotPassword } from "../../redux/api/user";


const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSent, setIsSent] = useState(false);

  const onSubmit = (e) => {
    try {
      e.preventDefault();
      setIsSent(true);

      const handleSuccess = (response) => {
        console.log(response);
        if (response.code === 200) {
          setIsSent(false);
          Swal.fire({
            title: "Verification code sent!",
            text: `Please check your email`,
            icon: "success",
            timer: 3000,
          });
        } else {
          setIsSent(false);
          Swal.fire({
            title: "Error!",
            text: `${response.message}`,
            icon: "error",
            timer: 3000,
          });
        }
      };

      const handleError = () => {
        setIsSent(false);
        Swal.fire({
          title: "Error!",
          text: "Internal Server Error",
          timer: 2500,
          icon: "error",
          showConfirmButton: false,
        });
      };

      dispatch(sendEmailForgotPassword({ email, handleSuccess, handleError }));
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen w-screen px-4">
      <header>
        <Logo />
      </header>
      <main className="md:w-[500px] w-full">
        <form className=" w-full" onSubmit={(e) => onSubmit(e)}>
          <div className="mb-5 mt-10">
            <h1 className="font-bold text-2xl">Forgot Password</h1>
          </div>
          <div className="my-5">
            <p>Please fill your email so we can send the verification code to you.</p>
          </div>
          <div className="mb-3">
            <Inputs id={"email"} placeholder={"name@company.com"} label={"Your Email"} type={"email"} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-6">
            <Buttons type={"submit"} classname={"w-full bg-violet-800 text-white h-12 rounded-lg hover:bg-violet-900"} description={!isSent ? "Send Verification" : <Spinner />} />
          </div>
        </form>
        <div>
          <p>Remember your password? <span><Link to={"/login"} className="text-violet-800 font-semibold" >Sign In</Link></span> here.</p>
        </div>
      </main>
    </div>
  );
};

export default ForgetPassword;
