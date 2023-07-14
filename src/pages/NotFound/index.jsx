import React, { Fragment } from "react";
import { notFound404 } from "../../assets";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Page Not Found | DDB Ceria</title>
      </Helmet>
      <div className="w-screen h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={notFound404} className="md:w-[500px] md:h-[400px]" />
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;