import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AppRouter } from "@/router/AppRouter.jsx";
import "tailwindcss/tailwind.css";
import "./globals.css"

//TODO: Hacer pagina PWA

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// To access client-state in cypress e2e tests
if (window.Cypress) {
  window.queryClient = queryClient;
}

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AppRouter />
    <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
  </QueryClientProvider>,
  document.getElementById("root")
);
