import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import {
  Upload,
  X,
  Image as ImageIcon,
  Download,
  DownloadCloud,
  ExternalLink,
  UserCircle,
  BookOpen,
  Heart,
  ArrowRightCircle,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import omnihealthBannerVideo from "@/assets/omnihealth/u9151188686_httpss.mj.runygBZuRDSKvY_create_minimum_hand_move_8ac8cee3-a131-4112-a1c8-a18c6c96445a_2.mp4";
import website1Img from "@/assets/omnihealth/website1.png";
import website2Img from "@/assets/omnihealth/website2.png";
import omnihealthLifestyleImg from "@/assets/omnihealth/Gemini_Generated_Image_xvqkp6xvqkp6xvqk.png";

const APP_URL = "https://omnihealth.info";

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

  const demoScreens =
    images.length > 1
      ? images.slice(1, 4).map((img) => img.dataUrl ?? img.preview)
      : assetScreenUrls;

  return (
    <div className="min-h-screen w-full">
      <PortfolioSidebar />

      <main className="lg:ml-80 min-h-screen bg-muted/30 omnihealth-accent-green">
        {/* Video banner — crop top only, bottom stays visible */}
        <div className="grid grid-cols-3 gap-0 overflow-hidden h-[220px] w-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative w-full h-full overflow-hidden">
              <video
                src={omnihealthBannerVideo}
                autoPlay
                muted
                loop
                playsInline
                className="absolute left-0 w-full h-[125%] object-cover origin-top"
                style={{ top: 0, objectPosition: "center top", transform: "translateY(-10%)" }}
                aria-hidden
              />
            </div>
          ))}
        </div>
        <header className="pt-16 pb-10 px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-primary leading-tight mb-6 flex flex-nowrap items-center justify-center gap-2 whitespace-nowrap">
              Omnihealth — Take your{" "}
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                cancer screening
                <ExternalLink className="h-5 w-5 md:h-6 md:w-6 shrink-0" aria-hidden />
              </a>
            </h1>
            <p className="text-sm text-muted-foreground">
              This project is in collaboration with my dearest friend Ivy Yu.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary underline underline-offset-2 hover:text-primary/80"
              >
                https://omnihealth.info
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </p>
          </div>
        </header>

        {/* Intro */}
        <div className="px-8 lg:px-16 pb-10 relative z-10">
          <div className="max-w-2xl mx-auto space-y-4 font-serif text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              For those who know me, you know I've never hesitated to share the miracle story of my dad. For eight years, across different countries, I walked beside him through a cancer journey that can only be described as a miracle.
            </p>
            <p>
              Having gone through so many stages of this with him, I truly believe prevention and early screening are the most effective ways to reduce the odds. So here I am, building the{" "}
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
              >
                cancer screening quiz
              </a>{" "}
              I wish my family had earlier — <strong>something simple that helps you understand which cancer screenings you should consider, based on your own risk.</strong>
            </p>
            <p>
              This is a small nonprofit effort and still a little under construction. If you're willing to take a quick test, I would be grateful if you could try it and share it with your friends and family.
            </p>
            <p>
              If this mission resonates with you — whether you are a medical professional, survivor, caregiver, or someone who simply cares — please let me know how to make it more useful{" "}
              <Link to="/contact" className="underline underline-offset-2 hover:text-primary/80">
                here
              </Link>
              .
            </p>
          </div>
        </div>

        <section className="px-4 lg:px-8 pb-16 max-w-4xl mx-auto space-y-16 relative z-10">
          {/* How it works — 4 steps in boxes */}
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-normal text-primary">
              How it works
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: UserCircle,
                  title: "Share your information",
                  desc: "Tell us a little about yourself — your age, background, health history, and any relevant factors.",
                },
                {
                  icon: BookOpen,
                  title: "Evidence-based analysis",
                  desc: "Your information is thoughtfully compared against established medical guidelines and reviewed with professional knowledge in mind.",
                },
                {
                  icon: Heart,
                  title: "Understand your risk",
                  desc: "You receive a clear, simple overview of your personal risk factors — what may matter, and why.",
                },
                {
                  icon: ArrowRightCircle,
                  title: "Know what to do next",
                  desc: "Get gentle, practical guidance on screenings to consider, when to act, and how to take the next step early.",
                },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                <div key={i}>
                  <div className="rounded-lg border border-border/50 bg-card shadow-sm p-6 flex gap-4 items-start">
                    <div className="shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-medium text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="flex justify-center py-2 text-muted-foreground">
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  )}
                </div>
              );
              })}
            </div>
          </div>

          {/* Product screenshot grid */}
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-normal text-primary">
              See it in action
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="relative overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-sm ring-0 ring-border/20 transition-shadow hover:shadow-md hover:ring-1 aspect-video">
                <img
                  src={website1Img}
                  alt="Omnihealth landing page — screening quiz and health plan"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-sm ring-0 ring-border/20 transition-shadow hover:shadow-md hover:ring-1 aspect-video">
                <img
                  src={website2Img}
                  alt="Omnihealth family history step"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-sm ring-0 ring-border/20 transition-shadow hover:shadow-md hover:ring-1 aspect-video">
                <img
                  src={omnihealthLifestyleImg}
                  alt="Omnihealth — wellness, gardening, and healthy living"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>
            {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {demoScreens.map((src, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-sm ring-0 ring-border/20 transition-shadow hover:shadow-md hover:ring-1"
                >
                  <img
                    src={src}
                    alt={`Omnihealth feature ${i + 1}`}
                    className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div> */}
          </div>

          {/* Video demo placeholder — commented out
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
          */}

          {/* Upload section — commented out
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
                        className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-[1.02]"
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
          */}
        </section>
      </main>
    </div>
  );
};

export default OmnihealthPage;
