
import { Link } from "react-router-dom";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <nav className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex gap-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Campaign Manager
            </Link>
            <Link
              to="/product-timeline"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Product Timeline
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-6 animate-fade-in">
        {children}
      </main>
    </div>
  );
};
