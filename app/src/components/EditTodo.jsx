import { useForm } from "react-hook-form";
import { useEditTodos } from "@/api/todos";

export const EditTodo = ({ info: { title, description, _id: id }, cancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { mutate: editTodo } = useEditTodos();

  const onSubmit = (data) => {
    editTodo({ id, data });
    cancel();
  };

  console.log(errors);

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
              required: {
                value: true,
                message: "Title should be more than 6 characters",
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
            defaultValue={title}
          />
          {errors.title && (
            <p className="absolute top-30 text-red-600 p-4 pt-1">
              {errors.title.message}
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
              required: {
                value: true,
                message: "Description should be more than 10 characters",
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
            defaultValue={description}
          />
          {errors.description && (
            <p className="absolute top-30 text-red-600 p-4 pt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          className="disabled:bg-gray-500 text-lg uppercase p-2 text-white bg-blue-600 rounded h-10 w-40 hover:bg-blue-400 cursor-pointer transition-all 
          duration-100 self-center dark:bg-blue-800 dark:hover:bg-blue-600 focus-visible:outline-custom-light dark:focus-visible:outline-custom-dark"
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
