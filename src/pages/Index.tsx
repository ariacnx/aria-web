import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import { PhotoGallery } from "@/components/PhotoGallery";

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      {/* Sidebar Navigation - Fixed */}
      <PortfolioSidebar />

      {/* Main Content - Offset for sidebar */}
      <main className="lg:ml-80 min-h-screen">
        {/* Hero Section */}
        <header className="pt-16 pb-10 px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-primary leading-tight mb-6">
              Take pictures of ordinary things with special eyes
            </h2>
            <p className="font-serif text-base md:text-lg text-muted-foreground leading-relaxed">
              I take pictures of ordinary things in our daily lives that flow inadvertently.
              <br />
              I hope our lives are always like movies.
            </p>
          </div>
        </header>

        {/* Photo Gallery */}
        <section className="px-4 lg:px-8 pb-16">
          <PhotoGallery />
        </section>
      </main>
    </div>
  );
};

export default Index;
