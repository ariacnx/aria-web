import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import { ExternalLink, Bookmark, Hand, Share2 } from "lucide-react";
import cleanEatDemoVideo from "@/assets/eat-recipe-app/clean eat demo.mov";
import bannerVideo from "@/assets/eat-recipe-app/u9151188686_use_the_same_colour_and_Japanese_style_line_drawi_bf70eed6-c66d-468a-879e-26811c731233_3.mp4";

const APP_URL = "https://clean-eats-5xwr-five.vercel.app/";

// Fallback when no GIF in assets
const FALLBACK_GIF =
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80";

// Load GIF from src/assets/eat-recipe-app/
const eatRecipeGifs = import.meta.glob<{ default: string }>(
  "../assets/eat-recipe-app/*.{gif,GIF}",
  { eager: true }
);
const gifEntry = Object.entries(eatRecipeGifs).map(([, mod]) => mod.default)[0];

const EatRecipeApp = () => {
  return (
    <div className="min-h-screen w-full">
      <PortfolioSidebar />

      <main className="lg:ml-80 min-h-screen">
        {/* ========== VERSION A: Stripe above title (current) ========== */}
        <div className="relative overflow-hidden h-[200px] w-full">
          <video
            src={bannerVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden
          />
        </div>
        <header className="pt-12 pb-10 px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-primary leading-tight mb-6">
              Forkcasts
            </h1>
            <p className="font-serif text-base md:text-lg text-muted-foreground leading-relaxed">
              Home Cooking, Curated
            </p>
          </div>
        </header>

        {/* ========== VERSION B: Video behind title (previous) — comment out Version A and uncomment below to use ========== */}
        {/* <header className="relative overflow-hidden min-h-[280px] flex items-center justify-center">
          <video
            src={bannerVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden
          />
          <div className="absolute inset-0 bg-background/60" aria-hidden />
          <div className="relative z-10 pt-16 pb-10 px-8 lg:px-16 text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-primary leading-tight mb-6">
              Forkcasts
            </h1>
            <p className="font-serif text-base md:text-lg text-muted-foreground leading-relaxed">
              Home Cooking, Curated
            </p>
          </div>
        </header> */}

        {/* Intro */}
        <div className="px-8 lg:px-16 pb-10">
          <div className="max-w-2xl mx-auto space-y-4 font-serif text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              Honestly, I'm still not sure what this app should be called, but it started from something simple: I love home cooking. Every time I tweak my recipe a little, it feels like a small creative process worth keeping, revisiting, and building on.
            </p>
            <p>
              So this app became a place to capture those iterations — making home cooking a little more fun, personal, and effortless. Add your recipes, and if you don't upload a photo, the app can generate one for you. During holidays or special moments, you can easily share your menu of the day with friends and family.
            </p>
          </div>
        </div>

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
            <p className="mt-2 text-sm text-muted-foreground font-serif italic">
              iOS app coming soon
            </p>
          </div>

          {/* How it works — three text cards + GIF in one row */}
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-normal text-primary">
              How it works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-lg border border-border/50 bg-card shadow-sm p-6 flex flex-col justify-center min-h-[200px]">
                <h3 className="font-serif text-lg font-medium text-primary mb-2 flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-muted-foreground shrink-0" />
                  Curate
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Save your unique recipes
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card shadow-sm p-6 flex flex-col justify-center min-h-[200px]">
                <h3 className="font-serif text-lg font-medium text-primary mb-2 flex items-center gap-2">
                  <Hand className="h-5 w-5 text-muted-foreground shrink-0" />
                  Swipe
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Decide what to eat
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-muted/30 shadow-sm overflow-hidden min-h-[200px]">
                <img
                  src={gifEntry ?? FALLBACK_GIF}
                  alt="Forkcasts in action"
                  className="w-full h-full min-h-[200px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-lg border border-border/50 bg-card shadow-sm p-6 flex flex-col justify-center min-h-[200px]">
                <h3 className="font-serif text-lg font-medium text-primary mb-2 flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-muted-foreground shrink-0" />
                  Share
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Invite others to the table
                </p>
              </div>
            </div>
          </div>

          {/* Video demo */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-normal text-primary">
              Video demo
            </h2>
            <div className="relative overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-sm aspect-video min-h-[240px]">
              <video
                src={cleanEatDemoVideo}
                controls
                playsInline
                className="w-full h-full object-cover"
                poster=""
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EatRecipeApp;
