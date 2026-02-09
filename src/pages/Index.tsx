import { PortfolioSidebar } from "@/components/PortfolioSidebar";

/**
 * Photos are loaded from src/assets/main/
 * Add .jpg, .png, or .webp — they appear on the root page in filename order.
 */
const mainModules = import.meta.glob<{ default: string }>(
  "../assets/main/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true }
);

type AspectRatio = "landscape" | "portrait" | "square" | "wide" | "tall" | "panorama" | "compact";

const ASPECT_CLASSES: Record<AspectRatio, string> = {
  landscape: "aspect-[16/9]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[2/1]",
  tall: "aspect-[2/3]",
  panorama: "aspect-[3/1]",
  compact: "aspect-[4/5]",
};

// Cycle through layouts — irregular mix of sizes and shapes
const LAYOUTS: AspectRatio[] = [
  "landscape",
  "square",
  "portrait",
  "wide",
  "compact",
  "panorama",
  "tall",
  "square",
  "landscape",
  "compact",
  "portrait",
  "wide",
];

const mainImages = Object.entries(mainModules)
  .map(([path, mod], index) => ({
    src: mod.default,
    title: path.split("/").pop()?.replace(/\.[^.]+$/, "").replace(/-|_/g, " ") ?? "Photo",
    aspect: LAYOUTS[index % LAYOUTS.length],
  }))
  .sort((a, b) => a.title.localeCompare(b.title));

function MainPhotoCard({
  src,
  title,
  aspect,
}: {
  src: string;
  title: string;
  aspect: AspectRatio;
}) {
  return (
    <div className="photo-card masonry-item group">
      <div className={`relative overflow-hidden w-full rounded-sm ${ASPECT_CLASSES[aspect]}`}>
        <img
          src={src}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
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

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      {/* Sidebar Navigation - Fixed */}
      <PortfolioSidebar />

      {/* Main Content - Offset for sidebar */}
      <main className="lg:ml-80 min-h-screen">
        <header className="pt-16 pb-10 px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-primary leading-tight mb-6">
              Welcome :)
            </h1>
            <p className="font-serif text-base md:text-lg text-muted-foreground leading-relaxed">
              This is primarily a space for my work and projects. If something resonates with you, feel free to reach out.
            </p>
          </div>
        </header>

        <section className="px-8 lg:px-16 pb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-lg font-normal text-primary mb-4">
              other random stuff about me
            </h2>
            <ul className="font-serif text-base md:text-lg text-muted-foreground leading-relaxed space-y-3 list-disc list-outside pl-6">
              <li>I believe AI should reduce entropy, I am trying to create tools that feel calmer, more useful, and more humane.</li>
              <li>I love testing every AI tool/product I can get my hands on</li>
              <li>I'm obsessed with supplements and how the brain works</li>
              <li>I like building with my hands, from apps to pottery, and unwinding through home cooking :D</li>
            </ul>
          </div>
        </section>

        {/* Photos from src/assets/main/ */}
        {mainImages.length > 0 && (
          <section className="px-4 lg:px-8 pb-16">
            <div className="masonry-grid max-w-4xl mx-auto">
              {mainImages.map((img, index) => (
                <MainPhotoCard
                  key={index}
                  src={img.src}
                  title={img.title}
                  aspect={img.aspect}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
