import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
}

interface NavCategory {
  category: string;
  items: NavItem[];
}

const navigation: NavCategory[] = [
  {
    category: "Photography",
    items: [
      { title: "Street Stories", href: "#street" },
      { title: "Portraits", href: "#portraits" },
      { title: "Nature", href: "#nature" },
      { title: "Architecture", href: "#architecture" },
    ],
  },
  {
    category: "Journey",
    items: [
      { title: "Tokyo", href: "#tokyo" },
      { title: "Melbourne", href: "#melbourne" },
      { title: "Seoul", href: "#seoul" },
    ],
  },
];

export function PortfolioSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-6 left-6 z-50 lg:hidden p-2 hover:bg-secondary rounded-sm transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-background z-50 
          transform transition-transform duration-300 ease-out
          lg:translate-x-0 lg:static lg:z-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          border-r border-border/50
        `}
      >
        <div className="h-full overflow-y-auto py-12 px-8">
          {/* Close button for mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6 lg:hidden p-2 hover:bg-secondary rounded-sm transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Logo / Name */}
          <Link to="/" className="block mb-12">
            <h1 className="font-serif text-xl font-semibold tracking-wide uppercase">
              Your Name
            </h1>
          </Link>

          {/* Welcome Link */}
          <Link
            to="/"
            className="block nav-link mb-8 font-medium text-foreground"
          >
            Welcome to my story
          </Link>

          {/* Navigation Categories */}
          <nav className="space-y-8">
            {navigation.map((category) => (
              <div key={category.category}>
                <h2 className="nav-category">{category.category}</h2>
                <ul className="space-y-2 ml-0">
                  {category.items.map((item) => (
                    <li key={item.title}>
                      <a
                        href={item.href}
                        className="nav-link block py-1"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Contact Link */}
          <div className="mt-12">
            <Link
              to="/contact"
              className="nav-category block hover:text-nav-hover transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
