"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessCode }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to dashboard on successful authentication
        router.push("/dashboard");
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Single Card Container */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* CRICHOW Branding */}
          <div className="text-center mb-8">
            <Link href="/" className="font-anton text-3xl inline-block mb-4">
              <span className="text-mtaka-green">CRI</span>
              <span className="text-practical-orange">CHOW</span>
            </Link>
            
            {/* Dashboard Access Title */}
            <h1 className="font-anton text-2xl text-dark-gray">
              Dashboard Access
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="accessCode" 
                className="block text-sm font-medium text-gray-700 mb-2 font-poppins"
              >
                Access Code
              </label>
              <input
                id="accessCode"
                name="accessCode"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-mtaka-green focus:border-mtaka-green focus:z-10 sm:text-sm font-poppins"
                placeholder="Enter your access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                disabled={isLoading}
              />
              
              {/* Error Message Display Space */}
              <div className="mt-2 min-h-[20px]">
                {error && (
                  <p className="text-sm text-red-600 font-poppins">
                    {error}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading || !accessCode.trim()}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-mtaka-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mtaka-green disabled:opacity-50 disabled:cursor-not-allowed font-anton transition-colors duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </div>
                ) : (
                  "Enter"
                )}
              </button>
            </div>

            {/* Back to Home Link */}
            <div className="text-center">
              <Link
                href="/"
                className="font-medium text-mtaka-green hover:text-green-700 transition-colors font-poppins text-sm"
              >
                ← Back to home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}