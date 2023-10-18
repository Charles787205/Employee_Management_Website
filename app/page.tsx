"use client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { BuiltInProviderType } from "next-auth/providers/index";
import styles from "@/styles/home.module.css";

import {
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
  signIn,
} from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session?.user?.email);
  if (session?.user) {
    redirect("/admin/employee");
  }

  return (
    <main className={styles.main}>
      <div className={styles.main_container}>
        <h2>Employee Management Website</h2>
        <p>
          Welcome to Techno Company's Employee Management System Efficiently
          manage your workforce with our comprehensive Employee Management
          System. Designed to streamline your HR processes, boost productivity,
          and enhance organizational efficiency, our platform provides a
          seamless experience for both employees and administrators.
        </p>
        <button
          onClick={() => {
            signIn();
          }}
        >
          Sign In With Google
        </button>
      </div>
    </main>
  );
}
