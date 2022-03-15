import { useForm } from "react-hook-form";
import { useAddTodos } from "@/api/todos";
import { useQueryClient } from "react-query";

export const AgregarTodo = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const userId = useQueryClient().getQueryData("user").uid;
  const { mutate: addTodo } = useAddTodos(userId);

  const onSubmit = async (todo) => {
    addTodo({ ...todo, userId });
    closeModal();
  };

  return (
    <>
      <form
        className="flex flex-col items-start w-full sm:w-500 h-4/5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative w-full mb-16">
          <input
            className={`w-full h-12 p-4 border-b-2 border-transparent focus-visible:outline-none focus-visible:border-b-2 rounded-sm
             focus-visible:border-green-600  ${
               errors.title
                 ? "focus-visible:border-red-600 border-red-600 border-b-2"
                 : ""
             } dark:bg-gray-800 dark:text-white`}
            {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              },
              minLength: {
                value: 6,
                message: "Title should be more than 6 characters",
              },
              maxLength: {
                value: 30,
                message: "Title should be less than 30 characters",
              },
            })}
            placeholder="Title..."
            autoComplete="off"
          />
          {errors.title && (
            <p className="absolute top-10 text-red-600 p-4">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="relative w-full mb-20">
          <textarea
            id="textarea"
            type="text"
            className={` w-full resize-none h-48 p-4 focus-visible:outline-none border-transparent border-2 rounded-sm focus-visible:border-2 
              focus-visible:border-green-600 ${
                errors.description
                  ? "focus-visible:border-red-600 border-red-600 border-b-2"
                  : ""
              } dark:bg-gray-800 dark:text-white scrollbar-custom`}
            {...register("description", {
              required: {
                value: true,
                message: "Description is required",
              },
              minLength: {
                value: 10,
                message: "Description should be more than 10 characters",
              },
              maxLength: {
                value: 285,
                message: "Description should be less than 285 characters",
              },
            })}
            placeholder="Description..."
            autoComplete="off"
            maxLength="288"
          />
          {errors.description && (
            <p className="absolute top-30 text-red-600 p-4 pt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <button
          className="disabled:bg-gray-500 text-lg uppercase p-2 text-white bg-green-600 rounded h-10 w-40 hover:bg-green-400 cursor-pointer transition-all 
          duration-100 self-center dark:bg-green-800 dark:hover:bg-green-600 focus-visible:outline-custom-light dark:focus-visible:outline-custom-dark"
          type="submit"
          disabled={isSubmitting}
          title="Add todo"
        >
          add todo
        </button>
      </form>
    </>
  );
};
