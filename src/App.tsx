import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import ReadingList from "./pages/ReadingList";
import EatRecipeApp from "./pages/EatRecipeApp";
import GroveApp from "./pages/GroveApp";
import WireSculpturePage from "./pages/WireSculpture";
import ModelPhotos from "./pages/ModelPhotos";
import Omnihealth from "./pages/Omnihealth";
import Work from "./pages/Work";
import WIP from "./pages/WIP";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reading-list" element={<ReadingList />} />
          <Route path="/eat-recipe-app" element={<EatRecipeApp />} />
          <Route path="/grove" element={<GroveApp />} />
          <Route path="/wire-sculpture" element={<WireSculpturePage />} />
          <Route path="/model-photos" element={<ModelPhotos />} />
          <Route path="/omnihealth" element={<Omnihealth />} />
          <Route path="/work" element={<Work />} />
          <Route path="/wip" element={<WIP />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
