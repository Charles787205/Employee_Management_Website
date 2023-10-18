"use client";
import { useState, useEffect } from "react";
import { SidePanel, EmployeeList, Department } from "@/components";
import { redirect } from "next/navigation";
import { BuiltInProviderType } from "next-auth/providers/index";
import {
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";

import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

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
