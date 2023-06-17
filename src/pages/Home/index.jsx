import React, { Fragment } from "react";
import { NavigasiBar } from "../../components";
import { Button } from "flowbite-react";
const Home = () => {
  return (
    <Fragment>
      <NavigasiBar />
      <div className=" h-screen flex items-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Selamat Datang</h1>
        <p className="text-lg mb-8">
          Ini adalah halaman selamat datang dengan tampilan modern menggunakan
          Flowbite React.
        </p>
        <Button primary className="mr-4">
          Mulai
        </Button>
        <Button secondary>Panduan</Button>
      </div>
    </Fragment>
  );
};

export default Home;
