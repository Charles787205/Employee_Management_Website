import { employee } from "@/types";
import styles from "@/styles/employeeList.module.css";
import { redirect } from "next/navigation";

const EmployeeTable = ({ employees }: { employees: employee[] }) => {
  const handleClick = (employeeId: number) => {
    redirect(`/admin/employee/${employeeId}`);
  };
  return (
    <table className={styles.employee_table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Department</th>
          <th>Mobile Number</th>
          <th>Email</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {employees?.map((employee) => (
          <tr
            key={employee.id}
            onClick={() => {
              window.location.href = `/admin/employee/${employee.id}`;
            }}
          >
            <td>
              {employee.firstName} {employee.lastName}
            </td>
            <td>{employee.department}</td>
            <td>{employee.mobileNumber}</td>
            <td>{employee.email}</td>
            <td>{employee.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
