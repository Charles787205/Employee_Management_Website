"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { employee as employeeType } from "@/types";
import { EmployeeForm } from "@/components";

const UpdatePage = ({ params }: { params: { id: number } }) => {
  const id = params.id;
  const [employee, setEmployee] = useState<employeeType>();

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await axios.get(
        "http://localhost/EmployeeManagementsystem/index.php/employee/list",
        {
          params: {
            id: id,
          },
        }
      );
      setEmployee(response.data[0]);
    };

    fetchEmployee();
  }, []);

  return (
    <div>
      <h1>{employee?.id}</h1>
      <EmployeeForm employee={employee} />
    </div>
  );
};

export default UpdatePage;
