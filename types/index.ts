export type employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  position: string;
  gender: string;
  mobileNumber: string;
  salaryRate: number;
  department: string;
  image?: string;
};

export type employeeCardProps = {
  employee: employee;
};
export type department = {
  id: number;
  name: string;
};
