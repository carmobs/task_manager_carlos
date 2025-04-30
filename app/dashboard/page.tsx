import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import LogoutButton from "./LogoutButton";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import { FiEdit, FiPlusCircle, FiClipboard } from "react-icons/fi";

const prisma = new PrismaClient();

export default async function Dashboard() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      console.error("No session found");
      redirect("/login");
    }

    if (!session.user?.email) {
      console.error("Session user email is missing");
      redirect("/login");
    }

    const tasks = await prisma.task.findMany({
      where: { user: { email: session.user.email } },
    });

    return (
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-orange-500 text-white py-4 px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FiClipboard className="text-2xl" />
            <h1 className="text-2xl font-bold">Task Manager</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/task/new"
              className="flex items-center gap-2 bg-white text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-100 transition"
            >
              <FiPlusCircle />
              New Task
            </Link>
            <LogoutButton />
          </div>
        </nav>

        {/* Main Content */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">Your Tasks</h2>
          {tasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="bg-white shadow-md rounded-lg p-4 border-l-4 border-orange-500"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {t.title}
                  </h3>
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/task/edit/${t.id}`}
                      className="flex items-center gap-1 text-orange-500 hover:text-orange-600 transition"
                    >
                      <FiEdit />
                      Edit
                    </Link>
                    <DeleteButton taskId={t.id} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No tasks found. Create a new task!</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading dashboard:", error);
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">
          An error occurred while loading the dashboard. Please try again later.
        </p>
      </div>
    );
  }
}
