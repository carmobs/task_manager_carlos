import { FiClipboard, FiUserPlus, FiLogIn } from "react-icons/fi";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <FiClipboard className="text-5xl text-orange-500" />
          <h1 className="text-5xl font-extrabold text-orange-600">Task Manager</h1>
        </div>
        <p className="text-lg text-gray-700 mb-8">
          Organize your tasks efficiently and stay productive with our simple and intuitive task management app.
        </p>
      </div>
      <div className="flex gap-6">
        <a
          href="/register"
          className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
        >
          <FiUserPlus />
          Get Started
        </a>
        <a
          href="/login"
          className="flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
        >
          <FiLogIn />
          Login
        </a>
      </div>
    </div>
  );
}
