import React, { useState } from "react";
import { Buttons, Inputs, Logo } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import {
  useSendEmailVerificationMutation,
  useRegisterUserMutation,
} from "../../redux/api/User";
import Swal from "sweetalert2";
import zxcvbn from "zxcvbn";
import Modal from "../../components/modals/Modal";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "admin",
  });
  const [checked, setChecked] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [sendEmailVerification] = useSendEmailVerificationMutation();
  const [registerUser] = useRegisterUserMutation();
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
  };

  const handlePasswordClear = () => {
    setPasswordStrength({ score: 0, feedback: "" });
    setForm({ ...form, password: "" });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.password) {
      Swal.fire({
        title: "Error!",
        text: "Mohon lengkapi form yang disediakan",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "OK!",
      });
      return;
    }

    if (checked === false) {
      Swal.fire({
        title: "Error!",
        text: "Mohon terima persyaratan pengguna",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "OK!",
      });
      return;
    }

    if (passwordStrength.score < 3) {
      Swal.fire({
        title: "Error!",
        text: "Kata sandi Anda lemah dan mudah ditebak, mohon perkuat kata sandi Anda",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "OK!",
      });
      return;
    }

    try {
      setLoading(true);

      const email = form.email;
      const verificationResponse = await sendEmailVerification(email).unwrap();

      if (verificationResponse && verificationResponse.code === 200) {
        Swal.fire({
          title: "Pendaftaran Berhasil",
          text: `Silakan periksa email Anda ${form.name} untuk verifikasi.`,
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
      } else if (verificationResponse && verificationResponse.code === 400) {
        Swal.fire({
          title: "Error!",
          text: "Email telah digunakan",
          icon: "error",
          showConfirmButton: true,
          confirmButtonText: "OK!",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Gagal mengirim email verifikasi",
          timer: 2500,
          icon: "error",
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat mendaftar",
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
              placeholder="**********"
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handlePasswordChange}
              onClear={handlePasswordClear}
              required
            />
            {form.password && (
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute top-3/4 right-2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
              >
                {!showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                )}
              </button>
            )}
          </div>

          {form.password && (
            <div className="my-2">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold inline-block">
                      Kekuatan Kata Sandi:
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
                        ? "Kuat"
                        : passwordStrength.score === 2
                        ? "Sedang"
                        : "Lemah"}
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
              description={loading ? "Please Wait..." : "Sign Up"}
              disabled={loading}
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
