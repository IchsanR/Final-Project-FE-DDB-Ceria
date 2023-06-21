import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import Datepicker from "react-tailwindcss-datepicker";
import { CSVLink } from "react-csv";
import { useGetModalQuery } from "../../redux/api/exportCsvApi";


const ExportCsv = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataCsv, setDataCsv] = useState([]);
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [status, setStatus] = useState("");
  const startDate = date.startDate.split('-').reverse().join('-')
  const endDate = date.endDate.split('-').reverse().join('-')


  const handleValueChange = (newValue) => {
    // console.log("newValue:", newValue);
    setDate(newValue);
  };

  const query = useGetModalQuery({status, startDate, endDate})
  console.log(query.isSuccess);

  useEffect(() => {
    if (query.isSuccess === true) {
      setDataCsv(query.data)
    }
  },[])

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Export to csv</Button>
      {openModal && (
        <Modal show={true} onClose={() => setOpenModal(false)}>
          <Modal.Header>Export transaction</Modal.Header>
          <div className='px-5 py-5'>
            <div className='flex flex-col'>
              <label htmlFor='status' className='block text-sm font-medium text-gray-900 dark:text-white pb-2'>
                Choose Export
              </label>
              <select
                id='status'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5'
                onChange={(e) => setStatus(e.target.value)}>
                <option value=''>All Export</option>
                <option value='SUCCESS'>Export status success</option>
              </select>
              <div>
                <label className='block text-sm font-medium text-gray-900 dark:text-white pb-2'>Choose Date</label>
                <Datepicker value={date} onChange={handleValueChange} />
              </div>
            </div>
          </div>
          <Modal.Footer>
            <Button onClick={() => {return setOpenModal(false), setDate({...date, startDate: "", endDate: ""})}}>
              <CSVLink data={dataCsv} filename={"data-transaction.csv"}>
                Export
              </CSVLink>
            </Button>
            <Button color='gray' onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ExportCsv;