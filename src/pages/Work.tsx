import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import { ExternalLink } from "lucide-react";
import geminiIcon from "@/assets/icons/gemini-icon.png";

const GOOGLE_URL = "https://www.google.com/";
const GEMINI_URL = "https://gemini.google.com/";

const highlights = [
  {
    title: "Gemini · Dev Agent",
    desc: "I launch Gemini and build developer agents that help people ship faster—focusing on clear UX and reliable flows.",
  },
  {
    title: "Product thinking",
    desc: "I like crisp information architecture, minimal UI, and details that feel calm (spacing, type, motion).",
  },
  {
    title: "Execution",
    desc: "From prototype → polished UI. I iterate quickly, test assumptions, and keep the experience simple.",
  },
];

const projects = [
  {
    title: "Omnihealth — Screening",
    tag: "Product page + gallery",
    to: "/omnihealth",
    note: "A product-style case study page with screenshots + upload.",
  },
  {
    title: "EAT — Recipe App",
    tag: "Case study",
    to: "/eat-recipe-app",
    note: "A clean product page format for showcasing an app.",
  },
  {
    title: "Model photos",
    tag: "Gallery",
    to: "/model-photos",
    note: "Auto-loaded images from `src/assets/model/`.",
  },
];

const WorkPage = () => {
  return (
    <div className="min-h-screen w-full">
      <PortfolioSidebar />

      <main className="lg:ml-80 min-h-screen bg-muted/20">
        <header className="pt-16 pb-10 px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
              Welcome to my story
            </p>
            <div className="flex items-center justify-center mb-5">
              <img
                src={geminiIcon}
                alt="Gemini icon"
                className="h-10 w-10"
                loading="eager"
              />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-primary leading-tight">
              Hi, I’m Aria.
            </h1>
            <p className="font-serif text-base md:text-lg text-muted-foreground leading-relaxed mt-5 max-w-2xl mx-auto">
              I work at Google. I launch Gemini, develop agents, and build calm,
              clean product experiences.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={GEMINI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-serif text-sm text-primary hover:text-primary/80 transition-colors group"
              >
                <img
                  src={geminiIcon}
                  alt=""
                  className="h-4 w-4"
                  aria-hidden="true"
                />
                <span>Gemini</span>
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <span className="hidden sm:block text-muted-foreground/60">·</span>
              <a
                href={GOOGLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-serif text-sm text-primary hover:text-primary/80 transition-colors group"
              >
                <span>Google</span>
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </header>

        <section className="px-4 lg:px-8 pb-16 max-w-4xl mx-auto space-y-16">
          {/* Editorial “about” block */}
          <div className="rounded-lg border border-border/50 bg-background/60 backdrop-blur-sm shadow-sm p-7 sm:p-10">
            <h2 className="font-serif text-xl font-normal text-primary mb-4">
              What I’m into
            </h2>
            <p className="font-serif text-muted-foreground leading-relaxed">
              Minimal interfaces, thoughtful typography, and experiences that
              feel like a quiet conversation. I like to keep pages airy and
              structured: a clear headline, a few honest sections, and visuals
              that do the talking.
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-normal text-primary">
              Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="rounded-lg border border-border/50 bg-muted/30 shadow-sm p-6"
                >
                  <h3 className="font-serif text-lg text-primary mb-2">
                    {h.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Work / projects */}
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-normal text-primary">
              Work
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {projects.map((p) => (
                <a
                  key={p.title}
                  href={p.to}
                  className="group rounded-lg border border-border/50 bg-background/60 backdrop-blur-sm shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">
                        {p.tag}
                      </p>
                      <h3 className="font-serif text-lg text-primary mt-1">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        {p.note}
                      </p>
                    </div>
                    <span className="text-muted-foreground transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="rounded-lg border border-border/50 bg-muted/30 shadow-sm p-7 sm:p-10 text-center">
            <h2 className="font-serif text-xl font-normal text-primary mb-2">
              Let’s chat
            </h2>
            <p className="font-serif text-muted-foreground leading-relaxed">
              If you’re interested in my work, feel free to reach out.
            </p>
            <a
              href="/contact"
              className="inline-flex mt-5 font-serif text-sm text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
              Contact
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WorkPage;

