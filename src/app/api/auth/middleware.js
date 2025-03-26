import { NextResponse } from "next/server";
import { verifyToken } from "../../lib/jwt";

export async function middleware(req) {
  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.json(
      { message: "Authentication required" },
      { status: 401 }
    );
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }

  return NextResponse.next();
}
