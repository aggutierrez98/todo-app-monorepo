import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import Modal from "react-modal";
import { AgregarTodo } from "@c/AgregarTodo";
Modal.setAppElement("#modal");

export const BottonAddTodo = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const openModal = () => {
    setmodalOpen(true);
  };

  const closeModal = () => {
    setmodalOpen(false);
  };

  return (
    <>
      <div className="flex items-center self-end rounded-lg sm:text-xl 2xl:text-2xl shadow-sh pl-5 pr-3 p-2 m-3 w-50 dark:bg-gray-600 dark:text-white">
        <h2 className="mr-5 justify-self-center">Add Todo</h2>
        <button
          title="Add todo"
          className="outline-none focus-visible:outline-none text-green-600 cursor-pointer hover:text-green-400 transition-all"
          onClick={openModal}
        >
          <AddCircleIcon className="text-20px sm:text-40px p-0" />
        </button>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="p-8 sm:p-15 w-4/5 sm:w-auto absolute p-15 overflow-auto outline-0 bg-white inset-auto top-2/4 left-2/4 mr--2/4 opacity-100 mr--50 -translate-y-2/4 -translate-x-2/4 rounded-md dark:bg-gray-800 focus-visible:outline-none"
        overlayClassName="fixed inset-0 bg-over font-poppins animate-fadeIn z-20"
      >
        <AgregarTodo closeModal={closeModal} />
      </Modal>
    </>
  );
};
