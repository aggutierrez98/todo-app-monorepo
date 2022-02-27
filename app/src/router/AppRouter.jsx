import TodoApp from "@p/TodoApp";
import { LoginPage } from "@p/LoginPage";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { RegisterPage } from "@p/RegisterPage";
import { renewLogin } from "@/api/users.js";
import { useQuery } from "react-query";
import { useToogleTheme } from "@h/useToogleTheme";

export const AppRouter = () => {
  useToogleTheme();

  const { data: userData, isLoading } = useQuery("user", renewLogin, {
    retry: false,
  });

  if (isLoading) return <h5>Espere</h5>;

  return (
    <Router>
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
    </Router>
  );
};
