import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Logo, Buttons, Spinner, VerificationLayout } from "../../components";
import {
  compareVerificationCode,
  registerUser,
  sendEmailVerification,
} from "../../redux/api/user";

const VerificationPage = () => {
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(15);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem("verificationEmail");
  const dispatch = useDispatch();
  const inputRefs = useRef([]);
  const [focusedInput, setFocusedInput] = useState(0);

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
        title: "Mohon ditunggu",
        text: "Sedang mengirim ulang email verifikasi...",
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
        title: "Tautan Verifikasi Terkirim",
        text: "Tautan verifikasi telah dikirim ulang ke email Anda.",
        icon: "success",
        timer: 5000,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);

      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat mengirim ulang tautan verifikasi",
        timer: 2500,
        icon: "error",
        showConfirmButton: false,
      });
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = verificationCode.join("");

    // menambahkan log untuk mengecek kode OTP yang diinput
    console.log('OTP Input: ', code);

    try {
      setLoading(true);

      const response = await dispatch(compareVerificationCode({ email, code }));

      // menambahkan log untuk mengecek respons yang didapat dari server
      console.log('Server Response: ', response);

      if (response.payload.message === "Success Verification Code") {
        // kode OTP valid
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");
        const phone = localStorage.getItem("phone");
        const password = localStorage.getItem("password");
        const role = localStorage.getItem("role");

        await dispatch(
          registerUser({ form: { name, email, phone, password, role } })
        );

        // setelah sukses register, hapus semua data dari localStorage
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("phone");
        localStorage.removeItem("password");
        localStorage.removeItem("verificationEmail");

        Swal.fire({
          title: "Verifikasi Berhasil",
          text: "Akun Anda telah berhasil diverifikasi!",
          icon: "success",
          timer: 5000,
        });

        navigate("/login");
      } else {
        // kode OTP tidak valid
        Swal.fire({
          title: "Error!",
          text: "Kode verifikasi tidak cocok",
          timer: 2500,
          icon: "error",
          showConfirmButton: false,
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);

      // menambahkan log untuk mengecek error yang terjadi
      console.error('Error: ', error);

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
    <>
      <VerificationLayout handleSubmit={handleSubmit} email={email} verificationCode={verificationCode} handleInputChange={handleInputChange} handleKeyDown={handleKeyDown} handlePaste={handlePaste} inputRefs={inputRefs} focusedInput={focusedInput} handleResend={handleResend} resendTimer={resendTimer} loading={loading} />
    </>
  );
};

export default VerificationPage;
