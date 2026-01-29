import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const snapPhotography = [
  "EAT - RECIPE APP",
  "Take your cancer screening testts plz",
  "Fashion snap",
  "Chalkak.wedding - Seoul",
  "Korea snap",
  "Chalkak.wedding - Jeju",
  "Pet snap",
  "Chalkak.wedding - Melbourne",
  "Chalkak.wedding - Busan",
];

const RandomInterests = [
  "My reading list",
  "My music list",
  "My movie list",
  "My travel list",
  "My food list",
  "My drink list",
  "My ice cream list",
  "My art list",
  "My wake up list",
  "My dream list -> yangkehan",
  "I model a bit",
];

const journey = [
  "Tokyo",
  "Melbourne",
  "They, or our love",
  "1000 people of Melbourne",
  "Become part of nature",
  "The story of the city",
  "Lost time and",
];

export function PortfolioSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
          fixed top-0 left-0 h-screen w-80 bg-background z-50 
          transform transition-transform duration-300 ease-out
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          border-r border-border/30
          overflow-y-auto
        `}
      >
        <div className="py-8 px-10">
          {/* Close button for mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6 lg:hidden p-2 hover:bg-secondary rounded-sm transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Logo / Name */}
          <Link to="/" className="block mb-10">
            <h1 className="font-serif text-2xl font-semibold tracking-wide text-primary">
              ARIA CHEN
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="space-y-6">
            {/* Welcome Link */}
            <a
              href="#"
              className="block text-sm font-semibold text-primary hover:text-nav-hover transition-colors"
            >
              Welcome :) lets chat if you are interested in my work
            </a>

            {/* I Make Apps Section */}
            <div>
              <h2 className="text-sm font-semibold text-primary mb-3">
                I Make Apps
              </h2>
              <ul className="space-y-2">
                {snapPhotography.map((item) => {
                  const isEatRecipe = item === "EAT - RECIPE APP";
                  const content = (
                    <span className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item}
                    </span>
                  );
                  return (
                    <li key={item}>
                      {isEatRecipe ? (
                        <Link
                          to="/eat-recipe-app"
                          onClick={() => setMobileOpen(false)}
                        >
                          {content}
                        </Link>
                      ) : (
                        <a
                          href="#"
                          onClick={() => setMobileOpen(false)}
                        >
                          {content}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Random Section */}
            <div>
              <h2 className="text-sm font-semibold text-primary mb-3">
                Random
              </h2>
              <ul className="space-y-2">
                {RandomInterests.map((item) => {
                  const isReadingList = item === "My reading list";
                  const isModelPhotos = item === "I model a bit";
                  const content = (
                    <span className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item}
                    </span>
                  );
                  return (
                    <li key={item}>
                      {isReadingList ? (
                        <Link
                          to="/reading-list"
                          onClick={() => setMobileOpen(false)}
                        >
                          {content}
                        </Link>
                      ) : isModelPhotos ? (
                        <Link
                          to="/model-photos"
                          onClick={() => setMobileOpen(false)}
                        >
                          {content}
                        </Link>
                      ) : (
                        <a
                          href="#"
                          onClick={() => setMobileOpen(false)}
                        >
                          {content}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Journey Section */}
            <div>
              <h2 className="text-sm font-semibold text-primary mb-3">
                Journey
              </h2>
              <ul className="space-y-2">
                {journey.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Link */}
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
