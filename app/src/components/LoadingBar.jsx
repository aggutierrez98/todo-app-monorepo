export const LoadingBar = ({ isLoading }) =>
  isLoading ? (
    <div className="text-xl flex items-center justify-center grow h-20 rounded-lg bg-blue-400 text-white m-3 dark:bg-blue-800">
      Loading...
    </div>
  ) : null;
