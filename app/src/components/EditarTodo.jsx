import { useForm } from "react-hook-form";
import { useEditTodos } from "@/api/todos";

export const EditarTodo = ({
  info: { title, description, _id: id },
  cancelar,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { mutate: editTodo } = useEditTodos();

  const onSubmit = (data) => {
    editTodo({ id, data });
    cancelar();
  };

  return (
    <>
      <form
        className="flex flex-col items-start h-4/5 w-full sm:w-500"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative w-full mb-16">
          <input
            className={`w-full h-12 p-4 border-b-2 border-transparent focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-blue-600  ${
              errors.title
                ? "focus-visible:border-red-600 border-red-600 border-b-2"
                : ""
            } rounded-sm dark:bg-gray-800 dark:text-white`}
            {...register("title", {
              minLength: 6,
              maxLength: 30,
            })}
            placeholder="Title..."
            autoComplete="off"
            defaultValue={title}
          />
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
            className={` w-full resize-none h-48 p-4 focus-visible:outline-none border-transparent border-2 rounded-sm focus-visible:border-2 focus-visible:border-blue-600 ${
              errors.description
                ? "focus-visible:border-red-600 border-red-600 border-b-2"
                : ""
            } dark:bg-gray-800 dark:text-white scrollbar-custom`}
            {...register("description", {
              minLength: 10,
              maxLength: 285,
            })}
            placeholder="Description..."
            autoComplete="off"
            maxLength="288"
            defaultValue={description}
          />
          {(errors.description?.type === "minLength" ||
            errors.description?.type === "maxLength") && (
            <p className="absolute top-30 text-red-600 p-4 pt-1">
              Description should have more than 10 and less than 285 characters
            </p>
          )}
        </div>

        <button
          className="disabled:bg-gray-500 text-lg uppercase p-2 text-white bg-blue-600 rounded h-10 w-40 hover:bg-blue-400 cursor-pointer transition-all duration-100 self-center dark:bg-blue-800 dark:hover:bg-blue-600"
          type="submit"
          placeholder="Editar"
          disabled={isSubmitting}
          title="Edit todo"
        >
          Edit
        </button>
      </form>
    </>
  );
};
