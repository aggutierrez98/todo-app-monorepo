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
              required: true,
              minLength: 6,
              maxLength: 30,
            })}
            placeholder="Title..."
            autoComplete="off"
          />
          {errors.title?.type === "required" && (
            <p className="absolute top-10 text-red-600 p-4">Title required</p>
          )}
          {(errors.title?.type === "minLength" ||
            errors.title?.type === "maxLength") && (
            <p className="absolute top-10 text-red-600 p-4">
              Title should have more than 6 and less than 30 characters
            </p>
          )}
        </div>
        <div className="relative w-full mb-20">
          <textarea
            id="textarea"
            type="text"
            className={` w-full resize-none h-48 p-4 focus-visible:outline-none border-transparent border-2 rounded-sm focus-visible:border-2 focus-visible:border-green-600 ${
              errors.description
                ? "focus-visible:border-red-600 border-red-600 border-b-2"
                : ""
            } dark:bg-gray-800 dark:text-white scrollbar-custom`}
            {...register("description", {
              required: true,
              minLength: 10,
              maxLength: 285,
            })}
            placeholder="Description..."
            autoComplete="off"
            maxLength="288"
          />
          {errors.description?.type === "required" && (
            <p className="absolute top-30 text-red-600 p-4 pt-1">
              Description required
            </p>
          )}
          {(errors.description?.type === "minLength" ||
            errors.description?.type === "maxLength") && (
            <p className="absolute top-30 text-red-600 p-4 pt-1">
              Description should have more than 10 and less than 285 characters
            </p>
          )}
        </div>
        <button
          className="disabled:bg-gray-500 text-lg uppercase p-2 text-white bg-green-600 rounded h-10 w-40 hover:bg-green-400 cursor-pointer transition-all duration-100 self-center dark:bg-green-800 dark:hover:bg-green-600"
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
