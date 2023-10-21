"use client";
import { useEffect, useState } from "react";

import { employee } from "@/types";
import styles from "@/styles/employeeList.module.css";
import EmployeeTable from "./EmployeeTable";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<employee[]>([]);
  useEffect(() => {
    const getEmployee = async () => {
      const response = await axios.get(
        "http://localhost/EmployeeManagementsystem/index.php/employee/list"
      );
      console.log(response);

      const result = response.data;

      setEmployees(result);
    };
    getEmployee();
  }, []);

  return (
    <div className={styles.employee_container}>
      <h1>Employee List</h1>
      <EmployeeTable employees={employees} />
    </div>
  );
};

export default EmployeeList;
