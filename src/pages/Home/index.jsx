import React, { useEffect, useState, useRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, selectData } from "../../redux/slice/dataSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(selectData);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchData(1));
  }, [dispatch]);

  useEffect(() => {
    if (data && data.length > 0) {
      setIsDataLoaded(true);
    }
  }, [data]);

  const getSeverity = (status) => {
    switch (status) {
      case "failed":
        return "danger";
      case "SUCCESS":
        return "success";
      case "WAITING_FOR_DEBITTED":
        return "warning";
      default:
        return "";
    }
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
  };

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
    return "";
  };

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
    return "";
  };

  const homeData = isDataLoaded && data ? data.slice(0, 10) : [];

  return (
    <Fragment>
      <>
        {/* <Navs /> */}
        <div className="card">
          {isDataLoaded && (
            <DataTable value={homeData} tableStyle={{ minWidth: "50rem" }}>
              <Column field="id" header="Id" />
              <Column
                field="oda_number"
                dataType="numeric"
                style={{ width: "25%" }}
                header="Oda Number"
              />
              <Column
                field="bill_amount"
                body={balanceBodyTemplate}
                dataType="numeric"
                style={{ minWidth: "5rem" }}
                header="Price"
              />
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
              />
            </DataTable>
          )}
        </div>
      </>
    </Fragment>
  );
};

export default Home;