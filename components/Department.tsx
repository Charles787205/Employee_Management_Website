"use client";
import styles from "styles/department.module.css";
import { useEffect, useState, MouseEvent } from "react";
import axios from "axios";
import { department } from "@/types";
import DepartmentCard from "./DepartmentCard";

const Department = () => {
  const [departments, setDepartments] = useState<department[]>([
    { id: 1, name: "dsafd" },
  ]);
  const [departmentName, setDepartmentName] = useState("");

  const getDepartments = async () => {
    const response = await axios.get(
      "http://localhost/EmployeeManagementsystem/index.php/department/list"
    );
    setDepartments(response.data);
  };
  useEffect(() => {
    getDepartments();
  }, []);

  const handleAddDepartmentClick = async (e: MouseEvent) => {
    e.preventDefault();
    const config = {
      headers: { "Content-type": "application/json" },
    };
    try {
      const response = await axios.post(
        "http://localhost/EmployeeManagementsystem/index.php/department/post",
        { name: departmentName },
        { headers: { "Content-type": "application/json" }, method: "no-cors" }
      );
      setDepartmentName("");
      getDepartments();
    } catch (e) {}
  };

  const handleDelete = async (id: number) => {
    const response = await axios.post(
      "http://localhost/EmployeeManagementsystem/index.php/department/delete",
      { id: id }
    );
    getDepartments();
  };
  return (
    <div className={styles.department_container}>
      <div className={styles.add_department}>
        <form>
          <div className={styles.row}>
            <label>Name: </label>
            <input
              type="text"
              value={departmentName}
              onChange={(e) => {
                setDepartmentName(e.target.value);
              }}
            />
          </div>
          <button onClick={(e) => handleAddDepartmentClick(e)}>
            Add Department
          </button>
        </form>
      </div>
      {departments.map((department) => (
        <DepartmentCard
          key={department.id}
          handleDelete={handleDelete}
          department={department}
        />
      ))}
    </div>
  );
};

export default Department;
