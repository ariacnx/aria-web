import { Suspense } from "react";
import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import FallingPineNeedles from "@/components/FallingPineNeedles";
import CrystalOrb from "@/components/CrystalOrb";
import { ExternalLink } from "lucide-react";

const APP_URL = "https://github.com/ariacnx/grove";
const REPO_URL = "https://github.com/ariacnx/grove";

// Fallback images
const FALLBACK_IMAGES = {
  hero: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
  screens: [
    "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80",
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&q=80",
    "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=600&q=80",
  ],
};

// Load screenshots from src/assets/grove/
const cheerModules = import.meta.glob<{ default: string }>(
  "../assets/grove/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true }
);

const entries = Object.entries(cheerModules)
  .map(([path, mod]) => ({ path, url: mod.default }))
  .sort((a, b) => a.path.localeCompare(b.path));

const heroUrl = entries[0]?.url ?? FALLBACK_IMAGES.hero;
const screenUrls =
  entries.length > 1
    ? entries.slice(1, 4).map((e) => e.url)
    : FALLBACK_IMAGES.screens;

const DEMO_IMAGES = { hero: heroUrl, screens: screenUrls };

const CheerMeUpApp = () => {
  return (
    <div className="min-h-screen w-full relative">
      <PortfolioSidebar />
      <FallingPineNeedles />

      <main className="lg:ml-80 min-h-screen relative z-10">
        <header className="pt-16 pb-10 px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-primary leading-tight mb-6">
              Grove
            </h1>
            <p className="font-serif text-base md:text-lg text-muted-foreground leading-relaxed">
              AI-powered meditation & comfort sessions. Generative pine visuals, 
              personalized audio by Gemini TTS.
            </p>
          </div>
        </header>

        <section className="px-4 lg:px-8 pb-16 max-w-4xl mx-auto space-y-16">
          {/* Links */}
          <div className="flex flex-wrap gap-6">
            <div>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-serif text-lg text-primary hover:text-primary/80 transition-colors group"
              >
                <span>View on GitHub</span>
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="mt-1 text-sm text-muted-foreground">
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="underline break-all">
                  {APP_URL}
                </a>
              </p>
            </div>
            <div>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-serif text-lg text-primary hover:text-primary/80 transition-colors group"
              >
                <span>Source code</span>
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-normal text-primary">
              About
            </h2>
            <div className="font-serif text-base text-muted-foreground leading-relaxed space-y-3">
              <p>
                A wellness app that creates personalized audio meditation and encouragement sessions 
                based on how you're feeling. Two modes: gentle meditative comfort, or raw tough love.
              </p>
              <p>
                The visual language draws from Ruth Asawa's organic wire sculptures — generative 
                pine branches on the intro screen flow into a Three.js crystal orb with pine inside, 
                creating a cohesive botanical world.
              </p>
            </div>
          </div>

          {/* Tech */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-normal text-primary">
              Built with
            </h2>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "Three.js", "Framer Motion", "Gemini TTS", "Gemini 2.5 Pro", "Tailwind CSS", "TypeScript"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full text-sm font-serif border border-border/50 text-muted-foreground bg-muted/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Crystal Orb Trio */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-normal text-primary">
              The Orbs
            </h2>
            <div className="flex justify-center items-center gap-16" style={{ minHeight: 260 }}>
              <Suspense fallback={<div className="w-[200px] h-[200px] rounded-full bg-muted/50 animate-pulse" />}>
                <div className="border-0" style={{ width: 200, height: 200 }}><CrystalOrb size={200} pineColor="#3e5a3a" sheenColor="#a5d6a7" /></div>
              </Suspense>
              <Suspense fallback={<div className="w-[200px] h-[200px] rounded-full bg-muted/50 animate-pulse" />}>
                <div className="border-0" style={{ width: 200, height: 200 }}><CrystalOrb size={200} pineColor="#5c4a2a" sheenColor="#c4a97d" /></div>
              </Suspense>
              <Suspense fallback={<div className="w-[200px] h-[200px] rounded-full bg-muted/50 animate-pulse" />}>
                <div className="border-0" style={{ width: 200, height: 200 }}><CrystalOrb size={200} pineColor="#4a5a4a" sheenColor="#ffffff" /></div>
              </Suspense>
            </div>
          </div>

          {/* Live app embed */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-normal text-primary">
              Try it
            </h2>
            <div className="flex justify-center">
              <div className="relative w-[375px] h-[812px] rounded-[40px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)] border-[8px] border-white">
                <iframe
                  src="https://cheer-me-up-ariacnxs-projects.vercel.app"
                  className="w-full h-full border-none"
                  title="Grove — live demo"
                  allow="microphone"
                />
              </div>
            </div>
          </div>

          {/* Screenshots grid */}
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
                    alt={`Grove feature ${i + 1}`}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Video demo placeholder */}
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

export default CheerMeUpApp;
