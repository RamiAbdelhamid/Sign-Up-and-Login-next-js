import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import connectDb from "../../lib/dbConnect";
import { generateToken } from "../../lib/jwt";

connectDb();

export async function POST(req) {
  const { action, email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and Password are required" },
      { status: 400 }
    );
  }

  if (action === "signup") {
    // Sign Up
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    const token = generateToken(newUser);

    const res = NextResponse.json({
      message: "User created successfully",
      user: newUser,
    });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    return res;
  } else if (action === "login") {
    // Login
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const token = generateToken(user);

    const res = NextResponse.json({ message: "Login successful", user });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    return res;
  }

  return NextResponse.json({ message: "Invalid action" }, { status: 400 });
}
