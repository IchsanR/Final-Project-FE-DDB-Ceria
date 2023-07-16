import axios from "axios";
import { backendUrl } from '../../config/env.config';

export const apiExportCsv = (token, status, startDate, endDate) => {
  const setting = {
    status,
    startDate,
    endDate,
  };

  return axios.get(
    `${backendUrl}/api/export-transaction/csv${
      setting.status && setting.startDate && setting.endDate
        ? `?status=${setting.status}&start_date=${setting.startDate}&end_date=${setting.endDate}`
        : setting.status
        ? `?status=${setting.status}` 
        : setting.startDate && setting.endDate ? `?start_date=${setting.startDate}&end_date=${setting.endDate}` : ''
    }`, {
    headers: {
      Authorization: `${token}`,
    }
  }
  );
};
