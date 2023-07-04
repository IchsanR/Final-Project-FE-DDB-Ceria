import { NavigasiBar } from "../../components";
import { Navs } from "../../components";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paginator } from 'primereact/paginator';
import {
  fetchData,
  filterData,
  selectData,
  selectFilteredData,
} from "../../redux/slice/dataSlice";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons
//import "primeflex/primeflex.css"; // css utility
import "./Flags.module.css";
import "./style.css";
import ExportCsv from "../../components/molecule/ExportCsv";
import Swal from "sweetalert2";
import { ProgressSpinner } from 'primereact/progressspinner';
const TransactionPage = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(100);
  // const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // const data = useSelector(selectData);
  const { data } = useSelector(selectData);
  const { totalPages, loading, error } = useSelector((state) => state.data);
  let filteredData = useSelector(selectFilteredData);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchData(1));
      //setLoading(false);
    }, 200);
    console.log("ini" + totalPages)
  }, [dispatch]);

  const onPageChange = (event) => {
    console.log("ec" + event.page)
    dispatch(fetchData(event.page + 1));
    setFirst(event.first);
    setRows(event.rows);
  };

  const loader = (
    <div className="loading-spinner">
      <ProgressSpinner />
    </div>
  );

  const handleFilter = (sdate, edate) => {
     dispatch(filterData({ status: statusF, sdate, edate })); 
  };
  const handleShowAll = () => {
     dispatch(filterData({}))
  };

  const handleResetFilter = () => {
    setStatusF("");
    setDates(null);
    setEndDate(null);
    setFirst(0)
    setRows(100)
    filteredData = data;
    dispatch(fetchData(1));
    initFilters();
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Filter Cleared', life: 3000 });
  };
  // const dispatch = useDispatch();
  // const data = useSelector((state) => state.data.items);
  const status = useSelector((state) => state.data.status);
  // const error = useSelector((state) => state.data.error);
  const [filters, setFilters] = useState(null);
  const [statusF, setStatusF] = useState("");
  const [dates, setDates] = useState(null);
  // useEffect(() => {
  //   console.log(isFilter)
  //   if(isFilter){
  //     dispatch(fetchData(statusF,sDate,eDate));
  //   }else dispatch(fetchData());
  //   initFilters();
  // }, [dispatch]);

  // if (status === 'loading') {
  //   setLoading(true)
  // }

  // if (status === 'failed') {
  //   return <div>Error: {error}</div>;
  // }

  //custom status
  const getSeverity = (status) => {
    switch (status) {
      case "failed":
        return "danger";

      case "SUCCESS":
        return "success";

      case "WAITING_FOR_DEBITTED":
        return "warning";
    }
  };
  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };
  //filtering status
  const statuses = ["SUCCESS", "WAITING_FOR_DEBITTED"];
  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showFilterMatchModes={false}
        showClear
      />
    );
  };
  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  //custom price
  const balanceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.bill_amount);
  };
  const formatCurrency = (value) => {
    if (value !== undefined && value !== null) {
      return value.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    }
  };
  //filter price
  const balanceFilterTemplate = (options) => {
    return (
      <InputNumber
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        mode="currency"
        currency="IDR"
        locale="id-ID"
      />
    );
  };
  //custom date
  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.created_at);
  };
  const formatDate = (value) => {
    if (value !== undefined && value !== null) {
      const dateValue = value ? new Date(value) : null;
      // console.log(dateValue);
      return dateValue.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  };
  //filtering date
  const dateFilterTemplate = (options) => {
    // console.log("dateov" + options.value);
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };
  const initFilters = () => {
    setFilters({
      id: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      oda_number: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      created_at: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      bill_amount: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
    });
  };
  function formatDateF(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  const fiterDate = () => {
    //setLoading(true);
    if (dates || statusF !== "") {
      let sdate = "";
      let edate = "";
      if (dates) {
        sdate = formatDateF(dates[0]);
        edate = formatDateF(dates[1]);
      }
      // dispatch(filterData(statusF, sdate, edate));
      handleFilter(sdate, edate);
      // setSDate(sdate);
      // setEDate(edate);
      // dispatch(fetchData(statusF, sdate, edate));
      console.log("inis" + sdate);
    } else {
      toast.current.show({ severity: 'warn', summary: 'warning', detail: 'Please Select Filter', life: 3000 });
    }
  };


  //render header
  const renderHeader = () => {
    return (
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col md:flex-row md:items-center">
          <span className="p-input-icon-left mb-2 md:mb-0 md:mr-2">
            <Dropdown
              value={statusF}
              options={statuses}
              onChange={(e) => setStatusF(e.value)}
              itemTemplate={statusItemTemplate}
              placeholder="Select Status"
              className="p-column-filter p-inputtext-sm"
            />
            <Calendar
              placeholder="Select Range Date"
              value={dates}
              onChange={(e) => setDates(e.value)}
              selectionMode="range"
              readOnlyInput
              className="md:ml-2 p-inputtext-sm"
            />
          </span>
          <Button
            placeholder="Select Range"
            label="Filter"
            type="submit"
            onClick={fiterDate}
            className="p-button-sm md:ml-2"
            icon="pi pi-filter"
          // disabled={loading}
          />
          <Button
            placeholder="Reset Filter"
            onClick={handleResetFilter}
            icon="pi pi-filter-slash"
            label="Clear"
            className="p-button-outlined md:ml-2 p-button-sm"
          />
        </div>
        <div className="mt-2 md:mt-0">
          <Button
            tooltip="Export XLS"
            tooltipOptions={{ position: 'bottom' }}
            type="button"
            icon="pi pi-file-excel"
            severity="success"
            rounded
            onClick={exportExcel}
            data-pr-tooltip="XLS"
            className="mr-2 hidden"
          />
          <ExportCsv />
        </div>
      </div>
    );
  };
  const dt = useRef(null);
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };
  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(filteredData.data);
  
      // Get the range of the column to convert to string
      const columnRange = "D2:D" + (filteredData.data.length + 1);
  
      // Iterate over the range and convert each cell to string
      for (let rowNum = 2; rowNum <= filteredData.data.length + 1; rowNum++) {
        const cellRefB = "B" + rowNum;
        const cellRefC = "C" + rowNum;
        const cellB = worksheet[cellRefB];
        cellB.t = "s"; // Set the cell type to string
        cellB.v = String(cellB.v); // Convert the cell value to string
        const cellC = worksheet[cellRefC];
        cellC.t = "s"; // Set the cell type to string
        cellC.v = String(cellC.v); // Convert the cell value to string
      }
      
  
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
  
      saveAsExcelFile(excelBuffer, "data-transaction");
    });
  };
  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date() + EXCEL_EXTENSION
        );
      }
    });
  };
  const paginatorRight = <Button type="button" icon="pi pi-eye" label="Show all" text onClick={handleShowAll} />;
  const paginatorLeft = <Button type="button" icon="pi pi-download "  text onClick={exportExcel} tooltip="Export XLS"
  tooltipOptions={{ position: 'bottom' }} />;
  const header = renderHeader();

  return (
    <>
      {/* <Navs /> */}
      <div className="card">
        <Toast ref={toast} />
        <DataTable
          ref={dt}
          header={header}
          paginator
          rows={5}
          loading={loading}
          loader={loader}
          rowsPerPageOptions={[5, 10, 25, 50]}
          value={filteredData.code == 200 ? filteredData.data : data}
          tableStyle={{ minWidth: "50rem" }}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          scrollable scrollHeight="400px"
          paginatorRight={paginatorRight}
          paginatorLeft={paginatorLeft}
        // emptyMessage={error ? error : "Data Not Found" }
        // totalRecords={totalPages}
        // onPage={onPageChange}

        >
          <Column field="id" sortable header="Id"></Column>
          <Column
            field="oda_number"
            sortable
            dataType="numeric"
            filter
            style={{ width: "25%" }}
            header="Oda Number"
            filterMatchMode={false}
            showAddButton={false}
          ></Column>
          <Column
            field="bill_amount"
            body={balanceBodyTemplate}
            filter
            sortable
            dataType="numeric"
            style={{ minWidth: "5rem" }}
            filterElement={balanceFilterTemplate}
            showAddButton={false}
            header="Price"
          ></Column>
          <Column
            header="Date"
            field="created_at"
            dataType="date"
            sortable
            style={{ minWidth: "5rem" }}
            body={dateBodyTemplate}
          // filterElement={dateFilterTemplate}
          // filter
          />
          <Column
            field="status"
            filter
            sortable
            body={statusBodyTemplate}
            filterMenuStyle={{ width: "14rem" }}
            style={{ width: "20%" }}
            filterElement={statusFilterTemplate}
            header="Status"
            showAddButton={false}
            showFilterMatchModes={false}
          ></Column>
        </DataTable>
        <Paginator
          first={first} rows={rows}
          template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          totalRecords={filteredData.code == 200 ? totalPages : totalPages}
          onPageChange={onPageChange} />
      </div>
    </>
  );
};

export default TransactionPage;
