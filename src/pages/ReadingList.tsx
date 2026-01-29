import { useState, useEffect } from "react";
import { PortfolioSidebar } from "@/components/PortfolioSidebar";

// Placeholder book covers – reuse gallery assets for demo
import tokyoTemple from "@/assets/gallery/tokyo-temple.jpg";
import streetMist from "@/assets/gallery/street-mist.jpg";
import coupleBeach from "@/assets/gallery/couple-beach.jpg";
import architecture from "@/assets/gallery/architecture.jpg";
import natureDew from "@/assets/gallery/nature-dew.jpg";
import cameraHands from "@/assets/gallery/camera-hands.jpg";

interface ReadingItem {
  id: string;
  cover: string;
  title: string;
  author: string;
  year?: string;
  description?: string;
}

// Open Library search response (minimal shape we use)
interface OpenLibraryDoc {
  key: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  first_sentence?: string[];
}

const OPEN_LIBRARY_COVER_URL = "https://covers.openlibrary.org/b/id";

async function fetchBookFromOpenLibrary(query: string): Promise<ReadingItem | null> {
  try {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=1`
    );
    const data = await res.json();
    const doc: OpenLibraryDoc | undefined = data.docs?.[0];
    if (!doc) return null;

    const author = doc.author_name?.join(", ") ?? "—";
    const year = doc.first_publish_year?.toString();
    const cover =
      doc.cover_i != null
        ? `${OPEN_LIBRARY_COVER_URL}/${doc.cover_i}-M.jpg`
        : "";
    const description = doc.first_sentence?.join(" ") ?? "";

    const title = query === "The Unbearable Lightness of Being" ? query : (doc.title ?? query);

    return {
      id: `ol-${doc.key.replace(/\//g, "-")}`,
      cover,
      title,
      author,
      year,
      description: description || undefined,
    };
  } catch {
    return null;
  }
}

// Known Kafka work titles in English (Open Library often returns German titles)
const KAFKA_TITLE_MAP: Record<string, string> = {
  "Der Proceß": "The Trial",
  "Der Proceß.": "The Trial",
  "Das Schloß": "The Castle",
  "Das Schloß.": "The Castle",
  "Die Verwandlung": "The Metamorphosis",
};

function docToReadingItem(doc: OpenLibraryDoc): ReadingItem {
  const author = doc.author_name?.join(", ") ?? "—";
  const year = doc.first_publish_year?.toString();
  const cover =
    doc.cover_i != null
      ? `${OPEN_LIBRARY_COVER_URL}/${doc.cover_i}-M.jpg`
      : "";
  const description = doc.first_sentence?.join(" ") ?? "";
  const rawTitle = doc.title ?? "";
  const title = KAFKA_TITLE_MAP[rawTitle] ?? rawTitle;

  return {
    id: `ol-${doc.key.replace(/\//g, "-")}`,
    cover,
    title,
    author,
    year,
    description: description || undefined,
  };
}

async function fetchBooksByAuthor(authorName: string, limit = 5): Promise<ReadingItem[]> {
  try {
    const res = await fetch(
      `https://openlibrary.org/search.json?author=${encodeURIComponent(authorName)}&limit=${limit}`
    );
    const data = await res.json();
    const docs: OpenLibraryDoc[] = data.docs ?? [];
    return docs.map(docToReadingItem);
  } catch {
    return [];
  }
}

const readingList: ReadingItem[] = [
  { id: "1", cover: tokyoTemple, title: "Tokyo", author: "Various", year: "2025", description: "" },
  { id: "2", cover: streetMist, title: "Dawn Walker", author: "Anonymous", year: "2024", description: "" },
  { id: "3", cover: coupleBeach, title: "Golden Hour Love", author: "—", year: "2024", description: "" },
  { id: "4", cover: architecture, title: "Concrete Dreams", author: "—", year: "2023", description: "" },
  { id: "5", cover: natureDew, title: "Morning Bloom", author: "—", year: "2023", description: "" },
  { id: "6", cover: cameraHands, title: "The Moment", author: "—", year: "2022", description: "" },
];

function ReadingCard({ cover, title, author, year }: ReadingItem) {
  return (
    <div className="group flex-shrink-0">
      <div className="relative overflow-hidden rounded-sm bg-muted/50 cursor-pointer">
        <div className="aspect-[2/3] w-[100px] sm:w-[120px]">
          {cover ? (
            <>
              <img
                src={cover}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-photo-overlay/0 group-hover:bg-photo-overlay/30 transition-all duration-500" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/60 text-xs font-serif">
              No cover
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 max-w-[100px] sm:max-w-[120px]">
        {year && (
          <p className="text-xs text-muted-foreground mb-0.5">{year}</p>
        )}
        <h3 className="font-serif text-sm font-light text-primary leading-tight">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">{author}</p>
      </div>
    </div>
  );
}

function BookRow({ cover, title, author, year, description }: ReadingItem) {
  return (
    <article className="flex gap-6 py-8 border-b border-border/50 last:border-b-0">
      <div className="group flex-shrink-0">
        <div className="relative overflow-hidden rounded-sm bg-muted/50">
          <div className="aspect-[2/3] w-[80px] sm:w-[100px]">
            {cover ? (
              <>
                <img
                  src={cover}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-photo-overlay/0 group-hover:bg-photo-overlay/30 transition-all duration-500" />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/60 text-xs font-serif">
                No cover
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        {year && (
          <p className="text-xs text-muted-foreground mb-1">{year}</p>
        )}
        <h3 className="font-serif text-lg font-light text-primary leading-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{author}</p>
        <div className="mt-3 min-h-[3rem]">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description || " "}
          </p>
        </div>
      </div>
    </article>
  );
}

const EXAMPLE_BOOK_QUERY = "The Unbearable Lightness of Being";
const KAFKA_AUTHOR = "Franz Kafka";

const ReadingListPage = () => {
  const [fetchedBook, setFetchedBook] = useState<ReadingItem | null>(null);
  const [kafkaBooks, setKafkaBooks] = useState<ReadingItem[]>([]);

  useEffect(() => {
    fetchBookFromOpenLibrary(EXAMPLE_BOOK_QUERY).then(setFetchedBook);
    fetchBooksByAuthor(KAFKA_AUTHOR, 3).then(setKafkaBooks);
  }, []);

  const displayList = [
    ...(fetchedBook ? [fetchedBook] : []),
    ...kafkaBooks,
    ...readingList,
  ];

  return (
    <div className="min-h-screen w-full">
      <PortfolioSidebar />

      <main className="lg:ml-80 min-h-screen">
        <header className="pt-16 pb-10 px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-primary leading-tight mb-6">
              My reading list
            </h2>
            <p className="font-serif text-base md:text-lg text-muted-foreground leading-relaxed">
              Books and words that stay with me.
            </p>
          </div>
        </header>

        {/* Rolling banner */}
        <section className="px-4 lg:px-8 pt-2 pb-4">
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <div className="flex flex-nowrap gap-8 justify-start min-w-0 pb-2">
              {displayList.map((item) => (
                <ReadingCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* Separate row for each book */}
        <section className="px-4 lg:px-8 pb-16">
          <div className="max-w-2xl mx-auto">
            {displayList.map((item) => (
              <BookRow key={item.id} {...item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ReadingListPage;
