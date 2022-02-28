import { useLogin } from "@/api/users";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const LoginPage = ({ location }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();
  const { mutate: login } = useLogin(setError);

  const onSubmit = async (user) => {
    login(user);
  };

  return (
    <div
      className="pt-6 p-12 h-screen w-screen font-poppins  dark:bg-gray-600 sm:dark:bg-gray-800 overflow-y-scroll overflow-x-hidden scrollbar-custom flex
        flex-col items-center justify-center"
      id="app"
    >
      <h2 className="dark:text-white text-[35px] sm:text-[50px] text-gray-800 ">
        Login Page
      </h2>
      <div
        className="flex flex-col m-0 sm:m-2 items-center dark:bg-gray-600 sm:shadow-mh rounded-sm dark:text-white w-screen h-screen
      sm:h-auto sm:w-[700px]"
      >
        <form
          className="mt-8 sm:mt-20 flex flex-col items-start w-4/5 h-4/5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative w-full mb-12 sm:mb-20">
            <input
              className={`w-full h-12 p-4 border-b-2 border-transparent focus-visible:outline-none focus-visible:border-b-2 rounded-sm
             focus-visible:border-green-600  ${
               errors.email
                 ? "focus-visible:border-red-600 border-red-600 border-b-2"
                 : ""
             } dark:bg-gray-800 dark:text-white`}
              {...register("email", {
                required: true,
                minLength: 6,
                maxLength: 30,
                pattern: emailPattern,
              })}
              placeholder="Email..."
              autoComplete="off"
              defaultValue={location.state?.email ?? ""}
            />
            {errors.email?.type === "required" && (
              <p className="absolute top-30 text-red-600 dark:text-red-500 p-4 pt-1">
                Email is required
              </p>
            )}
            {(errors.email?.type === "minLength" ||
              errors.email?.type === "maxLength") && (
              <p className="absolute top-30 text-red-600 dark:text-red-500 p-4 pt-1">
                Email should be more than 6 and less than 30 characters
              </p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="absolute top-30 text-red-600 dark:text-red-500 p-4 pt-1">
                Email should be valid
              </p>
            )}
            {errors.email?.type === "credentials" && (
              <p className="absolute top-30 text-red-600 dark:text-red-500 p-4 pt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative w-full mb-12 sm:mb-20">
            <input
              className={`w-full h-12 p-4 border-b-2 border-transparent focus-visible:outline-none focus-visible:border-b-2 rounded-sm
             focus-visible:border-green-600  ${
               errors.password
                 ? "focus-visible:border-red-600 border-red-600 border-b-2"
                 : ""
             } dark:bg-gray-800 dark:text-white`}
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 30,
              })}
              type="password"
              placeholder="Password..."
              autoComplete="off"
            />
            {errors.password?.type === "required" && (
              <p className="absolute top-30 text-red-600 dark:text-red-500 p-4 pt-1">
                Password is required
              </p>
            )}
            {(errors.password?.type === "minLength" ||
              errors.password?.type === "maxLength") && (
              <p className="absolute top-30 text-red-600 dark:text-red-500 p-4 pt-1">
                Password should be more than 6 and less than 30 characters
              </p>
            )}
            {errors.password?.type === "credentials" && (
              <p className="absolute top-30 text-red-600 dark:text-red-500 p-4 pt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            className="disabled:bg-gray-500 text-lg uppercase p-2 text-white bg-green-600 rounded h-10 w-40 hover:bg-green-400 cursor-pointer
             transition-all duration-100 self-center dark:bg-green-700 dark:hover:bg-green-600"
            type="submit"
            disabled={isSubmitting}
            title="Login button"
          >
            Login
          </button>
          <div className="self-start flex text-[18px] mt-8">
            <p>Dont have account?</p>
            <Link
              className="ml-2 underline dark:text-blue-400 text-blue-600 mb-8"
              to="/register"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
