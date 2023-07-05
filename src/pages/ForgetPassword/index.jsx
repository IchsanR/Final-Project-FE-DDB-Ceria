import React, { useEffect, useState } from "react";
import { Buttons, Inputs, Logo, Spinner } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const ForgetPassword = () => {
  const [form, setForm] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLogged(true);

    const handleSuccess = (response) => {
      if (response.data) {
        if (response.data.code === 200) {
          setIsLogged(false);
          Swal.fire({
            title: "Success!",
            text: `Selamat datang ${response.data.data[0].name}`,
            icon: "success",
            timer: 3000,
          });
        }
      }

      if (response.error) {
        setIsLogged(false);
        return Swal.fire({
          title: "Error!",
          text: response.error.data.message,
          timer: 2500,
          icon: "error",
          showConfirmButton: false,
        });
      }
    };
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
            <Inputs id={"email"} placeholder={"name@company.com"} label={"Your Email"} type={"email"} onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="my-6">
            <Buttons type={"submit"} classname={"w-full bg-violet-800 text-white h-12 rounded-lg hover:bg-violet-900"} description={!isLogged ? "Send Verification" : <Spinner />} />
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
