"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { employee } from "@/types";
import axios from "axios";
import { useState, useEffect } from "react";

type sidePanelProps = {
  handleClick: Function;
};
const SidePanel = ({ handleClick }: sidePanelProps) => {
  const { data: session } = useSession();
  const [name, setName] = useState("");

  useEffect(() => {
    const getUserByEmail = async () => {
      const response = await axios.get(
        "http://localhost/EmployeeManagementsystem/index.php/employee/list",
        {
          params: {
            email: session?.user?.email,
          },
        }
      );
      const user: employee = response.data[0];
      setName(user.firstName + " " + user.lastName);
      console.log(user);
    };
    getUserByEmail();
  }, [session]);
  return (
    <div className="side-panel">
      {session?.user && (
        <Image
          src={session?.user?.image!}
          width={150}
          height={150}
          alt="profile picture"
          className="profile-pic"
        />
      )}
      <h2>{name}</h2>
      <ul>
        <Link href="/admin/employee/">
          <li>Employees</li>
        </Link>
        <Link href="/admin/employee/add">
          <li>Add Employees</li>
        </Link>
        <Link href="/admin/department">
          <li
            onClick={(e) => {
              handleClick("add department");
            }}
          >
            Add Department
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default SidePanel;
