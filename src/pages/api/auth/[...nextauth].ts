import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import UserService from "@/service/user/User";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }: any) {
      const userApi = new UserService();
      userApi.postUser(user);
      return true;
    },
  },
};

export default NextAuth(authOptions);
