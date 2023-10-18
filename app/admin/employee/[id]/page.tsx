"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { employee as employeeType } from "@/types";
import styles from "@/styles/employee-details.module.css";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const page = ({ params }: { params: { id: number } }) => {
  const id = params.id;
  const [employee, setEmployee] = useState<employeeType>();
  const [isDelete, setIsDelete] = useState(false);
  const [isSure, setIsSure] = useState(false);

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

  const handleDelete = async () => {
    const response = await axios.post(
      "http://localhost/EmployeeManagementsystem/index.php/employee/delete",
      { id: id }
    );
    window.location.href = "/admin/employee";
  };

  const DeleteMenu = () => {
    return (
      <div
        className={`${styles.delete_container} ${
          !isDelete ? styles.hide : styles.show
        }`}
      >
        <h3>Delete this employee?</h3>
        <div className={styles.delete_button_row}>
          <button
            onClick={() => setIsDelete(false)}
            className={styles.cancel_button}
          >
            Cancel
          </button>
          <button className={styles.delete_button} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.detail_container}>
        <Image
          src={employee?.image || "/profile.png"}
          height={150}
          width={150}
          alt="profile pic"
          className={styles.profile_pic}
        />
        <h2>
          {employee?.firstName} {employee?.lastName}
        </h2>
        <div className={styles.row}>
          <h3>Employee Number:</h3>
          <p className={styles.employee_detail}>{employee?.id}</p>
        </div>
        <div className={styles.row}>
          <h3>Email:</h3>
          <p className={styles.employee_detail}>{employee?.email}</p>
        </div>
        <div className={styles.row}>
          <h3>Birthdate:</h3>
          <p className={styles.employee_detail}>{employee?.birthDate}</p>
        </div>
        <div className={styles.row}>
          <h3>Position:</h3>
          <p className={styles.employee_detail}>{employee?.position}</p>
        </div>
        <div className={styles.row}>
          <h3>Gender:</h3>
          <p className={styles.employee_detail}>{employee?.gender}</p>
        </div>
        <div className={styles.row}>
          <h3>Mobile Number:</h3>
          <p className={styles.employee_detail}>{employee?.mobileNumber}</p>
        </div>
        <div className={styles.row}>
          <h3>Salary Rate:</h3>
          <p className={styles.employee_detail}>
            {employee?.salaryRate} Php/Hr
          </p>
        </div>
        <div className={styles.row}>
          <h3>Department:</h3>
          <p className={styles.employee_detail}>{employee?.department}</p>
        </div>
        <div className={styles.row}></div>
        <button
          onClick={() => {
            window.location.href = `${id}/update/`;
          }}
          className={styles.update_button}
        >
          Update Employee
        </button>
        <button
          onClick={() => {
            setIsDelete(true);
          }}
          className={styles.delete_button}
        >
          Delete Employee
        </button>
      </div>
      <DeleteMenu />
    </div>
  );
};

export default page;
