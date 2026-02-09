import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import { Sparkles, Clock } from "lucide-react";

const wipProjects = [
  {
    title: "Meditation App",
    description: "A calm, focused space for daily mindfulness practice",
    status: "In development",
    gradient: "from-slate-200/40 to-slate-100/25",
    borderColor: "border-slate-300/40",
  },
  {
    title: "RSS App",
    description: "Navigate in noise. Clean feed reader for staying updated",
    status: "In development",
    gradient: "from-amber-200/40 to-yellow-100/25",
    borderColor: "border-amber-300/40",
  },
  {
    title: "Social Media Post App",
    description: "An AI tool for creating and scheduling content",
    status: "In development",
    gradient: "from-green-400/25 to-green-300/15",
    borderColor: "border-green-400/30",
  },
];

const WIPPage = () => {
  return (
    <div className="min-h-screen w-full">
      <PortfolioSidebar />

      <main className="lg:ml-80 min-h-screen bg-muted/20">
        <header className="pt-16 pb-10 px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-primary leading-tight mb-6">
              Work in Progress
            </h1>
            <p className="font-serif text-base md:text-lg text-muted-foreground leading-relaxed">
              Projects I'm currently building. Coming soon.
            </p>
          </div>
        </header>

        <section className="px-4 lg:px-8 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wipProjects.map((project, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-lg border ${project.borderColor} bg-gradient-to-br ${project.gradient} shadow-sm hover:shadow-md transition-all duration-300 min-h-[280px] flex flex-col`}
                >
                  {/* Main content */}
                  <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
                    <div className="mb-4 p-4 rounded-full bg-background/40 backdrop-blur-sm">
                      <Sparkles className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-serif text-xl font-normal text-primary mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{project.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state message */}
            <div className="mt-12 text-center py-12 border border-dashed border-border rounded-lg">
              <p className="font-serif text-muted-foreground mb-2">
                More projects coming soon
              </p>
              <p className="text-sm text-muted-foreground">
                Check back later for updates
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WIPPage;
