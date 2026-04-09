import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import RouteStateScrollRestorer from "@/components/RouteStateScrollRestorer";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { getRouterBasename } from "../site.config";
import Index from "./pages/Index.tsx";
import JourneyDetail from "./pages/JourneyDetail.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter
      basename={getRouterBasename(import.meta.env.BASE_URL)}
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <LocaleProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <RouteStateScrollRestorer />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pt-br" element={<Index />} />
            <Route path="/journey/:id" element={<JourneyDetail />} />
            <Route path="/pt-br/journey/:id" element={<JourneyDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </LocaleProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
