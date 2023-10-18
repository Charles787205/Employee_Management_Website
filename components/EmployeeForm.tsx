"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { department } from "@/types";
import axios from "axios";
import { AxiosError } from "axios";
import { employee as employeeType } from "@/types";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
type error = {
  errorMessage: null | string;
  errorType: null | string;
};

type employeeFormProps = {
  employee?: employeeType | null;
};

const EmployeeForm = ({ employee }: employeeFormProps) => {
  const [departments, setDepartments] = useState<department[]>([]);

  const { register, setValue, handleSubmit } = useForm();
  const [error, setError] = useState<error>();
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    const getDepartments = async () => {
      const response = await axios.get(
        "http://localhost/EmployeeManagementsystem/index.php/department/list"
      );

      setDepartments(response.data);
    };
    getDepartments();
  }, []);

  if (isSubmit) {
    redirect("/admin/employee");
  }
  const onInsert = async (data: {}) => {
    const config = {
      headers: { "Content-type": "application/json" },
    };

    try {
      const response = await axios.post(
        "http://localhost/EmployeeManagementsystem/index.php/employee/post",
        data,
        config
      );
      console.log(response);
      setError({ errorMessage: null, errorType: null });
    } catch (err) {
      if (err instanceof AxiosError) {
        const error: error = {
          errorMessage: err.response?.statusText!,
          errorType: "email",
        };
        setError(error);
      }
    }
    setIsSubmit(true);
  };

  if (employee) {
    for (const [field, values] of Object.entries(employee)) {
      setValue(field, values);
    }
  }

  const onUpdate = async (data: {}) => {
    console.log("updating");
    const config = {
      headers: { "Content-type": "application/json" },
    };

    try {
      const response = await axios.post(
        "http://localhost/EmployeeManagementsystem/index.php/employee/update",
        { ...data, id: employee!.id },
        config
      );
      console.log({ ...data, id: employee!.id });
      console.log(response);
      setError({ errorMessage: null, errorType: null });
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        const error: error = {
          errorMessage: err.response?.statusText!,
          errorType: "email",
        };
        setError(error);
      }
    }
    setIsSubmit(true);
  };

  return (
    <div className="add-employee-container">
      <form
        action="submit"
        onSubmit={
          employee != null ? handleSubmit(onUpdate) : handleSubmit(onInsert)
        }
        className="employee_form"
      >
        <h2>Employee Details</h2>
        <div className="row">
          <label>Name:</label>
          <input
            type="text"
            {...register("firstName", { required: true })}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            {...register("lastName", { required: true })}
            placeholder="Last name"
            required
          />
        </div>
        <div className="row">
          <label>Email:</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder={`${
              error?.errorType === "email"
                ? error.errorMessage
                : "johndoe@example.com"
            }`}
            className={`${error?.errorType === "email" && "input_error"}`}
          />
        </div>
        <div className="row">
          <label>Position</label>
          <input type="text" {...register("position", { required: true })} />
        </div>
        <div className="row">
          <label>Gender</label>
          <select id="gender" {...register("gender", { required: true })}>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>
        <div className="row">
          <label>Department:</label>
          <select
            id="department"
            {...register("departmentId", { required: true })}
          >
            {departments.map((department) => {
              return (
                <option value={department.id} key={department.id}>
                  {department.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="row">
          <label>Mobile Number:</label>
          <input
            type="tel"
            {...register("mobileNumber", { required: false })}
          />
        </div>
        <div className="row">
          <label>Salary Rate</label>
          <input
            type="number"
            {...register("salaryRate", { required: true })}
          />
        </div>

        <div className="row">
          <label>Birth Date:</label>
          <input type="date" {...register("birthDate", { required: true })} />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
