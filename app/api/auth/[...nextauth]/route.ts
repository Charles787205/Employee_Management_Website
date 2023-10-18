import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { employee } from "@/types";
const getUserByEmail: (email: string) => Promise<employee> = async function (
  email
) {
  const response = await axios.get(
    "http://localhost/EmployeeManagementsystem/index.php/employee/list",
    {
      params: {
        email: email,
      },
    }
  );
  const user: employee = response.data[0];
  return user;
};
const updateEmployeeImage = async (employee: employee) => {
  const response = await axios.post(
    "http://localhost/EmployeeManagementsystem/index.php/employee/image",
    {
      image: employee.image,
      id: employee.id,
    }
  );
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await getUserByEmail(session.user?.email!);
      sessionUser.image = session.user?.image!;
      updateEmployeeImage(sessionUser);
      return session;
    },
    async signIn({ profile }) {
      try {
        const user = await getUserByEmail(profile?.email!);

        console.log(user);
        if (!user.id) {
          throw new Error("User does not exist");
        } else {
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
