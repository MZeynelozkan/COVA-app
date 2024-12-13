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
      if (token?.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Oturum açıldığında kullanıcı kimliğini token'a ekleyin
      if (user?.id) {
        token.id = user.id;
      }
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      if (!account) {
        return false; // Eğer account null ise giriş başarısız olur
      }

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! },
      });

      if (existingUser) {
        const existingAccount = await prisma.account.findFirst({
          where: {
            userId: existingUser.id,
            provider: account.provider,
          },
        });

        if (!existingAccount) {
          // OAuth sağlayıcısı mevcut değilse bağla
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
            },
          });
        }
        return true;
      }
      return true; // Yeni bir kullanıcıysa girişe izin ver
    },
  },
  ...authConfig,
  trustHost: true,
  pages: {
    signIn: "/sign-in", // Yalnızca sign-in sayfası özelleştiriliyorsa, burada belirtin
  },
});
