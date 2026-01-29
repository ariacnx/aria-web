import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import { ExternalLink } from "lucide-react";

const APP_URL = "https://clean-eats-5xwr-five.vercel.app/";

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

        <section className="px-4 lg:px-8 pb-16 max-w-3xl mx-auto space-y-12">
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

          {/* Video demo placeholder — add your video later */}
          <div className="border border-border/50 rounded-sm bg-muted/30 aspect-video flex items-center justify-center min-h-[240px]">
            <p className="font-serif text-muted-foreground text-center px-4">
              Video demo coming soon
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EatRecipeApp;
