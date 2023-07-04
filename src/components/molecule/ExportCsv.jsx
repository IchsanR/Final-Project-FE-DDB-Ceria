// yang lama
// -------------------------------------- 
// import React, { useEffect, useState } from "react";
// import { Button, Modal } from "flowbite-react";
// import Datepicker from "react-tailwindcss-datepicker";
// import { CSVLink } from "react-csv";
// import Swal from "sweetalert2";
// import { apiExportCsv } from "../../redux/api/exportCsvApi";

// const ExportCsv = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [dataCsv, setDataCsv] = useState([]);
//   const [date, setDate] = useState({
//     startDate: "",
//     endDate: "",
//   });
//   const [status, setStatus] = useState("");
//   const [latestDate, setLatestDate] = useState('');
//   const [loading, setLoading] = useState(false);

//   // date picker
//   const handleValueChange = (newValue) => {
//     setDate(newValue);
//   };

//   // get token
//   const token = localStorage.getItem("token") || sessionStorage.getItem("token");

//   // export data
//   const getData = async (done) => {
//     if (!loading) {
//       setLoading(true);
//       try {
//         const response = await apiExportCsv(token, status, date.startDate, date.endDate);
//         setDataCsv(response.data);
//         setLoading(false);
//         return done(true);
//       } catch (err) {
//         if (err) {
//           Swal.fire({
//             title: "Oops..",
//             text: `data tidak tersedia`,
//             icon: "error",
//             timer: 3000,
//           });
//         }
//         setLoading(false);
//         return false;
//       }
//     }
//   };

//   const dataFromListOfUsersState = () => {
//     return dataCsv;
//   };

//   // useEffect(() => {
//   //   dataFromListOfUsersState();
//   // }, [dataCsv]);

//   // get current date export
//   const handleDownload = () => {
//     const currentDate = new Date().toLocaleDateString('id-ID');
//     setLatestDate(currentDate);
//   };

//   // handle export
//   const handleExport = (e) => {
//     e.preventDefault();
//     setOpenModal(false);
//     getData();
//     setDate({ ...date, startDate: "", endDate: "" });
//     handleDownload();
//   };

//   // handle close
//   const handleClose = () => {
//     setOpenModal(false);
//     setDate({ ...date, startDate: "", endDate: "" });
//   };

//   return (
//     <>
//       <Button onClick={() => setOpenModal(true)}>Export to csv</Button>
//       {openModal && (
//         <Modal show={true} onClose={() => setOpenModal(false)}>
//           <Modal.Header>Export transaction</Modal.Header>
//           <div className='px-5 py-5'>
//             <div className='flex flex-col'>
//               <label htmlFor='status' className='block text-sm font-medium text-gray-900 dark:text-white pb-2'>
//                 Choose Export
//               </label>
//               <select
//                 id='status'
//                 className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5'
//                 onChange={(e) => setStatus(e.target.value)}
//               >
//                 <option value=''>All Export</option>
//                 <option value='SUCCESS'>Export status success</option>
//                 <option value='WAITING_FOR_DEBITTED'>Export status waiting</option>
//               </select>
//               <div>
//                 <label className='block text-sm font-medium text-gray-900 dark:text-white pb-2'>Choose Date</label>
//                 <Datepicker value={date} onChange={handleValueChange} displayFormat={"DD-MM-YYYY"} />
//               </div>
//             </div>
//           </div>
//           <Modal.Footer>
//             <CSVLink
//               data={dataFromListOfUsersState()}
//               asyncOnClick={true}
//               filename={`data_transaction_${latestDate}.csv`}
//               onClick={handleExport}
//             >
//               {loading ? "Loading csv..." : "Download me"}
//             </CSVLink>
//             <Button color='gray' onClick={handleClose}>
//               Cancel
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default ExportCsv;


// yang baru
// --------------------------------------
import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import Datepicker from "react-tailwindcss-datepicker";
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";
import { apiExportCsv } from "../../redux/api/exportCsvApi";

const ExportCsv = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataCsv, setDataCsv] = useState([]);
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [status, setStatus] = useState("");
  const [latestDate, setLatestDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // date picker
  const handleValueChange = (newValue) => {
    setDate(newValue);
  };

  // get token
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // export data
  const getData = async () => {
    if (!loading) {
      setLoading(true);
      try {
        const response = await apiExportCsv(token, status, date.startDate, date.endDate);
        setDataCsv(response.data);
        setLoading(false);
      } catch (err) {
        Swal.fire({
          title: "Oops..",
          text: "Data tidak tersedia",
          icon: "error",
          timer: 3000,
        });
        setLoading(false);
        setError(err);
      }
    }
  };

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
  };

  // handle close
  const handleClose = () => {
    setOpenModal(false);
    setDate({ ...date, startDate: "", endDate: "" });
  };

  useEffect(() => {
    getData();
  }, [date, status]);

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
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value=''>All Export</option>
                <option value='SUCCESS'>Export status success</option>
                <option value='WAITING_FOR_DEBITTED'>Export status waiting</option>
              </select>
              <div>
                <label className='block text-sm font-medium text-gray-900 dark:text-white pb-2'>Choose Date</label>
                <Datepicker value={date} onChange={handleValueChange} displayFormat={"DD-MM-YYYY"} />
              </div>
            </div>
          </div>
          <Modal.Footer>
            <CSVLink
              data={dataCsv}
              filename={`data_transaction_${latestDate}.csv`}
              onClick={handleExport}
            >
              {loading ? "Loading csv..." : "Download me"}
            </CSVLink>
            <Button color='gray' onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ExportCsv;