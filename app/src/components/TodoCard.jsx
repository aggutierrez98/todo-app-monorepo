import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import Modal from "react-modal";
import { useState, memo } from "react";
import { EditTodo } from "@c/EditTodo";
import { ConfirmDelete } from "@c/ConfirmDelete";
import { useEditTodos } from "@/api/todos.js";
Modal.setAppElement("#modal");

const InitTodoCard = ({ info }) => {

  const [modalOpen, setmodalOpen] = useState(false);
  const { mutate: editTodo } = useEditTodos();
  const [renderModal, setRenderModal] = useState({
    delete: false,
    edit: false,
  });

  const handleEditTodo = (e) => {
    e.stopPropagation()
    if (e.key && e.key !== "Enter") return
    setRenderModal({ delete: false, edit: true });
    setmodalOpen(true);
  };

  const handleDeleteTodo = (e) => {
    e.stopPropagation()
    if (e.key && e.key !== "Enter") return
    setRenderModal({ delete: true, edit: false });
    setmodalOpen(true);
  };

  const doneTodo = (e) => {
    if (e.key && e.key !== "Enter") return
    editTodo({ id: info._id, data: { ...info, done: !info.done } });
  };

  return (
    <>
      <li>
        <div
          title={`${info?.done ? "Undo" : "Do"} todo`}
          className={`flex justify-between items-center shadow-sh pl-3 p-2 sm:p-3 m-2 sm:text-xl rounded-sm animate-fadeIn animate-fadeOut dark:bg-gray-600 
            dark:text-white cursor-pointer focus-visible:outline-custom-light dark:focus-visible:outline-custom-dark 
             ${info?.done ? "dark:bg-gray-400 bg-gray-400 transition-all" : ""}`}
          onClick={doneTodo}
          onKeyDown={doneTodo}
          role="button"
          tabIndex={0}
        >
          <p className="ml-2 leading-6 relative flex truncate">
            {info.title}
            <span
              className={`truncate ${info?.done
                ? "mt-[2px] h-[2px] absolute self-center dark:bg-gray-900 bg-gray-700 w-full"
                : "hidden"
                }`}
            ></span>
          </p>
          <div className="min-w-max">
            {info.done && (
              <DoneIcon className="sm:!text-[40px] mr-2 sm:mr-3 ml-1 text-green-300" />
            )}
            <button
              title="Edit todo"
              onClick={handleEditTodo}
              onKeyDown={handleEditTodo}
              className="rounded-md p-1 sm:p-2 bg-blue-600 text-white cursor-pointer ml-1 sm:ml-3 md:ml-4 hover:bg-blue-400 transition-all
                dark:bg-blue-800 dark:hover:bg-blue-600 focus-visible:outline-custom-light dark:focus-visible:outline-custom-dark"
            >
              <EditIcon className=" sm:text-2xl" />
            </button>
            <button
              title="Delete todo"
              onClick={handleDeleteTodo}
              onKeyDown={handleDeleteTodo}
              className="rounded-md p-1 sm:p-2 bg-red-600 text-white cursor-pointer ml-1 sm:ml-3 md:ml-4 hover:bg-red-400 transition-all 
              dark:bg-red-800 dark:hover:bg-red-600 focus-visible:outline-custom-light dark:focus-visible:outline-custom-dark"
            >
              <DeleteOutlineIcon className="sm:text-2xl" />
            </button>
          </div>
        </div>
      </li>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => {
          setmodalOpen(false);
        }}
        className="absolute p-8 sm:p-15 overflow-auto outline-0 bg-white inset-auto top-2/4 left-2/4 mr--2/4 opacity-100 mr--50 -translate-y-2/4 
          -translate-x-2/4 rounded-md dark:bg-gray-800 focus-visible:outline-none w-4/5 sm:w-auto"
        overlayClassName="fixed inset-0 bg-over animate-fadeIn z-20"
      >
        {renderModal.delete ? (
          <ConfirmDelete
            id={info._id}
            cancel={() => {
              setmodalOpen(false);
            }}
          />
        ) : (
          <EditTodo
            info={info}
            cancel={() => {
              setmodalOpen(false);
            }}
          />
        )}
      </Modal>
    </>
  );
};

export const TodoCard = memo(InitTodoCard)

