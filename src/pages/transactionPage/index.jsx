import { NavigasiBar } from "../../components";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons
//import "primeflex/primeflex.css"; // css utility
import "./Flags.module.css";
import "./style.css";
import ExportCsv from "../../components/molecule/ExportCsv";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const data = useSelector(selectData);
  let filteredData = useSelector(selectFilteredData);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleFilter = (sdate, edate) => {
    console.log("inidatasdateedate" + sdate, edate);
    dispatch(filterData({ status: statusF, sdate, edate }));
  };

  const handleResetFilter = () => {
    setStatusF("");
    setDates(null);
    setEndDate(null);
    filteredData = data;
    dispatch(fetchData());
  };
  // const dispatch = useDispatch();
  // const data = useSelector((state) => state.data.items);
  const status = useSelector((state) => state.data.status);
  const error = useSelector((state) => state.data.error);
  const [filters, setFilters] = useState(null);
  const [statusF, setStatusF] = useState("");
  const [dates, setDates] = useState(null);
  const [isFilter, setIsFilter] = useState(false);
  const [sDate, setSDate] = useState("");
  const [eDate, setEDate] = useState("");
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
    const sdate = formatDateF(dates[0]);
    const edate = formatDateF(dates[1]);

    dispatch(filterData(statusF, sdate, edate));
    handleFilter(sdate.toString(), edate.toString());
    setSDate(sdate);
    setEDate(edate);
    // dispatch(fetchData(statusF, sdate, edate));
    console.log("inis" + sdate);
    setIsFilter(true);
  };

  //render header
  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <Dropdown
            value={statusF}
            options={statuses}
            onChange={(e) => setStatusF(e.value)}
            placeholder="Select One"
            className="p-column-filter"
          />
          <Calendar
            placeholder="Select Range"
            value={dates}
            onChange={(e) => setDates(e.value)}
            selectionMode="range"
            readOnlyInput
          />
          <Button
            placeholder="Select Range"
            label="Filter"
            type="submit"
            onClick={fiterDate}
            icon="pi pi-filter"
          />
          <Button
            placeholder="Reset Filter"
            onClick={handleResetFilter}
            // icon="pi pi-check"
            icon="pi pi-filter-slash"
            label="Clear"
            className="p-button-outlined"
          />
        </span>
        <span>
          {/* <Button
            tooltip="Export CSV"
            tooltipOptions={{
              position: "bottom",
              mouseTrack: true,
              mouseTrackTop: 15,
            }}
            type="button"
            icon="pi pi-file"
            rounded
            onClick={() => exportCSV(false)}
            data-pr-tooltip="CSV"
          />
          <Button
            tooltip="Export XLS"
            tooltipOptions={{
              position: "bottom",
              mouseTrack: true,
              mouseTrackTop: 15,
            }}
            type="button"
            icon="pi pi-file-excel"
            severity="success"
            rounded
            onClick={exportExcel}
            data-pr-tooltip="XLS"
          /> */}
        </span>
        <ExportCsv />
      </div>
    );
  };
  const dt = useRef(null);
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };
  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data.data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "data");
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
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };
  const header = renderHeader();

  return (
    <>
      <NavigasiBar />
      <div className="card">
        <DataTable
          ref={dt}
          header={header}
          paginator
          rows={10}
          value={filteredData.code == 200 ? filteredData.data : data.data}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="id" sortable header="Id"></Column>
          <Column
            field="oda_number"
            sortable
            dataType="numeric"
            filter
            style={{ width: "25%" }}
            header="Oda Number"
          ></Column>
          <Column
            field="bill_amount"
            body={balanceBodyTemplate}
            filter
            sortable
            dataType="numeric"
            style={{ minWidth: "10rem" }}
            filterElement={balanceFilterTemplate}
            showAddButton={false}
            header="Price"
          ></Column>
          <Column
            header="Date"
            field="created_at"
            dataType="date"
            sortable
            style={{ minWidth: "10rem" }}
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
            style={{ width: "25%" }}
            filterElement={statusFilterTemplate}
            header="Status"
            showAddButton={false}
          ></Column>
        </DataTable>
      </div>
    </>
  );
};

export default TransactionPage;
