import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@utils/database";
import User from "@models/user";

// console.table({
//   GOOGLE_ID: process.env.GOOGLE_ID,
//   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
//   MONGODB_URI: process.env.MONGODB_DB_URI,
//   MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
// });
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();

        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          await User.create({
            email: profile.email,
            userName: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile.image,
          });
        }
        return true;
      } catch (err) {
        console.log("=> error connecting to database: ", err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
