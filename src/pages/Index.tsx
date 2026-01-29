import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import { PhotoGallery } from "@/components/PhotoGallery";

const Index = () => {
  return (
    <div className="min-h-screen flex w-full">
      {/* Sidebar Navigation */}
      <PortfolioSidebar />

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Hero Section */}
        <header className="pt-20 pb-12 px-6 lg:px-12 lg:pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="headline-serif mb-6">
              Take pictures of ordinary things with special eyes
            </h2>
            <p className="subtitle-serif max-w-2xl mx-auto">
              I capture the quiet poetry of everyday moments. 
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
