import { employeeCardProps } from "@/types";

const EmployeeCard = ({ employee }: employeeCardProps) => {
  return (
    <div className="employee-card">
      <div className="row">
        <h2 className="__name">{`Name: ${employee.firstName} ${employee.lastName}`}</h2>
        <h2 className="__department">{`Department: ${employee.department}`}</h2>
      </div>
      <h2 className="__employee-id">{`Employee ID: ${employee.id}`}</h2>
    </div>
  );
};

export default EmployeeCard;
