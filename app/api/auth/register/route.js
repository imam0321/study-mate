import { User } from "@/models/user-model";
import { dbConnect } from "@/service/mongo";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Create user api
export const POST = async (request) => {
  try {
    // request value from client side 
    const { firstName, lastName, email, password, userRole } =
      await request.json();

    console.log(firstName, lastName, email, password, userRole);

    await dbConnect();
    // check the user exist or not
    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      return new NextResponse("User already exist", { status: 400 });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: userRole,
    };
    // created user pass the data on database
    await User.create(newUser);
    return new NextResponse("User has been created Successfully", {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
