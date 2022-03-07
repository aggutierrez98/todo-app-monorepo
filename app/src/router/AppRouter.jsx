import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { renewLogin } from "@/api/users.js";
import { useQuery } from "react-query";
import { useToogleTheme } from "@h/useToogleTheme";
import { LoadingPage } from "@p/LoadingPage";
import { Fallback } from "@c/Fallback";
import { ErrorBoundary } from "react-error-boundary";
import darkMode from "@a/dark_mode_black_24dp.svg";
import lightMode from "@a/light_mode_black_24dp.svg";
const RegisterPage = lazy(() => import(/* webpackChunkName: "RegisterPage" */"@p/RegisterPage"));
const LoginPage = lazy(() => import(/* webpackChunkName: "LoginPage" */"@p/LoginPage"));
const TodoApp = lazy(() => import(/* webpackChunkName: "TodoApp" */"@p/TodoApp"));


export const AppRouter = () => {
  const [themeState, toogleTheme] = useToogleTheme();
  const { data: userData, isLoading } = useQuery("user", renewLogin, {
    retry: false,
  });

  const errorHandler = (error, errorInfo) => {
    console.log("Logging", error, errorInfo);
  };

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
      {isLoading && <LoadingPage />}

      <div
        className={`pt-6 h-full w-full sm:dark:bg-gray-800 
         overflow-y-scroll overflow-x-hidden pb-8`}
        id="app"
      >
        <div className="flex flex-col items-center h-full">

          <div className="relative flex items-center 2xl:items-start mt-6 mr-5">
            <button
              title="Toogle theme"
              onClick={toogleTheme}
              className="2xl:p-2 p-2 w-15 h-15 bg-green-400 rounded-full hover:text-green-400 transition-all dark:bg-green-700 hover:bg-green-700 
            dark:hover:bg-green-400 focus-visible:outline-custom-light dark:focus-visible:outline-custom-dark shadow-sh mr-2"
            >
              {themeState ? (
                <img
                  src={lightMode}
                  alt="toogle-light"
                  className="p-0 w-5 h-5 sm:w-10 sm:h-10 2xl:w-12 2xl:h-12"
                />
              ) : (
                <img
                  src={darkMode}
                  alt="toogle-dark"
                  className="p-0 w-5 h-5 sm:w-12 sm:h-10 2xl:w-12 2xl:h-12"
                />
              )}
            </button>
            <h1 className="text-2xl ml-10 font-bold text-green-600 sm:text-5xl 2xl:text-7xl dark:text-green-400">
              Todo App
            </h1>
          </div>

          <Suspense fallback={<LoadingPage />}>
            <Router>
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
            </Router>
          </Suspense>

        </div>
      </div>
    </ErrorBoundary >
  );
};
