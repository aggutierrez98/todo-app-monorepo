export const LoadingPage = () => {
    return (
        <div className="dark:bg-gray-800 flex w-screen h-screen items-center justify-center">
            <img
                className="animate-spin w-[150px] loading__image dark:loading__image-dark"
                src={"../assets/loading.png"}
                alt="loading"
            />
        </div>
    )
}
