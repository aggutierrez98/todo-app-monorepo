import { TodoList } from "@c/TodoList";
import { BottonAddTodo } from "@c/BottonAddTodo";
import { useToogleTheme } from "@h/useToogleTheme";
import darkMode from "@a/dark_mode_black_24dp.svg";
import lightMode from "@a/light_mode_black_24dp.svg";
import { UserInfoCard } from "@c/UserInfoCard";

function TodoApp() {
  const [themeState, toogleTheme] = useToogleTheme();

  return (
    <div
      className="pt-6 sm:p-12 h-screen w-screen font-poppins dark:bg-gray-800 overflow-y-scroll overflow-x-hidden scrollbar-custom"
      id="app"
    >
      <div className="flex flex-col m-2 items-center h-4/5">
        <div className="relative flex justify-center items-center 2xl:items-start w-500">
          <button
            title="Toogle theme"
            onClick={toogleTheme}
            className="2xl:p-2 absolute p-2 w-15 h-15 left-28 sm:left-16 2xl:-left-2 bg-green-400 rounded-full cursor-pointer hover:text-reen-400 transition-all dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-400"
          >
            {themeState ? (
              <img
                src={lightMode}
                alt="toogle-light"
                className="p-0 w-7 sm:w-10 2xl:w-12"
              />
            ) : (
              <img
                src={darkMode}
                alt="toogle-dark"
                className="p-0 w-7 sm:w-10 2xl:w-12"
              />
            )}
          </button>
          <h1 className="text-4xl ml-10 font-bold text-green-600 sm:text-5xl 2xl:text-7xl  dark:text-green-400">
            Todo App
          </h1>
        </div>

        <UserInfoCard />

        <div className="flex mt-4 w-full sm:w-500 md:w-700 2xl:w-1200 p-1 cellphone:p-5 flex-col ">
          <BottonAddTodo />
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
