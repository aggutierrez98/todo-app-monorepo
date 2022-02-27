import { useRegister } from "@/api/users";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// getValues,

// useEffect(() => {
//   if (isSuccess) {
//     setTimeout(() => {
//       history.push({
//         pathname: "/login",
//         state: { email: getValues("email") },
//       });
//     }, 1000);
//   }
// }, [isSuccess]);

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();
  const { mutate: registerUser, isSuccess } = useRegister(setError);

  const onSubmit = async (user) => {
    registerUser(user);
  };

  // useEffect(() => {
  //   if (isError) {
  //     setError("email", {
  //       type: "credentials",
  //       message: "Email already exists",
  //     });
  //   }
  // }, [isError]);

  return (
    <div
      className="p-12 h-screen w-screen font-poppins dark:bg-gray-600 sm:dark:bg-gray-800 overflow-y-scroll overflow-x-hidden scrollbar-custom flex 
      flex-col items-center justify-center"
      id="app"
    >
      <h2 className="dark:text-white text-[30px] sm:text-[50px] text-gray-800 ">
        Register Page
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
               errors.name
                 ? "focus-visible:border-red-600 border-red-600 border-b-2"
                 : ""
             } dark:bg-gray-800 dark:text-white`}
              {...register("name", {
                required: true,
                minLength: 6,
                maxLength: 30,
              })}
              placeholder="Name..."
              autoComplete="off"
            />
            {errors.name?.type === "required" && (
              <p className="absolute top-10 text-red-600 dark:text-red-500 p-4">
                Name is required
              </p>
            )}
            {(errors.name?.type === "minLength" ||
              errors.name?.type === "maxLength") && (
              <p className="absolute top-10 text-red-600 dark:text-red-500 p-4">
                Name should be more than 6 and less than 30 characters
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
                required: true,
                minLength: 6,
                maxLength: 30,
              })}
              placeholder="Lastname..."
              autoComplete="off"
            />
            {errors.lastName?.type === "required" && (
              <p className="absolute top-30 text-red-600 dark:text-red-500 p-4 pt-1">
                Lastname is required
              </p>
            )}
            {(errors.lastName?.type === "minLength" ||
              errors.lastName?.type === "maxLength") && (
              <p className="absolute top-30 text-red-600 dark:text-red-500 p-4 pt-1">
                Lastname should be more than 6 and less than 30 characters
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
                required: true,
                minLength: 6,
                maxLength: 30,
                pattern: emailPattern,
              })}
              placeholder="Email..."
              autoComplete="off"
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
          </div>
          <button
            className="disabled:bg-gray-500 text-lg uppercase p-2 text-white bg-green-600 rounded h-10 w-40 hover:bg-green-400 cursor-pointer transition-all duration-100 self-center dark:bg-green-800 dark:hover:bg-green-600"
            type="submit"
            disabled={isSubmitting}
            title="Register button"
          >
            Register
          </button>
          <div className="self-start flex text-[18px] mt-8">
            <p>Already have an account?</p>
            <Link
              className="ml-2 underline dark:text-blue-400 mb-8 text-blue-600"
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
    </div>
  );
};
