import React from "react";
import { CSVLink } from "react-csv";
import { Button } from "flowbite-react";

const Exports = (props) => {
  const {data, filename, loading, onClick} = props
  return (
    <>
      {loading === true ? (
        <Button disabled className='border rounded-lg'>
          Export
        </Button>
      ) : (
        <CSVLink data={data} filename={filename}>
          <Button onClick={onClick} className='border rounded-lg'>
            Export
          </Button>
        </CSVLink>
      )}
    </>
  )
}

export default Exports