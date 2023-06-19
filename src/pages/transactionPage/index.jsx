import { NavigasiBar } from "../../components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/slice/dataSlice";
import { DataTable } from "primereact/datatable";
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
import "primeflex/primeflex.css"; // css utility
import "./index.css";
import "./flags.css";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.items);
  const status = useSelector((state) => state.data.status);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

  // if (status === 'failed') {
  //   return <div>Error: {error}</div>;
  // }

  //custom status
  const getSeverity = (status) => {
    switch (status) {
      case "failed":
        return "danger";

      case "success":
        return "success";

      case "pending":
        return "warning";
    }
  };
  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };
  //filtering status
  const statuses = ["failed", "pending", "success"];
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

  return (
    <>
      <NavigasiBar />
      <div className="card">
        <DataTable paginator rows={5} value={data.message} tableStyle={{ minWidth: "50rem" }}>
          <Column field="id" sortable header="Id"></Column>
          <Column
            field="oda_number"
            sortable
            filter
            style={{ width: "25%" }}
            header="Oda Number"
          ></Column>
          <Column
            field="price"
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
