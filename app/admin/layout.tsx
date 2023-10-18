"use client";
import { useState, useEffect } from "react";
import { SidePanel } from "@/components";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { getEmployeeByEmail } from "@/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [isSuccess, setIsSuccess] = useState(true);
  if (session === null) {
    redirect("/");
  }

  return (
    <div className="row">
      <SidePanel handleClick={() => {}} />
      {children}
    </div>
  );
}
