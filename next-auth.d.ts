import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
    } & DefaultSession["user"];
  }

  interface Profile extends DefaultSession["user"] {
    picture?: string;
  }
}
