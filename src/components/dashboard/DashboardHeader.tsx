"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

// --- Types ---
interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

// --- Icons ---
const HomeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 22V12h6v10"
    />
  </svg>
);

const WasteAnalysisIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </svg>
);

const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

const LightbulbIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// --- Navigation Data ---
const navigation: NavigationItem[] = [
  { name: "Summary", href: "/dashboard", icon: HomeIcon },
  {
    name: "Dry Waste Analysis",
    href: "/dashboard/dry-waste-analysis",
    icon: WasteAnalysisIcon,
  },
  {
    name: "Cumulative Group Data",
    href: "/dashboard/cumulative-group-data",
    icon: TrendingUpIcon,
  },
  {
    name: "Extrapolation",
    href: "/dashboard/extrapolation",
    icon: LightbulbIcon,
  },
];

export default function DashboardHeader() {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed");
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    } finally {
      setIsLoggingOut(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="w-full fixed top-2 left-1/2 transform -translate-x-1/2 z-50 bg-white/95 backdrop-blur-sm shadow-sm border border-gray-200 rounded-2xl">
      <div className="flex sm:h-17 h-14 justify-between items-center sm:px-6 px-2 min-w-full">
        {/* Logo/Brand Area */}
        <div className="flex flex-col items-center">
          <div className="text-2xl font-anton">
            <span className="text-mtaka-green">CRI</span>
            <span className="text-practical-orange">CHOW</span>
          </div>

          <span className="sm:inline hidden text-xs text-gray-500">
            Dashboard
          </span>
        </div>

        {/* Desktop Navigation Tabs (Hidden on mobile) */}
        <div className="hidden sm:flex items-center bg-gray-100 rounded-full p-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-full transition-colors duration-150 ${
                  isActive
                    ? "bg-mtaka-green text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-4 w-4 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
                <span className="font-poppins">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Desktop Header Actions (Hidden on mobile) */}
        <div className="hidden sm:flex items-center space-x-4">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-green-600 transition-colors font-poppins"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Site
            <svg
              className="w-4 h-4 ml-1 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-poppins"
          >
            {isLoggingOut ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging out...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </>
            )}
          </button>
        </div>

        {/* Mobile Menu Button (Hidden on desktop) */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-mtaka-green rounded-md"
          >
            {isMenuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Conditional rendering) */}
      <div
        className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-2 border-t border-gray-200">
          <nav className="flex flex-col space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === item.href
                    ? "bg-mtaka-green text-white"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    pathname === item.href ? "text-white" : "text-gray-400"
                  }`}
                />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging out...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}