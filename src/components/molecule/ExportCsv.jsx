import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import Datepicker from "react-tailwindcss-datepicker";
import { CSVLink } from "react-csv";
import axios from "axios";
import Swal from "sweetalert2";
import { backendUrl } from '../../config/env.config';

const ExportCsv = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataCsv, setDataCsv] = useState([]);
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [status, setStatus] = useState("");
  const [latestDate, setLatestDate] = useState('');

  // date picker
  const handleValueChange = (newValue) => {
    // console.log("newValue:", newValue);
    setDate(newValue);
  };

  // get token
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // export data
  const getData = () => {
    const setting = {
      status,
      startDate: date.startDate,
      endDate: date.endDate,
    };
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${backendUrl}/api/export-transaction/${
            setting.status && setting.startDate && setting.endDate
              ? `?status=${setting.status}&start_date=${setting.startDate}&end_date=${setting.endDate}`
              : setting.status
              ? `?status=${setting.status}`
              : ""
          }`, {
            headers: {
              Authorization: `${token}`,
            }
          }
        )
        .then((res) => {
          resolve(res);
          console.log(`start: ${setting.startDate}, end: ${setting.endDate}, status: ${setting.status}`);
          setDataCsv(res.data);
        })
        .catch((err) => {
          if(err) {
            Swal.fire({
              title: "Oops..",
              text: `data tidak tersedia`,
              icon: "error",
              timer: 3000,
            });
          }
          // reject(err);
        });
    });
  };

  useEffect(() => {
    getData();
  }, [date, status]);

  // get current date export
  const handleDownload = () => {
    const currentDate = new Date().toLocaleDateString('id-ID');
    setLatestDate(currentDate);
  };

  // handle export
  const handleExport = () => {
      setOpenModal(false);
      setDate({ ...date, startDate: "", endDate: "" }); 
      handleDownload();
  }

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
                <option value='WAITING_FOR_DEBITTED'>Export status waitting</option>
              </select>
              <div>
                <label className='block text-sm font-medium text-gray-900 dark:text-white pb-2'>Choose Date</label>
                <Datepicker value={date} onChange={handleValueChange} displayFormat={"DD-MM-YYYY"}  />
              </div>
            </div>
          </div>
          <Modal.Footer>
            <Button
              onClick={handleExport}>
              <CSVLink data={dataCsv} filename={`data_transaction_${latestDate}.csv`}>
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