import { useState } from "react";
import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import { Mail, Instagram, MessageCircle, Send } from "lucide-react";
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

      <main className="lg:ml-80 min-h-screen bg-muted/30">
        <header className="pt-16 pb-10 px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-primary leading-tight mb-6">
              Let's chat
            </h1>
            <p className="font-serif text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              If something resonates with you, reach out — I'd love to hear from you.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="mailto:ariachen@berkeley.edu"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span className="text-sm md:text-base">ariachen@berkeley.edu</span>
              </a>
              <a
                href="https://instagram.com/aaaria_aa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Instagram className="h-4 w-4 shrink-0" />
                <span className="text-sm md:text-base">@aaaria_aa</span>
              </a>
            </div>
          </div>
        </header>

        <section className="px-8 lg:px-16 pb-16">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-lg border border-border/50 bg-card shadow-sm p-6 sm:p-8">
              <h2 className="font-serif text-xl font-normal text-primary mb-4 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-muted-foreground" />
                Send a message
              </h2>

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
                    placeholder="Name"
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
                    placeholder="Email"
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
                    placeholder="Message"
                    rows={4}
                    required
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  />
                </div>
                <Button type="submit" disabled={feedbackStatus === "sending"} className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  {feedbackStatus === "sending" ? "Sending..." : "Send"}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
