import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  to?: string;
};

const snapPhotography: NavItem[] = [
  { label: "Cheer Me Up", to: "/cheer-me-up" },
  { label: "Clean Eat — the recipe app", to: "/eat-recipe-app" },
  { label: "Omnihealth — Take your screening test", to: "/omnihealth" },
  { label: "WIP", to: "/wip" },
];

const RandomInterests = [
  "My reading and podcast list",
];

export function PortfolioSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-6 left-6 z-50 lg:hidden p-2 hover:bg-secondary rounded-sm transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-80 bg-background z-50 
          transform transition-transform duration-300 ease-out
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          border-r border-border/30
          overflow-y-auto
        `}
      >
        <div className="py-8 px-10">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6 lg:hidden p-2 hover:bg-secondary rounded-sm transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>

          <Link to="/" className="block mb-10">
            <h1 className="font-serif text-2xl font-semibold tracking-wide text-primary">
              ARIA CHEN
            </h1>
          </Link>

          <nav className="space-y-6">
            <a
              href="#"
              className="block text-sm font-semibold text-primary hover:text-nav-hover transition-colors"
            >
              Welcome :) lets chat if you are interested in my work
            </a>

            <Link
              to="/work"
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              My work
            </Link>

            <div>
              <h2 className="text-sm font-semibold text-primary mb-3">
                I Make Apps
              </h2>
              <ul className="space-y-2">
                {snapPhotography.map((item) => {
                  const content = (
                    <span className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item.label}
                    </span>
                  );
                  return (
                    <li key={item.label}>
                      {item.to ? (
                        <Link to={item.to} onClick={() => setMobileOpen(false)}>
                          {content}
                        </Link>
                      ) : (
                        <a href="#" onClick={() => setMobileOpen(false)}>
                          {content}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-primary mb-3">
                Random
              </h2>
              <ul className="space-y-2">
                {RandomInterests.map((item) => {
                  const isReadingList = item === "My reading and podcast list";
                  const content = (
                    <span className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item}
                    </span>
                  );
                  return (
                    <li key={item}>
                      {isReadingList ? (
                        <Link to="/reading-list" onClick={() => setMobileOpen(false)}>
                          {content}
                        </Link>
                      ) : (
                        <a href="#" onClick={() => setMobileOpen(false)}>
                          {content}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <Link
              to="/contact"
              className="block text-sm font-semibold text-primary hover:text-nav-hover transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}
