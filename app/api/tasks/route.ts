import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title } = await req.json();

    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Invalid task title" }, { status: 400 });
    }

    const task = await prisma.task.create({
      data: {
        title,
        user: {
          connect: { email: session.user.email },
        },
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("id");

    if (!taskId) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    const task = await prisma.task.deleteMany({
      where: {
        id: parseInt(taskId),
        user: { email: session.user.email },
      },
    });

    if (task.count === 0) {
      return NextResponse.json({ error: "Task not found or not authorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      console.error("Unauthorized access: No session or email");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("id");

    if (!taskId) {
      console.error("Task ID is missing");
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    const task = await prisma.task.findUnique({
      where: {
        id: parseInt(taskId),
      },
      include: {
        user: true, // Ensure the user relationship is included
      },
    });

    if (!task) {
      console.error(`Task with ID ${taskId} not found`);
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (task.user.email !== session.user.email) {
      console.error("Unauthorized access: Task does not belong to the user");
      return NextResponse.json({ error: "Task not found or not authorized" }, { status: 403 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("id");

    if (!taskId) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    const { title } = await req.json();

    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Invalid task title" }, { status: 400 });
    }

    const task = await prisma.task.updateMany({
      where: {
        id: parseInt(taskId),
        user: { email: session.user.email },
      },
      data: { title },
    });

    if (task.count === 0) {
      return NextResponse.json({ error: "Task not found or not authorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
