import "@/styles/globals.css";
import type { Metadata } from "next";
import { Nav, Provider } from "@/components";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body>
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  );
}
