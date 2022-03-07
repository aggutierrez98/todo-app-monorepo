import loadingImage from '@a/loading.png';

export const LoadingPage = () => {
    return (
        <div className="fixed inset-0 bg-over animate-fadeIn z-20 opacity-25 flex items-center justify-center">
            <div className="">
                <img
                    className="animate-spin w-[100px] sm:w-[125px] xl:w-[150px] loading__image dark:loading__image-dark"
                    src={loadingImage}
                    alt="loading"
                />
            </div>
        </div>
    )
}