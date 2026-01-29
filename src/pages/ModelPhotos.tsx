import { PortfolioSidebar } from "@/components/PortfolioSidebar";

/**
 * Photos are loaded automatically from src/assets/model/
 * Add any .jpg, .jpeg, .png, or .webp — they appear in order by filename.
 * Tip: Resize to max ~1200px on the long edge before adding for faster loading.
 */
const modelModules = import.meta.glob<{ default: string }>(
  "../assets/model/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true }
);

const modelImages = Object.entries(modelModules)
  .map(([path, mod]) => ({
    src: mod.default,
    title: path.split("/").pop()?.replace(/\.[^.]+$/, "").replace(/-|_/g, " ") ?? "Photo",
  }))
  .sort((a, b) => a.title.localeCompare(b.title));

function ModelPhotoCard({ src, title }: { src: string; title: string }) {
  return (
    <div className="photo-card masonry-item group">
      <div className="relative overflow-hidden w-full rounded-sm">
        <img
          src={src}
          alt={title}
          className="w-full h-auto block object-cover"
          loading="lazy"
        />
        <div className="photo-overlay">
          <div className="photo-info">
            <h3 className="font-serif text-xl font-light">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

const ModelPhotosPage = () => {
  return (
    <div className="min-h-screen w-full">
      <PortfolioSidebar />

      <main className="lg:ml-80 min-h-screen">
        <header className="pt-16 pb-10 px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-primary leading-tight mb-6">
              I model a bit
            </h1>
            <p className="font-serif text-base md:text-lg text-muted-foreground leading-relaxed">
              A mix of shapes and sizes — no cropping.
            </p>
          </div>
        </header>

        <section className="px-4 lg:px-8 pb-16">
          {modelImages.length > 0 ? (
            <div className="masonry-grid max-w-4xl mx-auto">
              {modelImages.map((img, index) => (
                <ModelPhotoCard key={index} src={img.src} title={img.title} />
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center py-16 border border-dashed border-border rounded-lg">
              <p className="font-serif text-muted-foreground mb-2">
                No photos yet
              </p>
              <p className="text-sm text-muted-foreground">
                Drop .jpg, .png, or .webp into <code className="bg-muted px-1 rounded text-xs">src/assets/model/</code> and they’ll show up here.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ModelPhotosPage;
