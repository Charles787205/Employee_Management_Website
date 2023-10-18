import axios from "axios";
import { useEffect } from "react";
import { employee } from "@/types";

export const getDepartments = async () => {
  const response = await axios.get(process.env.BACKEND_URL + "department/list");
  return response;
};

export const getEmployeeByEmail: (email: string) => Promise<employee> =
  async function (email) {
    const response = await axios.get(
      "http://localhost/EmployeeManagementsystem/index.php/employee/list",
      {
        params: {
          email: email,
        },
      }
    );
    return response.data[0];
  };
