export const ErrorBar = ({ isError }) =>
  isError ? (
    <div className="text-xl flex items-center justify-center grow h-20 rounded-lg bg-red-600 text-white m-3 dark:bg-red-800">
      Error loading todos.
    </div>
  ) : null;
