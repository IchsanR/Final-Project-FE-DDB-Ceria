import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Logo, Buttons, Spinner } from "../../components";
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
  
      if (response.payload.message === "Success Verification Code")  {
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
    <div className="flex flex-col min-h-screen items-center justify-center px-3 py-3">
      <header className="mb-2">
        <Logo />
      </header>
      <main className="md:w-[500px] w-full max-w-md">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="my-6">
            <h1 className="font-bold text-2xl">Verifikasi Akun</h1>
          </div>
          <div className="mb-6">
            <p className="text-gray-700">
              Kode verifikasi telah dikirim ke <strong>{email}</strong>.
              Silakan masukkan kode verifikasi untuk melanjutkan.
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
              Tidak menerima kode?{" "}
              <button
                type="button"
                className="text-blue-500 hover:text-blue-700"
                onClick={handleResend}
                disabled={resendTimer > 0}
              >
                Kirim ulang kode
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
                  "Verifikasi"
                )
              }
              disabled={loading}
            />
          </div>
        </form>
      </main>
    </div>
  );
};

export default VerificationPage;  