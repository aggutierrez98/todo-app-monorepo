import { useRegister } from "@/api/users";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoadingPage } from "@p/LoadingPage";

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();
  const { mutate: registerUser, isSuccess, isLoading } = useRegister(setError);

  const onSubmit = async (user) => {
    registerUser(user);
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      <div
        className="flex flex-col mx-0 sm:mt-8 sm:mx-2 items-center dark:bg-gray-600 sm:shadow-mh sm:rounded-sm dark:text-white w-full h-full
          sm:h-auto sm:w-[700px] mt-4"
      >
        <form
          className="mt-8 sm:mt-20 flex flex-col items-start w-4/5 h-4/5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative w-full mb-12 sm:mb-20">
            <input
              className={`w-full h-12 p-4 border-b-2 border-transparent focus-visible:outline-none focus-visible:border-b-2 rounded-sm
             focus-visible:border-green-600  ${
               errors.name
                 ? "focus-visible:border-red-600 border-red-600 border-b-2"
                 : ""
             } dark:bg-gray-800 dark:text-white`}
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
                minLength: {
                  value: 6,
                  message: "Name should be more than 6 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Name should be less than 30 characters",
                },
              })}
              placeholder="Name..."
              autoComplete="off"
            />
            {errors.name && (
              <p className="absolute top-30 text-red-600 dark:text-red-500 p-4 pt-1">
                {" "}
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="relative w-full mb-12 sm:mb-20">
            <input
              className={`w-full h-12 p-4 border-b-2 border-transparent focus-visible:outline-none focus-visible:border-b-2 rounded-sm
             focus-visible:border-green-600  ${
               errors.lastName
                 ? "focus-visible:border-red-600 border-red-600 border-b-2"
                 : ""
             } dark:bg-gray-800 dark:text-white`}
              {...register("lastName", {
                required: {
                  value: true,
                  message: "Lastname is required",
                },
                minLength: {
                  value: 6,
                  message: "Lastname should be more than 6 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Lastname should be less than 30 characters",
                },
              })}
              placeholder="Lastname..."
              autoComplete="off"
            />
            {errors.lastName && (
              <p className="absolute top-30 text-red-600 dark:text-red-500 p-4 pt-1">
                {" "}
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="relative w-full mb-12 sm:mb-20">
            <input
              className={`w-full h-12 p-4 border-b-2 border-transparent focus-visible:outline-none focus-visible:border-b-2 rounded-sm
             focus-visible:border-green-600  ${
               errors.email
                 ? "focus-visible:border-red-600 border-red-600 border-b-2"
                 : ""
             } dark:bg-gray-800 dark:text-white`}
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                minLength: {
                  value: 6,
                  message: "Email should be more than 6 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Email should be less than 30 characters",
                },
                pattern: {
                  value: emailPattern,
                  message: "Email should be valid",
                },
              })}
              placeholder="Email..."
              autoComplete="off"
            />
            {errors.email && (
              <p className="absolute top-30 text-red-600 dark:text-red-500 p-4 pt-1">
                {" "}
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
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 6,
                  message: "Password should be more than 6 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Password should be less than 15 characters",
                },
              })}
              type="password"
              placeholder="Password..."
              autoComplete="off"
            />
            {errors.password && (
              <p className="absolute top-30 text-red-600 dark:text-red-500 p-4 pt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            className="disabled:bg-gray-500 text-lg uppercase p-2 text-white bg-green-600 rounded h-10 w-40 hover:bg-green-400 cursor-pointer 
              transition-all duration-100 self-center dark:bg-green-800 dark:hover:bg-green-600 focus-visible:outline-custom-light
              dark:focus-visible:outline-custom-dark"
            type="submit"
            disabled={isSubmitting}
            title="Register button"
          >
            Register
          </button>
          <div className="self-start flex text-[18px] mt-8">
            <p>Already have an account?</p>
            <Link
              className="ml-2 underline dark:text-blue-400 mb-8 text-blue-600 focus-visible:outline-custom-light dark:focus-visible:outline-custom-dark"
              to="/login"
            >
              Login
            </Link>
          </div>
        </form>
        {isSuccess && (
          <div className="text-xl flex px-5 items-center justify-center grow h-20 rounded-lg bg-green-400 text-white m-3 dark:bg-green-800">
            User successfully registered!
          </div>
        )}
      </div>
    </>
  );
}

export default RegisterPage;
