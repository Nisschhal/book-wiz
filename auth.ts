import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./database/drizzle";
import { users } from "./database/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      async authorize({ email, password }) {
        if (!email || !password) return null;

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email as string))
          .limit(1);

        if (user.length === 0) return null;

        const isPasswordValid = await compare(
          password as string,
          user[0].password,
        );

        if (!isPasswordValid) return null;

        return {
          id: user[0].id.toString(),
          email: user[0].email,
          name: user[0].fullName,
        } as User;

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (!user) return token;
      token.id = user.id;
      token.name = user.name;

      return token;
    },
    async session({ session, token }) {
      if (!session.user) return session;
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      return session;
    },
  },
});
