// import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "@c/Fallback";
import { AppRouter } from "@/router/AppRouter.jsx";
import "tailwindcss/tailwind.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// Para testing
if (window.Cypress) {
  window.queryClient = queryClient;
}

const errorHandler = (error, errorInfo) => {
  console.log("Logging", error, errorInfo);
};

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
      <AppRouter />
    </ErrorBoundary>
    <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
  </QueryClientProvider>,
  document.getElementById("root")
);
