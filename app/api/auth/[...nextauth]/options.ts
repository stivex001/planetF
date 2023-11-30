import { http } from "@/service/http";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const user = await http.httpLoginUser({ email, password });
          if (user) {
            return {
              ...user.user,
              accessToken: user.token,
            };
          }
        } catch (error: any) {
          console.log(error?.response?.data?.error);
          // @ts-ignore
          // throw("Error")
          // return {error: error?.response?.data};
        }
      },
    }),
  ],
  // callbacks: {
  //   async session({ session, token }) {
  //     return {
  //       ...session,
  //       ...token,
  //     };
  //   },
  //   async jwt({ token, user, session }) {
  //     return { ...token, ...user, ...session };
  //   },
  // },
};
