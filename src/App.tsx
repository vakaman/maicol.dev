import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import RouteStateScrollRestorer from "@/components/RouteStateScrollRestorer";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { getRouterBasename } from "../site.config";
import Index from "./pages/Index.tsx";
import HistoriaDetail from "./pages/HistoriaDetail.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocaleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          basename={getRouterBasename(import.meta.env.BASE_URL)}
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
        >
          <RouteStateScrollRestorer />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/historia/:id" element={<HistoriaDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LocaleProvider>
  </QueryClientProvider>
);

export default App;
