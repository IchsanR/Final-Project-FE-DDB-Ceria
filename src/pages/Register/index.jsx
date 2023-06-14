import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    phone: "",
    password: "",
  });

  const [registeredUsers, setRegisteredUsers] = useState([]);
 
  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const url =
          "https://2d876db7-7486-40dc-8f9a-c5798fd930e6.mock.pstmn.io/create-user";
        const response = await axios.get(url);
        setRegisteredUsers(response.data);
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };

      
    fetchRegisteredUsers();
  }, []);

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nama, email, phone, password } = form;
    const isNameUsed = registeredUsers.some((user) => user.name === nama);
    const isPhoneUsed = registeredUsers.some((user) => user.phone === phone);
    if (isNameUsed || isPhoneUsed) {
      Swal.fire({
        title: "Gagal",
        text: "Nama atau nomor telepon telah digunakan.",
        icon: "error",
      });
      return;
    }

    try {
      const url =
        "https://2d876db7-7486-40dc-8f9a-c5798fd930e6.mock.pstmn.io/create-user";

      const body = {
        name: nama,
        email: email,
        phone: phone,
        password: password,
      };

      const response = await axios.post(url, body);

      console.log("Response:", response.data);
      Swal.fire({
        title: "Berhasil",
        text: "Registrasi berhasil!",
        icon: "success",
      });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      Swal.fire({
        title: "Gagal",
        text: "Terjadi kesalahan dalam registrasi.",
        icon: "error",
      });
    }
  };

  return (


    <section className="min-h-screen bg-gray-100  dark:bg-gray-900">
          <meta name="viewport" content="width=device-width, initial-scale=0.8"></meta>
      <div className="flex flex-col items-start md:items-center pt-10 md:pt-15 md:min-h-screen py-10 px-4 mx-auto overflow-y-auto">
  
        <div className="flex items-center mb-6">
          <div className="flex justify-between space-x-2">
            <img
              style={{ width: "130px", height: "70px" }}
              src="https://bri.co.id/o/bri-ceria-theme/images/bri-logo.png"
              alt="bri-logo"
            />
            <img
              style={{ width: "130px", height: "70px" }}
              src="https://bri.co.id/o/bri-ceria-theme/images/logo-ceria.png"
              alt="logo-ceria"
            />
          </div>
        </div>
        <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Monitoring System
            </h1>
            <form className="space-y-4 md:space-y-2" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="nama"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama
                </label>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Masukkan Nama"
                  value={form.nama}
                  onChange={onChangeForm}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@mail.com"
                  value={form.email}
                  onChange={onChangeForm}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={form.password}
                  onChange={onChangeForm}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nomor Handphone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="08xxxxxxxxxx"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={form.phone}
                  onChange={onChangeForm}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="underline_select"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Role
                </label>
                <select
                  id="underline_select"
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  required
                >
                  <option>Select Role</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium 0text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-purple-600 hover:bg-p focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Buat Akun
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;