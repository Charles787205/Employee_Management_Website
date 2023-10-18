"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BuiltInProviderType } from "next-auth/providers/index";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
const Nav = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const { data: session } = useSession();

  return (
    <nav>
      {session?.user && (
        <div
          className="signout_button"
          onClick={() => {
            signOut();
          }}
        >
          <Image
            src={session?.user.image!}
            width={25}
            height={25}
            className="google_picture_icon"
            alt="profile"
          />
          <p>SignOut</p>
        </div>
      )}
    </nav>
  );
};

export default Nav;
