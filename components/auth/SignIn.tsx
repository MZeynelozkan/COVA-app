"use client";

import { signIn } from "next-auth/react";

import { Button } from "../ui/button";

export default function SignIn() {
  return (
    <Button className="w-[280px]" onClick={() => signIn("github")}>
      Sign-in
    </Button>
  );
}
