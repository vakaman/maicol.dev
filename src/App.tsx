import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import RouteStateScrollRestorer from "@/components/RouteStateScrollRestorer";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { getRouterBasename } from "../site.config";

const Index = lazy(() => import("./pages/Index.tsx"));
const JourneyDetail = lazy(() => import("./pages/JourneyDetail.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

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
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pt-br" element={<Index />} />
              <Route path="/journey/:id" element={<JourneyDetail />} />
              <Route path="/pt-br/journey/:id" element={<JourneyDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </TooltipProvider>
      </LocaleProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
