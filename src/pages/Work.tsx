import { Link } from "react-router-dom";
import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import { ExternalLink, Mail } from "lucide-react";
import geminiIcon from "@/assets/icons/gemini-icon.png";

const GOOGLE_EMAIL = "mailto:ariac@google.com";
const BERKELEY_EMAIL = "mailto:ariachen@berkeley.edu";

const highlights = [
  {
    title: "Vertex AI · Gemini",
    desc: "I launched Gemini 3 pro. Built model launch automation + work on AI infra",
  },
  {
    title: "Vertex AI · Agents",
    desc: "Working on agent MCP servers and agent quality — happy to connect if you share similar interests",
  },
  {
    title: "Skydeck",
    desc: "Built an AI note-taking app using an on-premise model with friends. It ranked Top 100 in the Productivity category shortly after launch.",
    linkInDesc: {
      phrase: "AI note-taking app",
      url: "https://apps.apple.com/us/app/manta-memo/id6502863775",
    },
  },
];

const projects = [
  { title: "Clean Eat — the recipe app", to: "/eat-recipe-app" },
  { title: "Omnihealth — Cancer screening test", to: "/omnihealth" },
  { title: "WIP", to: "/wip" },
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

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={BERKELEY_EMAIL}
                className="inline-flex items-center gap-2 font-serif text-sm text-primary hover:text-primary/80 transition-colors group"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden />
                <span>Cal alum</span>
              </a>
              <span className="hidden sm:block text-muted-foreground/60">·</span>
              <a
                href={GOOGLE_EMAIL}
                className="inline-flex items-center gap-2 font-serif text-sm text-primary hover:text-primary/80 transition-colors group"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden />
                <span>Google</span>
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
              I’m currently working at Google on agent development, quality and AI infra.
            </p>
            <p className="font-serif text-muted-foreground leading-relaxed mt-3">
              On the side, I enjoy bringing fun ideas to life end to end (product + UI +full engineering). ✨
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
                    {"linkInDesc" in h && h.linkInDesc ? (
                      <>
                        {h.desc.split(h.linkInDesc.phrase).map((part, i, arr) =>
                          i < arr.length - 1 ? (
                            <span key={i}>
                              {part}
                              <a
                                href={h.linkInDesc!.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline underline-offset-2 hover:text-primary/80 inline-flex items-center gap-0.5"
                              >
                                {h.linkInDesc!.phrase}
                                <ExternalLink className="h-3 w-3" aria-hidden />
                              </a>
                            </span>
                          ) : (
                            part
                          )
                        )}
                      </>
                    ) : (
                      h.desc
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects — grid */}
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-normal text-primary">
              Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((p) => (
                <Link
                  key={p.title}
                  to={p.to}
                  className="group rounded-lg border border-border/50 bg-background/60 backdrop-blur-sm shadow-sm p-6 hover:shadow-md transition-shadow flex items-center justify-between gap-4"
                >
                  <span className="font-serif text-primary group-hover:text-primary/80 transition-colors">
                    {p.title}
                  </span>
                  <span className="text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
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

