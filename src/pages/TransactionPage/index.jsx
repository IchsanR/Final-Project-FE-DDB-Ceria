import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paginator } from "primereact/paginator";
import {
  fetchData,
  filterData,
  selectData,
  selectFilteredData,
} from "../../redux/slice/dataSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons
import ExportCsv from "../../components/molecule/ExportCsv";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const dataTable = useRef(null);
  const toast = useRef(null);
  const statuses = ["SUCCESS", "WAITING_FOR_DEBITTED"];
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(100);
  const [statusF, setStatusF] = useState("");
  const [dates, setDates] = useState(null);
  const [showPaginator, setShowPaginator] = useState(true);
  const { data } = useSelector(selectData);
  const { totalPages, loading, error } = useSelector((state) => state.data);
  let filteredData = useSelector(selectFilteredData);

  //initiation data
  useEffect(() => {
    dispatch(fetchData(1));
  }, [dispatch]);

  //get severity status
  const getSeverity = (status) => {
    switch (status) {
      case "SUCCESS":
        return "success";
      case "WAITING_FOR_DEBITTED":
        return "warning";
      default:
        return "warning";
    }
  };

  //set status style in table
  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  //template filter status in table
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

  // set status style in filter
  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  //set price style in table
  const balanceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  //set format price in idr
  const formatCurrency = (value) => {
    if (value !== undefined && value !== null) {
      return value.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    }
  };

  //template price filter in table
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

  //set date style in table
  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.created_at);
  };

  //set format date
  const formatDate = (value) => {
    if (value !== undefined && value !== null) {
      const dateValue = value ? new Date(value) : null;
      return dateValue.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  };

  //render header template filtering global and export csv
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
            onClick={fiterDateStatus}
            className="p-button-sm md:ml-2 bg-violet-800"
            icon="pi pi-filter"
          />
          <Button
            placeholder="Reset Filter"
            onClick={handleResetFilter}
            icon="pi pi-filter-slash"
            label="Clear"
            className="p-button-outlined md:ml-2 p-button-sm text-violet-800"
          />
        </div>
        <div className="mt-2 md:mt-0">
          <ExportCsv />
        </div>
      </div>
    );
  };

  //set custom filter global date status
  const fiterDateStatus = () => {
    //validation date and status
    if ((dates && (dates[0] && dates[1]))|| statusF !== "") {
      let sdate = "";
      let edate = "";
      //custom format date
      if(dates && (dates[0] && dates[1])) {
        sdate = formatDateF(dates[0]);
        edate = formatDateF(dates[1]);
      }else if(dates && dates[0] ){
        sdate = formatDateF(dates[0]);
        edate = sdate
      }
      //send custom date to handlefilter  
      handleFilter(sdate, edate);
    } else {
      toast.current.show({
        //alert no filter selected
        severity: "warn",
        summary: "warning",
        detail: "Please Select Filter",
        life: 3000,
      });
    }
  };

  //set custom date format
  const formatDateF = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  //request filterdata
  const handleFilter = (sdate, edate) => {
    dispatch(filterData({ status: statusF, sdate, edate }));
    setShowPaginator(false); //set show paginator from datatable
  };

  //reset filter
  const handleResetFilter = () => {
    setStatusF("");
    setDates(null);
    setFirst(0);
    setRows(100);
    filteredData = data;
    dispatch(fetchData(1));
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Filter Cleared",
      life: 3000,
    });
    setShowPaginator(true); //set show original paginator
  };

  //request data all
  const handleShowAll = () => {
    dispatch(filterData({}));
    setShowPaginator(false);
  };

  //template save data to excel
  // const exportExcel = () => {
  //   if(filteredData.data){
  //   import("xlsx").then((xlsx) => {
  //     const worksheet = xlsx.utils.json_to_sheet(filteredData.data);
  //     for (let rowNum = 2; rowNum <= filteredData.data.length + 1; rowNum++) {
  //       const cellRefB = "B" + rowNum;
  //       const cellRefC = "C" + rowNum;
  //       const cellB = worksheet[cellRefB];
  //       cellB.t = "s";
  //       cellB.v = String(cellB.v);
  //       const cellC = worksheet[cellRefC];
  //       cellC.t = "s";
  //       cellC.v = String(cellC.v);
  //     }
  //     const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  //     const excelBuffer = xlsx.write(workbook, {
  //       bookType: "xlsx",
  //       type: "array",
  //     });
  //     saveAsExcelFile(excelBuffer, "data-transaction");
  //   });
  // }else {
  //   toast.current.show({
  //     severity: "error",
  //     summary: "Error",
  //     detail: "An error no data.",
  //     life: 3000,
  //   });
  // }
  // };

  // const saveAsExcelFile = (buffer, fileName) => {
  //   import("file-saver").then((module) => {
  //     if (module && module.default) {
  //       let EXCEL_TYPE =
  //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //       let EXCEL_EXTENSION = ".xlsx";
  //       const data = new Blob([buffer], {
  //         type: EXCEL_TYPE,
  //       });
  //       module.default.saveAs(
  //         data,
  //         fileName + "_export_" + new Date() + EXCEL_EXTENSION
  //       );
  //     }
  //   });
  // };

  //template paginator right side
  const paginatorRight = (
    <Button
      type="button"
      icon="pi pi-eye"
      label="Show all"
      text
      onClick={handleShowAll}
      className="text-violet-800"
    />
  );

  //template paginator left side
  const paginatorLeft = (
    // <Button
    //   type="button"
    //   icon="pi pi-download"
    //   text
    //   onClick={exportExcel}
    //   tooltip="Download Data Table"
    //   tooltipOptions={{ position: "bottom" }}
    // />
    <span/>
  );

  //request data pagination
  const onPageChange = (event) => {
    dispatch(fetchData(event.page + 1));
    setFirst(event.first);
    setRows(event.rows);
  };

  //handler error with toast
  useEffect(() => {
    if (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "An error occurred while fetching data.",
        life: 3000,
      });
    }
  }, [error]);

  //handler panding waiting with toast
  useEffect(() => {
    const pendingDataTimeout = setTimeout(() => {
      if (loading) {
        toast.current.show({
          severity: "info",
          summary: "Pending",
          detail: "Data is still loading...",
          life: 3000,
        });
      }
    }, 15000);
    return () => clearTimeout(pendingDataTimeout);
  }, [loading]);

  const header = renderHeader();

  return (
    <>
      <div className="card">
        <Toast ref={toast} />
        <DataTable
          ref={dataTable}
          header={header}
          paginator={!showPaginator}
          rows={5}
          loading={loading}
          rowsPerPageOptions={[5, 10, 25, 50]}
          value={filteredData.code === 200 ? filteredData.data : data}
          tableStyle={{ minWidth: "50rem" }}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          scrollable
          scrollHeight="480px"
          paginatorRight={paginatorRight}
          paginatorLeft={paginatorLeft}
          emptyMessage={
            "No data found, please click show all to found your data"
          }
          sortField="id"
          sortOrder={-1}
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
            field="price"
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
        {showPaginator && (
          <Paginator
            first={first}
            rows={rows}
            template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            totalRecords={filteredData.code === 200 ? totalPages : totalPages}
            onPageChange={onPageChange}
            rightContent={paginatorRight}
            leftContent={paginatorLeft}
          />
        )}
      </div>
    </>
  );
};

export default TransactionPage;
