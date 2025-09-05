import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h1 className="font-anton text-6xl text-mtaka-green mb-4">404</h1>
        <h2 className="font-anton text-3xl text-dark-gray mb-6">Page Not Found</h2>
        <p className="font-poppins text-lg text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/" className="btn-primary">
          Return Home
        </Link>
      </div>
    </div>
  );
}