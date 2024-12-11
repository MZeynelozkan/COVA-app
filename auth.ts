import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      // JWT'den kullanıcı kimliğini oturum nesnesine ekleyin
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Oturum açıldığında kullanıcı kimliğini token'a ekleyin
      if (user?.id) {
        token.id = user.id;
      }
      // Daha önceki oturumlar için kimlik atanmışsa, token üzerinde tutmaya devam edin
      return token;
    },
  },
  ...authConfig,
  trustHost: true,
  pages: {
    signIn: "/sign-in", // Yalnızca sign-in sayfası özelleştiriliyorsa, burada belirtin
  },
});
