import loadingImage from '@a/loading.png';

export const LoadingBar = ({ isLoading }) =>
  isLoading ? (
    <div className="flex items-center justify-center w-full mt-8 mb-8">
      <img
        className="animate-spin w-[25px] sm:w-[35px] xl:w-[45px] loading__image dark:loading__image-dark"
        src={loadingImage}
        alt="loading"
      />
    </div>
  ) : null;
