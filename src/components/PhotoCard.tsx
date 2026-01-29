interface PhotoCardProps {
  src: string;
  title: string;
  year: string;
  aspectRatio?: "landscape" | "portrait" | "square";
}

export function PhotoCard({ src, title, year, aspectRatio = "landscape" }: PhotoCardProps) {
  const aspectClasses = {
    landscape: "aspect-[16/9]",
    portrait: "aspect-[3/4]",
    square: "aspect-square",
  };

  return (
    <div className="photo-card masonry-item group">
      <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]}`}>
        <img
          src={src}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="photo-overlay">
          <div className="photo-info">
            <p className="text-sm opacity-80 mb-1">{year}</p>
            <h3 className="font-serif text-xl font-light">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
