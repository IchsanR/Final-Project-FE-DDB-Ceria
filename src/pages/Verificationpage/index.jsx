import React, { useState, useRef, useEffect, useCallback, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Logo, Buttons, Spinner } from "../../components";
import {
  compareVerificationCode,
  registerUser,
  sendEmailVerification,
} from "../../redux/api/user";
import { Helmet } from "react-helmet";

const VerificationPage = () => {
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(15);
  const [loading, setLoading] = useState(false);
  const [correctEmail, setCorrectEmail] = useState("");
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);
  const [isVerifS, setIsVerifS] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const dispatch = useDispatch();
  const inputRefs = useRef([]);
  const [focusedInput, setFocusedInput] = useState(0);

  useEffect(() => {
    const hasMissingData = !email;
    if (isVerifS === false && hasMissingData) {
      Swal.fire({
        title: "Error!",
        text: "Required data is missing. Please go back and provide the necessary information.",
        timer: 2500,
        icon: "error",
        showConfirmButton: false,
      });
      navigate("/login");
    }
  }, [email, navigate]);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleInputChange = useCallback(
    (index, value) => {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);

      if (value.length === 1 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
      setFocusedInput(index + 1);
    },
    [verificationCode]
  );

  const handleKeyDown = useCallback(
    (index, event) => {
      if (
        event.key === "Backspace" &&
        index > 0 &&
        verificationCode[index] === ""
      ) {
        inputRefs.current[index - 1].focus();
      } else if (
        event.key === "Delete" &&
        index < verificationCode.length - 1 &&
        verificationCode[index] === ""
      ) {
        inputRefs.current[index + 1].focus();
      } else if (event.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1].focus();
      } else if (
        event.key === "ArrowRight" &&
        index < verificationCode.length - 1
      ) {
        inputRefs.current[index + 1].focus();
      }
    },
    [verificationCode]
  );

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text");
    const pastedCharacters = pastedData.split("").slice(0, 4);

    const newVerificationCode = [...verificationCode];
    for (let i = 0; i < 4; i++) {
      if (pastedCharacters[i]) {
        newVerificationCode[i] = pastedCharacters[i];
      }
    }

    setVerificationCode(newVerificationCode);
  };

  const handleResend = async () => {
    try {
      Swal.fire({
        title: "Please Wait...",
        text: "Resending verification email...",
        icon: "info",
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.hideLoading();
        },
      });

      setLoading(true);

      await dispatch(sendEmailVerification({ email }));

      setResendTimer(15);

      Swal.fire({
        title: "Verification Link Sent",
        text: "The verification link has been resent to your email.",
        icon: "success",
        timer: 5000,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);

      Swal.fire({
        title: "Error!",
        text: "There was an error while resending the verification link.",
        timer: 2500,
        icon: "error",
        showConfirmButton: false,
      });
      throw error;
    }
  };

  const handleUpdateEmail = () => {
    setIsUpdatingEmail(true);
    setCorrectEmail("");
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleCancelUpdateEmail = () => {
    setIsUpdatingEmail(false);
    setNewEmail("");
  };

  const handleUpdateEmailSubmit = async () => {
    if (newEmail !== "") {
      try {
        setLoading(true);

        const response = await dispatch(sendEmailVerification({ email: newEmail }));
        console.log(response.payload.data.code);
        if (response.payload.data.code === 400) {
          Swal.fire({
            title: "Error!",
            text: "The email has already been used. Please use a different email.",
            timer: 2500,
            icon: "error",
            showConfirmButton: false,
          });
          setLoading(false);
          return;
        }

        localStorage.setItem("email", newEmail);
        setIsEmailUpdated(true);
        setResendTimer(15);
        setIsUpdatingEmail(false);

        Swal.fire({
          title: "Please Wait...",
          text: "Sending a new verification email...",
          icon: "info",
          showConfirmButton: false,
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            Swal.hideLoading();
          },
        });

        await dispatch(sendEmailVerification({ email: newEmail }));

        Swal.fire({
          title: "Verification Link Sent",
          text: "The verification link has been sent to your new email.",
          icon: "success",
          timer: 5000,
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);

        Swal.fire({
          title: "Error!",
          text: "There was an error while sending the new verification email.",
          timer: 2500,
          icon: "error",
          showConfirmButton: false,
        });
        throw error;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = verificationCode.join("");

    try {
      setLoading(true);

      const response = await dispatch(compareVerificationCode({ email, code }));

      if (response.payload.data.message === "Success Verification Code") {
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");
        const phone = localStorage.getItem("phone");
        const password = localStorage.getItem("password");
        const role = localStorage.getItem("role");

        await dispatch(
          registerUser({ form: { name, email, phone, password, role } })
        );

        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("phone");
        localStorage.removeItem("password");
        setIsVerifS(true);

        Swal.fire({
          title: "Verification Successful",
          text: "Your account has been successfully verified!",
          icon: "success",
          timer: 5000,
        });

        navigate("/login");
      } else {
        if (correctEmail !== "") {
          await dispatch(sendEmailVerification({ email: correctEmail }));
          localStorage.setItem("email", correctEmail);
          setResendTimer(15);
        }

        Swal.fire({
          title: "Error!",
          text: "The verification code does not match.",
          timer: 2500,
          icon: "error",
          showConfirmButton: false,
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);

      Swal.fire({
        title: "Error!",
        text: "There was an error during the verification process.",
        timer: 2500,
        icon: "error",
        showConfirmButton: false,
      });

      throw error;
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>OTP Verification | DDB Ceria</title>
      </Helmet>
      <div className="flex flex-col min-h-screen items-center justify-center px-3 py-3">
        <header className="mb-2">
          <Logo />
        </header>
        <main className="md:w-[500px] w-full max-w-md">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="my-6">
              <h1 className="font-bold text-2xl">Account Verification</h1>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">
                {isEmailUpdated ? (
                  <>
                    A verification code has been sent to <strong>{email}</strong>. Please enter the verification code to proceed.
                  </>
                ) : (
                  <>
                    The verification code has been sent to <strong>{email}</strong>. Please enter the verification code to proceed. Wrong email?{" "}
                    <button
                      type="button"
                      className="text-blue-500 hover:text-blue-700"
                      onClick={handleUpdateEmail}
                    >
                      Update email
                    </button>
                  </>
                )}
              </p>
            </div>
            {isUpdatingEmail ? (
              <div className="flex items-center justify-center mb-6">
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded focus:outline-none"
                  placeholder="New Email"
                  value={newEmail}
                  onChange={handleEmailChange}
                />
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 ml-4"
                  onClick={handleCancelUpdateEmail}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="text-blue-500 hover:text-blue-700 ml-4"
                  onClick={handleUpdateEmailSubmit}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center mb-6">
                {verificationCode.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    className="w-12 h-12 text-4xl text-center border rounded mx-1 focus:outline-none focus:ring focus:border-blue-300"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    tabIndex={focusedInput === index ? 0 : -1}
                  />
                ))}
              </div>
            )}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-700">
                Not receiving the code?{" "}
                {!isUpdatingEmail && (
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={handleResend}
                    disabled={resendTimer > 0}
                  >
                    Resend the code
                  </button>
                )}
                {isUpdatingEmail ? (
                  <span className="text-gray-500 ml-2">Please update your email first.</span>
                ) : (
                  resendTimer > 0 && (
                    <span className="text-gray-500 ml-2">
                      ({Math.floor(resendTimer / 60)}:{resendTimer % 60})
                    </span>
                  )
                )}
              </p>
            </div>
            <div className="my-6">
              <Buttons
                type="submit"
                classname={`w-full bg-violet-800 text-white h-12 rounded-lg hover:bg-violet-900 ${loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                description={
                  loading ? (
                    <div className="flex items-center justify-center">
                      <Spinner />
                      <span className="ml-2">Please Wait...</span>
                    </div>
                  ) : (
                    "Verify"
                  )
                }
                disabled={loading || isUpdatingEmail}
              />
            </div>
          </form>
        </main>
      </div>
    </Fragment>
  );
};

export default VerificationPage;
