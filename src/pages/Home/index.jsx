import React, { useEffect, useState, useRef,Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  selectData,
} from "../../redux/slice/dataSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(selectData);
  const homeData = data.slice(0, 5);

  useEffect(() => {
      dispatch(fetchData(1));
  }, [dispatch]);

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

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };
  //custom price
  const balanceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };
  const formatCurrency = (value) => {
    if (value !== undefined && value !== null) {
      return value.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    }
  };

  //custom date
  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.created_at);
  };
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

	return (
		<Fragment>
     <>
      {/* <Navs /> */}
      <div className="card">
        <DataTable
          value={homeData}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="id"  header="Id"></Column>
          <Column
            field="oda_number"
            dataType="numeric"
            style={{ width: "25%" }}
            header="Oda Number"
          ></Column>
          <Column
            field="bill_amount"
            body={balanceBodyTemplate}
            dataType="numeric"
            style={{ minWidth: "5rem" }}
            header="Price"
          ></Column>
          <Column
            header="Date"
            field="created_at"
            dataType="date"
            style={{ minWidth: "5rem" }}
            body={dateBodyTemplate}
          />
          <Column
            field="status"
            body={statusBodyTemplate}
            style={{ width: "20%" }}
            header="Status"
          ></Column>
        </DataTable>
      </div>
    </>
      
		</Fragment>
	);
};

export default Home;
