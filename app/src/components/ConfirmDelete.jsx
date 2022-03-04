import { useDeleteTodos } from "@/api/todos";

export const ConfirmDelete = ({ id, cancel }) => {
  const { mutate: deleteTodo, isLoading: isSubmitting } = useDeleteTodos();

  const handleDelete = () => {
    deleteTodo(id);
    cancel();
  };

  return (
    <div className="flex flex-col h-4/5 w-full sm:w-500 items-center">
      <h2 className="text-2xl text self-center dark:text-white">
        Confirm delete todo?
      </h2>

      <div className="flex flex-col sm:flex-row mt-10 sm:mt-14">
        <button
          className="text-lg uppercase p-2 text-white bg-gray-600 rounded h-10 w-40 hover:bg-gray-400 cursor-pointer transition-all duration-100 self-center 
          dark:bg-gray-700 dark:hover:bg-gray-600 focus-visible:outline-custom-light dark:focus-visible:outline-custom-dark"
          type="submit"
          title="Cancel action"
          onClick={cancel}
        >
          Cancel
        </button>
        <button
          className="mt-3 sm:mt-0 sm:ml-5 text-lg uppercase p-2 disabled:bg-gray-600 text-white bg-red-600 rounded h-10 w-40 hover:bg-red-400 cursor-pointer
           transition-all duration-100 self-center dark:bg-red-800 dark:hover:bg-red-600 focus-visible:outline-custom-light dark:focus-visible:outline-custom-dark"
          type="submit"
          onClick={handleDelete}
          disabled={isSubmitting}
          title="Confirm delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
