import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="font-anton text-2xl">
            <span className="text-mtaka-green">CRICHOW</span>
            <span className="text-practical-orange"> Project</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="nav-link text-dark-gray hover:text-mtaka-green">
              Home
            </a>
            <a href="#about" className="nav-link text-dark-gray hover:text-mtaka-green">
              About
            </a>
            <a href="#objectives" className="nav-link text-dark-gray hover:text-mtaka-green">
              Objectives
            </a>
            <a href="#coverage" className="nav-link text-dark-gray hover:text-mtaka-green">
              Coverage
            </a>
            <a href="#partners" className="nav-link text-dark-gray hover:text-mtaka-green">
              Partners
            </a>
          </nav>

          <Link href="/login" className="btn-primary">
            Access Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}