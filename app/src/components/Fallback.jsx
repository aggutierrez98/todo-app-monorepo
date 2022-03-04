import { useHistory } from "react-router-dom";

export const Fallback = () => {
  const history = useHistory()

  return (
    <div className="p-12 h-screen w-screen font-poppins dark:bg-gray-800">
      <div className="flex flex-col m-2 items-center justify-center h-4/5">
        <h1 className="font-bold text-5xl text-red-600 sm:text-5xl 2xl:text-7xl dark:text-red-400">
          Ups... Something went wrong
        </h1>
        <div className="flex text-[18px] mt-10">
          <p className="text-black dark:text-white">Go back to main page: </p>
          <button
            className="ml-2 underline dark:text-blue-400 mb-8 text-blue-600 focus-visible:outline-custom-light dark:focus-visible:outline-custom-dark "
            onClick={() => {
              if (history.location.pathname === "/") {
                history.go(0)
              } else {
                history.push("/")
              }
            }}
          >
            Click here
          </button>
        </div>
      </div>
    </div>
  )
};
