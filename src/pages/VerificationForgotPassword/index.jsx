import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Buttons, Logo, Spinner } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { compareVerificationCode, sendEmailForgotPassword } from '../../redux/api/user';
import Swal from 'sweetalert2';
import { revertAll } from '../../redux/api/resetState';
import { Helmet } from 'react-helmet';

const ForgetVerification = () => {
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(15);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const dispatch = useDispatch();
  const inputRefs = useRef([]);
  const [focusedInput, setFocusedInput] = useState(0);

  useEffect(() => {
    if (!email) {
      Swal.fire({
        title: "Error!",
        text: `Can't access this page!`,
        icon: "error",
        timer: 3000,
      });
      return navigate('/login');
    }
  }, []);

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

  const resendResponse = useSelector((state) => {
    return state.sendEmailForget;
  });

  useEffect(() => {
    if (resendResponse.isFulfilled && resendResponse.data.code === 200) {
      setLoading(false);
      Swal.fire({
        title: "Verification code sent",
        text: "Please check your email",
        icon: "success",
        timer: 5000,
      });
      return;
    }

    if (resendResponse.isFulfilled && resendResponse.data.code !== 200) {
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: `There's a mistake when resend the verification code!`,
        icon: "error",
        timer: 3000,
      });
      return;
    }

    if (resendResponse.isError && resendResponse.data.code === "ERR_NETWORK") {
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: "Internal Server Error",
        icon: "error",
        timer: 3000,
      });
      return;
    }

  }, [resendResponse]);

  const handleResend = () => {
    try {
      Swal.fire({
        title: "Please Wait!",
        text: "Sending verification code...",
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

      dispatch(sendEmailForgotPassword({ email }));

      setResendTimer(15);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const codeVerifResponse = useSelector((state) => {
    return state.compareVerification;
  });

  const code = verificationCode.join("");

  useEffect(() => {
    if (codeVerifResponse.isFulfilled && codeVerifResponse.data.code === 200) {
      localStorage.removeItem("email");

      Swal.fire({
        title: "Success",
        text: "Account verified",
        icon: "success",
        timer: 5000,
      });

      localStorage.setItem('code', code);
      localStorage.setItem('id', codeVerifResponse.data.data[0].id);
      setLoading(false);
      dispatch(revertAll());
      return navigate("/setpassword");
    }

    if (codeVerifResponse.isFulfilled && codeVerifResponse.data.code === 400) {
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: `Verification code doesn't match`,
        icon: "error",
        timer: 3000,
      });
      return;
    }

    if (codeVerifResponse.isError && codeVerifResponse.data.code === "ERR_NETWORK") {
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: "Internal Server Error",
        icon: "error",
        timer: 3000,
      });
      return;
    }

  }, [codeVerifResponse]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!code) {
        Swal.fire({
          title: "Error!",
          text: "Please input verification code",
          icon: "error",
          timer: 3000,
        });
        setLoading(false);
        return;
      }
      dispatch(compareVerificationCode({ email, code }));

    } catch (error) {
      setLoading(false);

      Swal.fire({
        title: "Error!",
        text: "There's an error when verifying",
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
              <h1 className="font-bold text-2xl">Verified Account</h1>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">
                The verification code has been sent to <strong>{email}</strong>. Please enter the verification code to proceed.
              </p>
            </div>
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
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-700">
                Not recieve code?{" "}
                <button
                  type="button"
                  className="text-blue-500 hover:text-blue-700"
                  onClick={handleResend}
                  disabled={resendTimer > 0}
                >
                  Resend code!
                </button>
                {resendTimer > 0 && (
                  <span className="text-gray-500 ml-2">
                    ({Math.floor(resendTimer / 60)}:{resendTimer % 60})
                  </span>
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
                disabled={loading}
              />
            </div>
          </form>
        </main>
      </div>
    </Fragment>
  );
};

export default ForgetVerification;