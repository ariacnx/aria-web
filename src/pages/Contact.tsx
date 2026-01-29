import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import { Mail, Instagram, Camera } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex w-full">
      <PortfolioSidebar />

      <main className="flex-1 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-light italic mb-8">
            Let's create together
          </h1>
          
          <p className="text-muted-foreground mb-12 leading-relaxed">
            I'm always excited to collaborate on new projects, 
            whether it's capturing life's beautiful moments or 
            bringing artistic visions to life.
          </p>

          <div className="space-y-6">
            <a
              href="mailto:hello@yourname.com"
              className="flex items-center justify-center gap-3 nav-link text-lg group"
            >
              <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span>hello@yourname.com</span>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 nav-link text-lg group"
            >
              <Instagram className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span>@yourhandle</span>
            </a>

            <div className="flex items-center justify-center gap-3 text-muted-foreground text-lg">
              <Camera className="h-5 w-5" />
              <span>Based in Your City</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
