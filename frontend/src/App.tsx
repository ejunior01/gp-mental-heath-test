import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Router } from "@/Router";
import { Toaster } from "@/view/components/ui/sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
          <Router />
          <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
