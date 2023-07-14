import React, { Fragment, useEffect, useState } from "react";
import { Buttons, Inputs, Logo, Spinner } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailForgotPassword } from "../../redux/api/user";
import { Helmet } from "react-helmet";


const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSent, setIsSent] = useState(false);

  const response = useSelector((state) => {
    return state.sendEmailForget;
  });

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

  useEffect(() => {
    if (response.isFulfilled && response.data.code === 200) {
      setIsSent(false);
      Swal.fire({
        title: "Verification code sent!",
        text: `Please check your email`,
        icon: "success",
        timer: 3000,
      });
      localStorage.setItem('email', email);
      return navigate('/verification');
    }

    if (response.isError && response.data.code === "ERR_NETWORK") {
      setIsSent(false);
      Swal.fire({
        title: "Error!",
        text: "Internal Server Error",
        icon: "error",
        timer: 3000,
      });
      return;
    }

    if (response.isFulfilled && response.data.code === 400) {
      setIsSent(false);
      Swal.fire({
        title: "Error!",
        text: `${response.data.message}`,
        icon: "error",
        timer: 3000,
      });
      return;
    }


  }, [response]);

  const onSubmit = (e) => {
    try {
      e.preventDefault();
      setIsSent(true);

      if (email === "") {
        Swal.fire({
          title: "Error!",
          text: "Form cannot blank",
          icon: "error",
          timer: 3000,
        });
        setIsSent(false);
        return;
      }

      dispatch(sendEmailForgotPassword({ email }));
    } catch (error) {
      throw error;
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>Forget Password | DDB Ceria</title>
      </Helmet>
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
    </Fragment>
  );
};

export default ForgetPassword;
