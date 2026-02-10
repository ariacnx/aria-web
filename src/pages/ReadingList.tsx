import { PortfolioSidebar } from "@/components/PortfolioSidebar";

// Cover images from src/assets/reading/
import xingzheCover from "@/assets/reading/yuqiuyu.jpg";
import sahaladegushiCover from "@/assets/reading/sanmao.jpg";
import wenxuehuiyiluCover from "@/assets/reading/muxin.jpg";
import unbearableLightnessCover from "@/assets/reading/the unbearable lightness of being.jpg";

interface ReadingItem {
  id: string;
  cover: string;
  title: string;
  author: string;
  year?: string;
  description?: string;
}

const readingList: ReadingItem[] = [
  { id: "7", cover: xingzheCover, title: "行者无疆", author: "余秋雨", year: "", description: "" },
  { id: "8", cover: sahaladegushiCover, title: "撒哈拉的故事", author: "三毛", year: "", description: "" },
  { id: "9", cover: wenxuehuiyiluCover, title: "文学回忆录", author: "木心", year: "", description: "" },
  { id: "10", cover: unbearableLightnessCover, title: "The Unbearable Lightness of Being", author: "Milan Kundera", year: "1984", description: "" },
  { id: "11", cover: "", title: "Poor Charlie's Almanack", author: "Charles T. Munger", year: "", description: "" },
  { id: "12", cover: "", title: "围城", author: "钱钟书", year: "", description: "" },
  { id: "13", cover: "", title: "The Trial", author: "Franz Kafka", year: "", description: "" },
  { id: "14", cover: "", title: "The Castle", author: "Franz Kafka", year: "", description: "" },
  { id: "15", cover: "", title: "Why Fish Don't Exist", author: "Lulu Miller", year: "2020", description: "" },
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
  const displayList = readingList;

  return (
    <div className="min-h-screen w-full">
      <PortfolioSidebar />

      <main className="lg:ml-80 min-h-screen">
        <header className="pt-16 pb-10 px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-primary leading-tight mb-6">
              My reading and podcast list
            </h2>
            <p className="font-serif text-base md:text-lg text-muted-foreground leading-relaxed">
              Recents and Favorites :D
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
        <section className="px-4 lg:px-8 pb-10">
          <div className="max-w-2xl mx-auto">
            {displayList.map((item) => (
              <BookRow key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* Podcast list */}
        <section className="px-4 lg:px-8 pb-16">
          <div className="max-w-2xl mx-auto">
            <h3 className="font-serif text-xl font-normal text-primary mb-4">
              My podcast list
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.hubermanlab.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-base text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  Huberman Lab
                </a>
              </li>
              <li>
                <a
                  href="https://www.acquired.fm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-base text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  Acquired
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ReadingListPage;
