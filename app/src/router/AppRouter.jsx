import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { renewLogin } from "@/api/users.js";
import { useQuery } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import { LoadingPage } from "@p/LoadingPage";
import { Header } from '@c/Header';
const RegisterPage = lazy(() => import(/* webpackChunkName: "RegisterPage" */"@p/RegisterPage"));
const LoginPage = lazy(() => import(/* webpackChunkName: "LoginPage" */"@p/LoginPage"));
const TodoApp = lazy(() => import(/* webpackChunkName: "TodoApp" */"@p/TodoApp"));
const Fallback = lazy(() => import(/* webpackChunkName: "Fallback" */"@p/FallbackPage"));

export const AppRouter = () => {
  const { data: userData, isLoading } = useQuery("user", renewLogin, {
    retry: false,
  });

  const errorHandler = (error, errorInfo) => {
    console.log("Logging", error, errorInfo);
  };

  return (
    <Suspense fallback={<LoadingPage />}>
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>

        <Router>

          {isLoading && <LoadingPage />}

          <div className="flex flex-col items-center pb-12 pt-6 h-full w-full sm:dark:bg-gray-800 overflow-y-scroll overflow-x-hidden">

            <Header />

            <Switch>
              <PublicRoute
                key="/login"
                exact
                path="/login"
                component={LoginPage}
                isAuthenticated={!!userData}
              />
              <PublicRoute
                key="/register"
                exact
                path="/register"
                component={RegisterPage}
                isAuthenticated={!!userData}
              />
              <PrivateRoute
                key="/"
                exact
                path="/"
                component={TodoApp}
                isAuthenticated={!!userData}
              />
              <Redirect to="/" />
            </Switch>

          </div>

        </Router>

      </ErrorBoundary >
    </Suspense>
  );
};
