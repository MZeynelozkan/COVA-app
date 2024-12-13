import React from "react";

import SignIn from "@/components/auth/SignIn";
import SignInGoogle from "@/components/auth/SignInGoogle";

const Page = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
      <SignIn />
      <SignInGoogle />
    </div>
  );
};

export default Page;
