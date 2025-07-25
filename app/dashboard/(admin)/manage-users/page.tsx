
import { authOptions } from "@/app/lib/AuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ShowUsers from "./ShowUsers";


const ManageUsers = async () => {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }



  return (
    <div className=" px-4">
      <h1 className="text-2xl font-bold text-white mb-6">Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-700 text-gray-200 text-left">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Created At</th>
              <th className="py-3 px-4">Updated At</th>
            </tr>
          </thead>
         
          <ShowUsers/>
       
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
