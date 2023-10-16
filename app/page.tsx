import { redirect } from "next/navigation";
import { useState } from "react";

export default function Home() {
  redirect("/admin/employee/");
  return <main className="main"></main>;
}
