import TodoApp from "@p/TodoApp";
import { LoginPage } from "@p/LoginPage";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { RegisterPage } from "@p/RegisterPage";
import { renewLogin } from "@/api/users.js";
import { useQuery } from "react-query";
import { useToogleTheme } from "@h/useToogleTheme";
import { LoadingPage } from "@c/LoadingPage";
import { Fallback } from "@c/Fallback";
import { ErrorBoundary } from "react-error-boundary";


export const AppRouter = () => {
  useToogleTheme();

  const { data: userData, isLoading } = useQuery("user", renewLogin, {
    retry: false,
  });

  const errorHandler = (error, errorInfo) => {
    console.log("Logging", error, errorInfo);
  };

  if (isLoading) return <LoadingPage />;

  return (
    <Router>
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>

        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={LoginPage}
            isAuthenticated={!!userData}
          />
          <PublicRoute
            exact
            path="/register"
            component={RegisterPage}
            isAuthenticated={!!userData}
          />

          <PrivateRoute
            exact
            path="/"
            component={TodoApp}
            isAuthenticated={!!userData}
          />

          <Redirect to="/" />
        </Switch>
      </ErrorBoundary>
    </Router>
  );
};
