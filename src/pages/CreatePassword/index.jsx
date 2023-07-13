import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Buttons, Inputs, Logo, Passwordshowhide, Spinner } from '../../components';
import zxcvbn from 'zxcvbn';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../redux/api/user';
import { useNavigate } from 'react-router-dom';
import { revertAll } from '../../redux/api/resetState';

const CreatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDiff, setIsDiff] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = localStorage.getItem("id");
  const code = localStorage.getItem('code');

  useEffect(() => {
    if (!code) {
      Swal.fire({
        title: "Error!",
        text: `Can't access this page!`,
        icon: "error",
        timer: 3000,
      });
      return navigate('/login');
    }
  }, []);

  const handlePasswordChange = (e) => {
    const passwordResult = zxcvbn(password);

    setPasswordStrength({
      score: passwordResult.score,
      feedback:
        passwordResult.feedback.warning ||
        passwordResult.feedback.suggestions.join(" "),
    });

    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useMemo(() => {
    if (password === "" && confirmPassword !== "" || password !== "" && confirmPassword === "") {
      return setIsDiff(false);
    }

    if (password !== confirmPassword) {
      return setIsDiff(true);
    }

    if (password === confirmPassword) {
      return setIsDiff(false);
    }
  }, [password, confirmPassword]);

  const response = useSelector((state) => {
    return state.updatePassword;
  });


  const onSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const form = {
      id: parseInt(id),
      password: password
    };

    if (!password || !confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in your password",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "OK!",
      });
      setLoading(false);
      return;
    }

    if (passwordStrength.score <= 2) {
      Swal.fire({
        title: "Error!",
        text: "Please input a strong password",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "OK!",
      });
      setLoading(false);
      return;
    }

    if (isDiff) {
      Swal.fire({
        title: "Error!",
        text: "Password doesn't match",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "OK!",
      });
      setLoading(false);
      return;
    }

    dispatch(updatePassword({ id, code, form }));
  };

  useEffect(() => {
    if (response.isFulfilled && response.data.code === 200) {
      Swal.fire({
        title: "Success!",
        text: "Password updated",
        icon: "success",
        timer: 3000,
      });
      dispatch(revertAll());
      setLoading(false);
      return navigate('/login');
    }

    if (response.isError) {
      Swal.fire({
        title: "Error!",
        text: "Internal Server Error",
        icon: "error",
        timer: 3000,
      });
      setLoading(false);
    }
  }, [response]);

  return (
    <Fragment>
      <div className="flex justify-center items-center flex-col h-screen w-screen px-4">
        <header>
          <Logo />
        </header>
        <main className="md:w-[500px] w-full">
          <form className="w-full" onSubmit={onSubmit}>
            <div className="my-10">
              <h1 className="font-bold text-2xl">Create New Password</h1>
            </div>
            <div className="relative">
              <Inputs
                id="password"
                placeholder="**********"
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {password && (
                <Passwordshowhide
                  showPassword={showPassword}
                  toggleShowPassword={toggleShowPassword}
                />
              )}
            </div>

            {password && (
              <div className="my-2">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold inline-block">
                        Password strength:
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-sm font-semibold inline-block ${passwordStrength.score >= 3
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
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${passwordStrength.score >= 3
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

            <div className="relative my-5">
              <div className='relative'>
                <Inputs
                  id="confirmpassword"
                  placeholder="**********"
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                {password && (
                  <Passwordshowhide
                    showPassword={showConfirmPassword}
                    toggleShowPassword={toggleShowConfirmPassword}
                  />
                )}
              </div>
              {isDiff && (
                <p className='text-red-600'>Password doesn't match</p>
              )}
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
                    "Reset Password"
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

export default CreatePassword;