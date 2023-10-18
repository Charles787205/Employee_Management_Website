"use client";
import styles from "@/styles/department.module.css";
import { department, employee } from "@/types";
import { useState, useEffect } from "react";
import axios from "axios";
import EmployeeTable from "./EmployeeTable";
type departmentCardProps = {
  department: department;
  handleDelete: Function;
};
const DepartmentCard = ({ department, handleDelete }: departmentCardProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [employees, setEmployees] = useState<employee[]>([]);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    const getEmployees = async () => {
      const response = await axios.get(
        "http://localhost/EmployeeManagementsystem/index.php/employee/list",
        {
          params: {
            departmentId: department.id,
          },
        }
      );
      setEmployees(response.data);
    };
    getEmployees();
  }, []);

  const DeleteMenu = () => {
    return (
      <div className={styles.delete_container}>
        <h3>Delete {department.name} department?</h3>
        <div className={styles.delete_button_row}>
          <button
            onClick={() => setIsDelete(false)}
            className={styles.cancel_button}
          >
            Cancel
          </button>
          <button
            className={styles.delete_button}
            onClick={() => handleDelete(department.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className={styles.department_card}>
      <div className={styles.row}>
        <h3>Department: {department.name}</h3>
        <button
          className={styles.delete_button}
          onClick={() => setIsDelete(true)}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <div className={styles.row}>
        <h3>{employees?.length} Employees:</h3>

        {employees.length != 0 && (
          <button
            className={styles.open_button}
            onClick={() => {
              setIsOpened(!isOpened);
            }}
          >
            {isOpened ? "Close" : "Open"}
          </button>
        )}
      </div>

      <div
        className={`${styles.department_table} ${!isOpened && styles.hidden}`}
      >
        <EmployeeTable employees={employees} />
      </div>
      {isDelete && <DeleteMenu />}
    </div>
  );
};

export default DepartmentCard;
