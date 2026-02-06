import { useState, useRef, useCallback, useEffect } from "react";
import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import {
  Upload,
  X,
  Image as ImageIcon,
  Download,
  DownloadCloud,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const APP_URL = "https://omnihealth.example.com/";

// Fallback images if you haven't uploaded anything yet
const FALLBACK_IMAGES = {
  hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
  screens: [
    "https://images.unsplash.com/photo-1580281657527-47f249e8f9c5?w=600&q=80",
    "https://images.unsplash.com/photo-1581591524425-c7e0978865c1?w=600&q=80",
    "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=600&q=80",
  ],
};

// Load from src/assets/omnihealth/ (so you can also “save” images into the repo)
const omnihealthModules = import.meta.glob<{ default: string }>(
  "../assets/omnihealth/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true }
);

const omniEntries = Object.entries(omnihealthModules)
  .map(([path, mod]) => ({ path, url: mod.default }))
  .sort((a, b) => a.path.localeCompare(b.path));

const assetHeroUrl = omniEntries[0]?.url ?? FALLBACK_IMAGES.hero;
const assetScreenUrls =
  omniEntries.length > 1
    ? omniEntries.slice(1, 4).map((e) => e.url)
    : FALLBACK_IMAGES.screens;

interface UploadedImage {
  id: string;
  file?: File;
  preview: string;
  name: string;
  dataUrl?: string; // Base64 data URL for persistence
}

const OmnihealthPage = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load images from localStorage on mount
  useEffect(() => {
    const savedImages = localStorage.getItem("omnihealth_images");
    if (savedImages) {
      try {
        const parsed = JSON.parse(savedImages);
        setImages(parsed);
      } catch (e) {
        console.error("Failed to load saved images", e);
      }
    }
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    if (images.length > 0) {
      const toSave = images.map((img) => ({
        id: img.id,
        name: img.name,
        preview: img.preview,
        dataUrl: img.dataUrl,
      }));
      localStorage.setItem("omnihealth_images", JSON.stringify(toSave));
    } else {
      localStorage.removeItem("omnihealth_images");
    }
  }, [images]);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    // Process each file to create preview and base64
    Promise.all(
      imageFiles.map((file) => {
        return new Promise<UploadedImage>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            resolve({
              id: `${Date.now()}-${Math.random()}`,
              file,
              preview: URL.createObjectURL(file),
              name: file.name,
              dataUrl,
            });
          };
          reader.readAsDataURL(file);
        });
      })
    ).then((newImages) => {
      setImages((prev) => [...prev, ...newImages]);
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
    },
    [handleFiles]
  );

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => {
        if (img.id === id) {
          URL.revokeObjectURL(img.preview);
          return false;
        }
        return true;
      });
      // Save to localStorage
      const toSave = updated.map((img) => ({
        id: img.id,
        name: img.name,
        preview: img.preview,
      }));
      localStorage.setItem("omnihealth_images", JSON.stringify(toSave));
      return updated;
    });
  }, []);

  const downloadImage = useCallback((image: UploadedImage) => {
    if (image.dataUrl) {
      // Convert data URL to blob
      fetch(image.dataUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = image.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        });
    } else if (image.file) {
      // Use original file if available
      const url = URL.createObjectURL(image.file);
      const a = document.createElement("a");
      a.href = url;
      a.download = image.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, []);

  const downloadAllImages = useCallback(async () => {
    // Create a zip-like experience by downloading all images
    // Since we can't create a zip in the browser easily, we'll download them sequentially
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      await new Promise((resolve) => {
        if (image.dataUrl) {
          fetch(image.dataUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = image.name;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              setTimeout(resolve, 100); // Small delay between downloads
            });
        } else if (image.file) {
          const url = URL.createObjectURL(image.file);
          const a = document.createElement("a");
          a.href = url;
          a.download = image.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          setTimeout(resolve, 100);
        } else {
          resolve(undefined);
        }
      });
    }
  }, [images]);

  const demoHero = images[0]?.dataUrl ?? images[0]?.preview ?? assetHeroUrl;
  const demoScreens =
    images.length > 1
      ? images.slice(1, 4).map((img) => img.dataUrl ?? img.preview)
      : assetScreenUrls;

  return (
    <div className="min-h-screen w-full">
      <PortfolioSidebar />

      <main className="lg:ml-80 min-h-screen bg-muted/30">
        <header className="pt-16 pb-10 px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-primary leading-tight mb-6">
              Omnihealth — Screening
            </h1>
            <p className="font-serif text-base md:text-lg text-muted-foreground leading-relaxed">
              Take your screening test. A simple flow that helps users answer a few questions and understand next steps.
            </p>
          </div>
        </header>

        <section className="px-4 lg:px-8 pb-16 max-w-4xl mx-auto space-y-16 relative z-10">
          <div>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-serif text-lg text-primary hover:text-primary/80 transition-colors group"
            >
              <span>Open product</span>
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="mt-1 text-sm text-muted-foreground">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline break-all"
              >
                {APP_URL}
              </a>
            </p>
          </div>

          {/* Hero product image */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-normal text-primary">
              See it in action
            </h2>
            <div className="relative overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-sm">
              <img
                src={demoHero}
                alt="Omnihealth screening flow hero"
                className="w-full h-auto block"
                loading="eager"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Tip: upload your screenshots below (or add files into{" "}
              <code className="bg-muted px-1 rounded text-xs">
                src/assets/omnihealth/
              </code>
              ) to replace the demo images.
            </p>
          </div>

          {/* Product screenshot grid */}
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-normal text-primary">
              How it works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {demoScreens.map((src, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-sm ring-0 ring-border/20 transition-shadow hover:shadow-md hover:ring-1"
                >
                  <img
                    src={src}
                    alt={`Omnihealth feature ${i + 1}`}
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

          {/* Upload section (so you can update screenshots easily) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-serif text-xl font-normal text-primary">
                Upload screenshots
              </h2>
              {images.length > 0 && (
                <Button
                  onClick={downloadAllImages}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <DownloadCloud className="h-4 w-4" />
                  Save All
                </Button>
              )}
            </div>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`
                border-2 border-dashed rounded-lg p-10 text-center transition-colors
                ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileInput}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-muted">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-serif text-lg text-primary mb-2">
                    Drag and drop images here, or{" "}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-primary underline hover:text-primary/80"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    These will show up immediately on this page.
                  </p>
                </div>
              </div>
            </div>

            {images.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Uploaded ({images.length})
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {images.slice(0, 6).map((image) => (
                    <div
                      key={image.id}
                      className="group relative overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-sm ring-0 ring-border/20 transition-shadow hover:shadow-md hover:ring-1"
                    >
                      <img
                        src={image.dataUrl || image.preview}
                        alt={image.name}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => downloadImage(image)}
                          className="p-2 bg-background/80 hover:bg-background rounded-full"
                          aria-label="Download image"
                          title="Download image"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeImage(image.id)}
                          className="p-2 bg-background/80 hover:bg-background rounded-full"
                          aria-label="Remove image"
                          title="Remove image"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {images.length > 6 && (
                  <p className="text-xs text-muted-foreground">
                    Showing first 6 uploads here (but the hero + “How it works”
                    sections use the first 4).
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed border-border rounded-lg">
                <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-serif text-muted-foreground mb-2">
                  No screenshots uploaded yet
                </p>
                <p className="text-sm text-muted-foreground">
                  Upload a few screenshots to replace the demo images above.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default OmnihealthPage;
