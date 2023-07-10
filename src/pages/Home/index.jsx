import React, { useEffect, useState, Fragment } from "react";
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
  const { totalPages } = useSelector((state) => state.data);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const name = localStorage.getItem("name") || sessionStorage.getItem("name");
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

  const sortedData = isDataLoaded && data ? [...data].sort((a, b) => b.id - a.id) : [];
  const homeData = sortedData.slice(0, 10);
  

  return (
    <Fragment>
      <div className="card">
        <div className="dashboard-box bg-violet-600 text-white p-4 rounded-lg mb-2">
          <h2 className="text-lg font-semibold mb-2">Selamat datang, {name}</h2>
        </div>
        <div className="dashboard-box bg-violet-800 text-white p-4 rounded-lg mb-2">
          <h2 className="text-lg font-semibold mb-2">Total Transaksi</h2>
          <h3 className="text-3xl font-bold">{totalPages}</h3>
        </div>
      </div>
      <div className="card">
        {isDataLoaded && (
          <div className="flex flex-wrap">
            <div className="w-full">
              <h2 className="text-lg font-semibold mb-2">Last 10 Transactions</h2>
              <DataTable className="w-full mt-4 p-datatable-sm" value={homeData}>
                <Column field="id" header="Id"  />
                <Column field="oda_number" dataType="numeric" header="Oda Number" />
                <Column field="bill_amount" body={balanceBodyTemplate} dataType="numeric" header="Price" />
                <Column field="created_at" dataType="date" header="Date" body={dateBodyTemplate} />
                <Column field="status" body={statusBodyTemplate} header="Status" />
              </DataTable>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
  