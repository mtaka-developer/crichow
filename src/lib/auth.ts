import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// JWT payload interface
export interface JwtPayload {
  accessCode: string;
  iat: number;
  exp: number;
}

// Valid access codes
const VALID_ACCESS_CODES = ["MTK-2025-VIZ", "PA-DATA-HUB"];

// Session configuration
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this-in-production";
const JWT_SESSION_KEY = "crichow-session";

if (!process.env.JWT_SECRET) {
  console.warn("JWT_SECRET not set in environment variables. Using default secret (not recommended for production)");
}

const encodedKey = new TextEncoder().encode(JWT_SECRET);

/**
 * Validate access code against allowed codes
 */
export function validateAccessCode(accessCode: string): boolean {
  return VALID_ACCESS_CODES.includes(accessCode);
}

/**
 * Sign a JWT token with the access code
 */
export async function signJWT(payload: { accessCode: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // 7 days
    .sign(encodedKey);
}

/**
 * Verify and decrypt a JWT token
 */
export async function verifyJWT(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    
    // Validate that the payload has the required fields
    if (typeof payload.accessCode === 'string' && typeof payload.iat === 'number' && typeof payload.exp === 'number') {
      return {
        accessCode: payload.accessCode,
        iat: payload.iat,
        exp: payload.exp,
      };
    }
    
    return null;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

/**
 * Save session cookie
 */
export async function saveSession(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(JWT_SESSION_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    path: "/",
  });
}

/**
 * Get session from cookies
 */
export async function getSession(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(JWT_SESSION_KEY);
  
  if (!sessionCookie?.value) {
    return null;
  }

  return verifyJWT(sessionCookie.value);
}

/**
 * Clear session cookie
 */
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(JWT_SESSION_KEY);
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}