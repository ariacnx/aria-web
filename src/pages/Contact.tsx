import { useState } from "react";
import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import { Mail, Instagram, Camera, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const FORMSPREE_ID = "xwvnppwo";

const Contact = () => {
  const [feedbackStatus, setFeedbackStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setFeedbackStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setFeedbackStatus("success");
        form.reset();
      } else {
        setFeedbackStatus("error");
      }
    } catch {
      setFeedbackStatus("error");
    }
  };

  return (
    <div className="min-h-screen w-full">
      <PortfolioSidebar />

      <main className="lg:ml-80 min-h-screen flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-lg text-center mb-16">
          <h1 className="font-serif text-4xl lg:text-5xl font-normal text-primary mb-8">
            Let's create together
          </h1>

          <p className="text-muted-foreground mb-12 leading-relaxed">
            I'm always excited to collaborate on new projects, whether it's
            capturing life's beautiful moments or bringing artistic visions to
            life.
          </p>

          <div className="space-y-6">
            <a
              href="mailto:hello@yourname.com"
              className="flex items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-colors text-lg group"
            >
              <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span>hello@yourname.com</span>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-colors text-lg group"
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

        {/* Feedback / comment section */}
        <div className="w-full max-w-md border border-border/50 rounded-lg bg-card shadow-sm p-6 text-left">
          <h2 className="font-serif text-xl font-normal text-primary mb-2 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-muted-foreground" />
            Send feedback
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Comments, suggestions, or just say hi — I'd love to hear from you.
          </p>

          {feedbackStatus === "success" && (
            <p className="text-sm text-primary mb-4 font-medium">
              Thanks! Your message has been sent.
            </p>
          )}
          {feedbackStatus === "error" && (
            <p className="text-sm text-destructive mb-4">
              Something went wrong. Please try again or email me directly.
            </p>
          )}

          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div>
              <label htmlFor="feedback-name" className="sr-only">
                Name
              </label>
              <input
                id="feedback-name"
                type="text"
                name="name"
                placeholder="Your name (optional)"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <div>
              <label htmlFor="feedback-email" className="sr-only">
                Email
              </label>
              <input
                id="feedback-email"
                type="email"
                name="email"
                placeholder="Your email (optional)"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <div>
              <label htmlFor="feedback-message" className="sr-only">
                Message
              </label>
              <textarea
                id="feedback-message"
                name="message"
                placeholder="Your feedback or comment..."
                rows={4}
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              />
            </div>
            <Button type="submit" disabled={feedbackStatus === "sending"} className="w-full gap-2">
              <Send className="h-4 w-4" />
              {feedbackStatus === "sending" ? "Sending..." : "Send feedback"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Contact;
