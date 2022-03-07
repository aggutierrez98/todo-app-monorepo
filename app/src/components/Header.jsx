import { useToogleTheme } from "@h/useToogleTheme";
import darkMode from "@a/dark_mode_black_24dp.svg";
import lightMode from "@a/light_mode_black_24dp.svg";

export const Header = () => {
    const [themeState, toogleTheme] = useToogleTheme();

    return (
        <header className="relative flex items-center 2xl:items-start mt-6 mr-5">
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
        </header>
    )
}
