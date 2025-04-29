import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import { dbConnect } from "@/service/mongo";
import { NextResponse } from "next/server";

// user details api
export const GET = async (request) => {
  const session = await auth();

  if (!session?.user) {
    return NextResponse(`You are not authenticated!`, {
      status: 401,
    });
  }

  try {
    await dbConnect();
    const user = await getUserByEmail(session?.user?.email);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong!" },
      { status: 500 }
    );
  }
};
