/* eslint-disable no-unused-vars */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role?: string; // Kullanıcı rolü (opsiyonel)
    email: string; // Kullanıcının e-posta adresi
    name: string; // Kullanıcının adı
    image: string; // Kullanıcının profil resmi
  }

  interface Session {
    user: {
      id: string;
      role?: string; // Oturumdaki rol bilgisi (opsiyonel)
      email: string; // Oturumdaki e-posta bilgisi
      name: string; // Oturumdaki kullanıcı adı
      image: string; // Oturumdaki profil resmi
    };
  }

  interface JWT {
    id: string;
    role?: string; // Token'daki rol bilgisi (opsiyonel)
    email: string; // Token'daki e-posta bilgisi
    name: string; // Token'daki kullanıcı adı
    image: string; // Token'daki profil resmi
  }
}
