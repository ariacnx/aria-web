import { PhotoCard } from "./PhotoCard";

// Import images
import cameraHands from "@/assets/gallery/camera-hands.jpg";
import streetMist from "@/assets/gallery/street-mist.jpg";
import architecture from "@/assets/gallery/architecture.jpg";
import coupleBeach from "@/assets/gallery/couple-beach.jpg";
import natureDew from "@/assets/gallery/nature-dew.jpg";
import tokyoTemple from "@/assets/gallery/tokyo-temple.jpg";

interface GalleryImage {
  src: string;
  title: string;
  year: string;
  aspectRatio: "landscape" | "portrait" | "square";
}

const galleryImages: GalleryImage[] = [
  {
    src: tokyoTemple,
    title: "Tokyo",
    year: "2025",
    aspectRatio: "landscape",
  },
  {
    src: streetMist,
    title: "Dawn Walker",
    year: "2024",
    aspectRatio: "portrait",
  },
  {
    src: coupleBeach,
    title: "Golden Hour Love",
    year: "2024",
    aspectRatio: "landscape",
  },
  {
    src: architecture,
    title: "Concrete Dreams",
    year: "2023",
    aspectRatio: "square",
  },
  {
    src: natureDew,
    title: "Morning Bloom",
    year: "2023",
    aspectRatio: "landscape",
  },
  {
    src: cameraHands,
    title: "The Moment",
    year: "2022",
    aspectRatio: "landscape",
  },
];

export function PhotoGallery() {
  return (
    <div className="masonry-grid">
      {galleryImages.map((image, index) => (
        <PhotoCard
          key={index}
          src={image.src}
          title={image.title}
          year={image.year}
          aspectRatio={image.aspectRatio}
        />
      ))}
    </div>
  );
}
