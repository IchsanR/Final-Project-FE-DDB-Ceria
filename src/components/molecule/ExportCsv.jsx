import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import Datepicker from "react-tailwindcss-datepicker";


const ExportCsv = () => {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <>
      <Button onClick={() => props.setOpenModal("default")}>Toggle modal</Button>
      <Modal show={props.openModal === "default"} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>Export transaction</Modal.Header>
        <div className='px-5 py-5'>
          <div className='flex flex-col'>
            <label for='countries' className='block text-sm font-medium text-gray-900 dark:text-white pb-2'>
              Choose Export
            </label>
            <select
              id='status'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5'>
              <option selected>All Export</option>
              <option value='success'>Export status Success</option>
              <option value='panding'>Export status Panding</option>
              <option value='failled'>Export status Failled</option>
            </select>
            <div>
              <label for='countries' className='block text-sm font-medium text-gray-900 dark:text-white pb-2'>
                Choose Date
              </label>
              <Datepicker value={value} onChange={handleValueChange} />
            </div>
          </div>
        </div>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)}>Export</Button>
          <Button color='gray' onClick={() => props.setOpenModal(undefined)}>
            Cencel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExportCsv;
