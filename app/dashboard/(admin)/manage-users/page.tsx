
import { authOptions } from "@/app/lib/AuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ManageUsers = async () => {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div>
      <h1 className='text-xxl text-white'>Manage Users</h1>

    </div>
  );
};

export default ManageUsers;
