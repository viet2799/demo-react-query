import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// const queryClient = new QueryClient();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      retry: 2, // Thử lại 2 lần nếu lỗi
    },
    mutations: {
      onError: (error) => {
        console.log("Lỗi", error);
      },
      onSuccess: (data) => {
        console.log("Thành công", data);
      },
      onSettled: (data, error) => {
        console.log("Hoàn thành", data, error);
      },
      retry: 2, // Thử lại 2 lần nếu lỗi
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-right"
        position="bottom"
      />
    </QueryClientProvider>
  </StrictMode>
);
