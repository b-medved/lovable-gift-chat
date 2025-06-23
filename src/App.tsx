
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GiverContext from "./pages/GiverContext";
import Share from "./pages/Share";
import Chat from "./pages/Chat";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Setup API proxy for development
    if (import.meta.env.DEV) {
      const originalFetch = window.fetch;
      window.fetch = async (input, init) => {
        const url = typeof input === 'string' ? input : input instanceof Request ? input.url : input.toString();
        
        if (url.startsWith('/api/discovery/chat')) {
          return originalFetch('http://localhost:54321/functions/v1/discovery-chat', {
            ...init,
            headers: {
              ...init?.headers,
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
          });
        }
        
        if (url.startsWith('/api/generate-gifts')) {
          return originalFetch('http://localhost:54321/functions/v1/generate-gifts', {
            ...init,
            headers: {
              ...init?.headers,
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
          });
        }
        
        return originalFetch(input, init);
      };
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/giver-context" element={<GiverContext />} />
            <Route path="/share" element={<Share />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/results" element={<Results />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
