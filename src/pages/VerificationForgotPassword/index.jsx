import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { VerificationLayout } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { compareVerificationCode, sendEmailForgotPassword } from '../../redux/api/user';
import Swal from 'sweetalert2';
import { revertAll } from '../../redux/api/resetState';

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
        text: "Terjadi kesalahan saat verifikasi",
        timer: 2500,
        icon: "error",
        showConfirmButton: false,
      });

      throw error;
    }
  };
  return (
    <Fragment>
      <VerificationLayout handleSubmit={handleSubmit} email={email} verificationCode={verificationCode} handleInputChange={handleInputChange} handleKeyDown={handleKeyDown} handlePaste={handlePaste} inputRefs={inputRefs} focusedInput={focusedInput} handleResend={handleResend} resendTimer={resendTimer} loading={loading} />
    </Fragment>
  );
};

export default ForgetVerification;