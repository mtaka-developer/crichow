import { NextRequest, NextResponse } from "next/server";
import { validateAccessCode, signJWT, saveSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { accessCode } = body;

    // Validate input
    if (!accessCode || typeof accessCode !== "string") {
      return NextResponse.json(
        { message: "Access code is required" },
        { status: 400 }
      );
    }

    // Validate access code
    if (!validateAccessCode(accessCode.trim())) {
      return NextResponse.json(
        { message: "Invalid Access Code" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await signJWT({ accessCode: accessCode.trim() });

    // Save session cookie
    await saveSession(token);

    // Return success response
    return NextResponse.json(
      { message: "Authentication successful" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle non-POST requests
export async function GET() {
  return NextResponse.json(
    { message: "Method not allowed" },
    { status: 405 }
  );
}