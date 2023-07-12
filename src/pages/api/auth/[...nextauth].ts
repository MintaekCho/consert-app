import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import UserService from "@/service/user/User";
import { getSession } from "next-auth/react";

const userApi = new UserService();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: any }) {
      await userApi.postUser(user);
      return true;
    },
    async session({ session }: { session: any }) {
      // Send properties to the client, like an access_token and user id from a provider.
      const res = await userApi.getUser(session.user.email);
      session.user.id = res.data._id;
      session.user.displayName = res.data.displayName;

      return session;
    },

    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Allows relative callback URLs
      return `${baseUrl}/logincheck`;
    },
  },
};

export default NextAuth(authOptions);
