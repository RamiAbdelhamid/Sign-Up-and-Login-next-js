import { NextResponse } from "next/server";
import connectDb from "../../lib/dbConnect";
import User from "../../models/User";

connectDb(); // Ensure DB is connected

export async function GET() {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users", error },
      { status: 500 }
    );
  }
}
