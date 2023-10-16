"use client";
import { useState } from "react";
import { SidePanel, EmployeeList, Department } from "@/components";

import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="row">
      <SidePanel handleClick={() => {}} />
      {children}
    </div>
  );
}
