import React, { useState } from "react";
import { Buttons, Inputs, Logo } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/api/User";
import Swal from "sweetalert2";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check the form data

    if (checked === false) {
      return Swal.fire({
        title: "Error!",
        text: "Please, accept the user agreement",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "OK!",
      });
    }

    try {
      const response = await registerUser(form).unwrap();

      // check for specific error message
      if (response.code === 400) {
        return Swal.fire({
          title: "Error!",
          text: "Nama yang Anda masukkan sudah digunakan, silakan gunakan nama yang berbeda",
          icon: "error",
          showConfirmButton: true,
          confirmButtonText: "OK!",
        });
      }

      if (response.code === 200) {
        Swal.fire({
          title: "Success!",
          text: `Welcome ${response.data[0].name} Silahkan Login`,
          icon: "success",
          timer: 3000,
        });
        navigate("/login");
      } else {
        Swal.fire({
          title: "Error!",
          text: response.message,
          timer: 2500,
          icon: "error",
          showConfirmButton: false,
        });
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-3 py-3">
      <header className="mb-2">
        <Logo />
      </header>
      <main className="md:w-[500px] w-full max-w-md">
        <form className="w-full" onSubmit={onSubmit}>
          <div className="my-6">
            <h1 className="font-bold text-2xl">Create an Account</h1>
          </div>
          <div className="mb-3">
            <Inputs
              id={"name"}
              placeholder={"your name"}
              label={"Name"}
              type={"text"}
              name={"name"}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <Inputs
              id={"email"}
              placeholder={"name@company.com"}
              label={"Your Email"}
              type={"email"}
              name={"email"}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <Inputs
              id={"phone"}
              placeholder={"0812xxxxxx"}
              label={"Phone Number"}
              type={"tel"}
              name={"phone"} // Atribut name ini sangat penting
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <Inputs
              id={"password"}
              placeholder={"**********"}
              label={"Your Password"}
              type={"password"}
              name={"password"}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="flex justify-between my-3">
            <div>
              <input
                type="checkbox"
                id="rememberMe"
                className="w-4 h-4 mr-3 top-1/2 relative -translate-y-1/2"
                checked={checked}
                onChange={handleChecked}
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
