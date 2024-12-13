import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getALlUsers } from "@/lib/actions/user.action";

const Page = async () => {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") return redirect("/");

  const users = await getALlUsers();

  return (
    <div className="flex size-full flex-wrap gap-10 p-4">
      {users.map((user) => (
        <Link href={`/profile/${user.id}`} key={user.id}>
          {user.name}
        </Link>
      ))}
    </div>
  );
};

export default Page;
