import React, { Fragment } from 'react';
import Logo from '../atom/Logo';
import Buttons from '../atom/Buttons';
import Spinner from '../atom/Spinner';

const VerificationLayout = ({ handleSubmit, email, verificationCode, handleInputChange, handleKeyDown, handlePaste, inputRefs, focusedInput, handleResend, resendTimer, loading }) => {
  return (
    <Fragment>
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
                classname={`w-full bg-violet-800 text-white h-12 rounded-lg hover:bg-violet-900 ${loading ? "opacity-50 cursor-not-allowed" : ""
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
    </Fragment>
  );
};

export default VerificationLayout;