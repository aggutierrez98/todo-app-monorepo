// import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AppRouter } from "@/router/AppRouter.jsx";
import "tailwindcss/tailwind.css";
import "./globals.css"

//TODO: Mejorar rendimiento de la pagina aplicando lo de midudev
//TODO: Hacer pagina PWA
//TODO: Que todo el codigo y contenido de la pagina esten en ingles

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
