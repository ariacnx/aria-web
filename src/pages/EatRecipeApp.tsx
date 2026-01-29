import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import { ExternalLink } from "lucide-react";

const APP_URL = "https://clean-eats-5xwr-five.vercel.app/";

// Product demo images — replace with your own app screenshots when ready
const DEMO_IMAGES = {
  hero: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80",
  screens: [
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
  ],
};

const EatRecipeApp = () => {
  return (
    <div className="min-h-screen w-full">
      <PortfolioSidebar />

      <main className="lg:ml-80 min-h-screen">
        <header className="pt-16 pb-10 px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-primary leading-tight mb-6">
              EAT — Recipe App
            </h1>
            <p className="font-serif text-base md:text-lg text-muted-foreground leading-relaxed">
              Clean Eats · Menu Randomizer. Pick what to cook without the guesswork.
            </p>
          </div>
        </header>

        <section className="px-4 lg:px-8 pb-16 max-w-4xl mx-auto space-y-16">
          <div>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-serif text-lg text-primary hover:text-primary/80 transition-colors group"
            >
              <span>Open app</span>
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="mt-1 text-sm text-muted-foreground">
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="underline break-all">
                {APP_URL}
              </a>
            </p>
          </div>

          {/* Hero product image */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-normal text-primary">
              See it in action
            </h2>
            <div className="relative overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-sm">
              <img
                src={DEMO_IMAGES.hero}
                alt="Clean Eats — recipe and menu randomizer in use"
                className="w-full aspect-[16/10] object-cover"
                loading="eager"
              />
            </div>
          </div>

          {/* Product screenshot grid */}
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-normal text-primary">
              How it works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {DEMO_IMAGES.screens.map((src, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-sm ring-0 ring-border/20 transition-shadow hover:shadow-md hover:ring-1"
                >
                  <img
                    src={src}
                    alt={`Clean Eats feature ${i + 1}`}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Video demo placeholder — add your video later */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-normal text-primary">
              Video demo
            </h2>
            <div className="border border-border/50 rounded-lg bg-muted/30 aspect-video flex items-center justify-center min-h-[240px] shadow-sm">
              <p className="font-serif text-muted-foreground text-center px-4">
                Video demo coming soon
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EatRecipeApp;
