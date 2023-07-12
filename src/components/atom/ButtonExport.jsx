import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Button } from "flowbite-react";
import Spinner from "./Spinner";

const Exports = (props) => {
  const {data, filename, loading, onClick} = props
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (loading) {
      setShowSpinner(true);
      const timer = setTimeout(() => {
        setShowSpinner(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <>
      {loading === true ? (
        <Button disabled className='border rounded-lg'>
          {showSpinner ? <Spinner />  : "export"}
        </Button>
      ) : (
        <CSVLink data={data} filename={filename}>
          <Button onClick={onClick} className='border rounded-lg'>
          {showSpinner ? "export" : <Spinner /> ? "export" : "exports"}
          </Button>
        </CSVLink>
      )}
    </>
  )
}

export default Exports