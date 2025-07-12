
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { authOptions } from "../lib/AuthOptions";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const role = session.user.role;

  if (role === "admin") redirect("/dashboard/admin");
  if (role === "user") redirect("/dashboard/user");
  if (role === "vendor") redirect("/dashboard/vendor");

  return <p>Redirecting...</p>;
}
