import loadingImage from '@a/loading.png';

export const LoadingPage = () => {
    return (
        <div className="dark:bg-gray-800 flex w-screen h-screen items-center justify-center">
            <img
                className="animate-spin w-[100px] sm:w-[125px] xl:w-[150px] loading__image dark:loading__image-dark"
                src={loadingImage}
                alt="loading"
            />
        </div>
    )
}
