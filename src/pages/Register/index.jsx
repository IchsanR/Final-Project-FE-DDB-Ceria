import React, { useState } from "react";
import {
  Buttons,
  Inputs,
  Logo,
  Spinner,
  Passwordshowhide,
  Modal,
} from "../../components";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import zxcvbn from "zxcvbn";
import { useDispatch } from "react-redux";
import { sendEmailVerification } from "../../redux/api/user";

const Register = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });
  const [checked, setChecked] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const passwordResult = zxcvbn(password);
    setPasswordStrength({
      score: passwordResult.score,
      feedback:
        passwordResult.feedback.warning ||
        passwordResult.feedback.suggestions.join(" "),
    });

    setForm({ ...form, password: password });

    setPasswordMismatch(false);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setForm({ ...form, confirmPassword: confirmPassword });

    setPasswordMismatch(form.password !== confirmPassword);
  };

  const handlePasswordClear = () => {
    setPasswordStrength({ score: 0, feedback: "" });
    setForm({ ...form, password: "" });

    setPasswordMismatch(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!navigator.onLine) {
      Swal.fire({
        title: "Error!",
        text: "You are currently offline. Please check your internet connection.",
        timer: 2500,
        icon: "error",
        showConfirmButton: false,
      });
      return;
    }

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.confirmPassword
    ) {
      Swal.fire({
        title: "Error!",
        text: "Please complete the provided form",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "OK!",
      });
      return;
    }

    if (checked === false) {
      Swal.fire({
        title: "Error!",
        text: "Please accept the user terms and conditions",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "OK!",
      });
      return;
    }

    if (passwordStrength.score < 3) {
      Swal.fire({
        title: "Error!",
        text: "Your password is weak and easy to guess, please strengthen your password",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "OK!",
      });
      return;
    }

    if (form.password !== form.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    try {
      setLoading(true);
      const email = form.email;

      const handleSuccess = (response) => {
        if (response.code === 200) {
          Swal.fire({
            title: "Registration Successful",
            text: `Please check your email ${form.name} for verification.`,
            icon: "success",
            timer: 10000,
          });

          localStorage.setItem("verificationEmail", email);
          localStorage.setItem("name", form.name);
          localStorage.setItem("email", form.email);
          localStorage.setItem("phone", form.phone);
          localStorage.setItem("password", form.password);
          localStorage.setItem("role", form.role);

          navigate("/verificationpage");
        } else if (response.code === 400) {
          Swal.fire({
            title: "Error!",
            text: "Email has been used",
            icon: "error",
            showConfirmButton: true,
            confirmButtonText: "OK!",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to send verification email",
            timer: 2500,
            icon: "error",
            showConfirmButton: false,
          });
        }
      };

      await dispatch(sendEmailVerification({ email, handleSuccess }));
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to connect to the server",
        timer: 2500,
        icon: "error",
        showConfirmButton: false,
      });

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    setOpenModal(true);
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
              id="name"
              placeholder="Your Name"
              label="Name"
              type="text"
              name="name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <Inputs
              id="email"
              placeholder="name@company.com"
              label="Email"
              type="email"
              name="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <Inputs
              id="Phone Number"
              placeholder="0812xxxxxx"
              label="Phone Number"
              type="number"
              name="phone"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
          <div className="relative">
            <Inputs
              id="password"
              placeholder=""
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handlePasswordChange}
              onClear={handlePasswordClear}
              required
            />
            {form.password && (
              <Passwordshowhide
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
              />
            )}
          </div>
          <div className="relative">
            <Inputs
              id="confirmPassword"
              placeholder=""
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {passwordMismatch && (
              <div className="text-red-500 text-xs mt-1">
                Password didn't match
              </div>
            )}
          </div>
          {form.password && (
            <div className="my-2">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold inline-block">
                      Password Strength:
                    </span>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-sm font-semibold inline-block ${
                        passwordStrength.score >= 3
                          ? "text-green-500"
                          : passwordStrength.score === 2
                          ? "text-orange-500"
                          : "text-red-500"
                      }`}
                    >
                      {passwordStrength.score >= 3
                        ? "Strong"
                        : passwordStrength.score === 2
                        ? "Medium"
                        : "Weak"}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      passwordStrength.score >= 3
                        ? "bg-green-500"
                        : passwordStrength.score === 2
                        ? "bg-orange-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                </div>
                <div className="text-sm text-gray-500">
                  {passwordStrength.feedback}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between my-3">
            <div>
              <input
                type="checkbox"
                id="rememberMe"
                className="w-4 h-4 mr-3 top-1/2 relative -translate-y-1/2"
                checked={checked}
                onChange={handleChecked}
                required
              />
              <label htmlFor="rememberMe" className="text-[#6B7280]">
                I accept{" "}
                <button
                  className="text-violet-800 font-semibold"
                  onClick={handleTermsClick}
                >
                  Terms and Conditions
                </button>
              </label>
            </div>
          </div>

          <div className="my-6">
            <Buttons
              type="submit"
              classname={`w-full bg-violet-800 text-white h-12 rounded-lg hover:bg-violet-900 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              description={
                loading ? (
                  <div className="flex items-center justify-center">
                    <Spinner />
                    <span className="ml-2">Please Wait...</span>
                  </div>
                ) : (
                  "Sign Up"
                )
              }
              disabled={loading || passwordMismatch}
            />
          </div>
        </form>

        <div>
          <p className="text-[#6B7280]">
            Already have an account?{" "}
            <span>
              <Link to="/login" className="text-violet-800 font-semibold">
                Login Here
              </Link>
            </span>
          </p>
        </div>
      </main>

      {openModal && <Modal setOpenModal={setOpenModal} />}
    </div>
  );
};

export default Register;
