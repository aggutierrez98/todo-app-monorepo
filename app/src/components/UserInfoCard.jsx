import { useLogout } from "@/api/users";
import { useEffect } from "react";
import { useState } from "react";
import { useQueryClient } from "react-query";
import PersonIcon from "@mui/icons-material/Person";
import Modal from "react-modal";
Modal.setAppElement("#modal");

export const UserInfoCard = () => {
  const queryClient = useQueryClient();
  const [userData, setUserData] = useState();
  const [modalUserDataOpen, setModalUserDataOpen] = useState(false);
  const logout = useLogout();

  useEffect(() => {
    setUserData(queryClient.getQueryData("user"));
  }, [queryClient]);

  return (
    <>
      <div
        className="fixed right-[20px] top-[13px] w-[200px] lg:w-[300px] xl:w-[400px] hidden md:flex flex-col dark:bg-gray-600 p-2 text-[15px]
          lg:text-[17px] xl:text-[18px] 2xl:text-[21px] bg-white dark:text-white shadow-sh rounded-sm z-10"
        id="userInfoCard"
      >
        <div className="flex truncate ml-1">
          <p className="truncate h-5 lg:h-6 xl:h-8" data-test-id={userData?.name}>
            {userData?.name}
          </p>
          <p className="ml-1 truncate h-5 lg:h-6 xl:h-8" data-test-id={userData?.lastName}>
            {userData?.lastName}
          </p>
        </div>
        <p className="truncate ml-1 h-5 lg:h-6 xl:h-8" data-test-id={userData?.email}>
          {userData?.email}
        </p>
        <button
          onClick={logout}
          title="Logout"
          className="dark:bg-gray-800 mt-2 lg:mt-3 xl:mt-4 rounded-xl 2xl:h-10 bg-gray-400 hover:bg-opacity-80 dark:hover:bg-opacity-80 transition-all ease
            focus-visible:outline-custom-light dark:focus-visible:outline-custom-dark"
        >
          Logout
        </button>
      </div>
      <div
        className="flex md:hidden fixed top-5 right-5 z-10"
        id="userInfoCard"
      >
        <button
          onClick={() => setModalUserDataOpen(true)}
          className="dark:bg-gray-600 p-2 cellphone:p-4 text-[15px] bg-white dark:text-white shadow-sh 
            rounded-full focus-visible:outline-custom-light dark:focus-visible:outline-custom-dark"
        >
          <PersonIcon />
        </button>
        <Modal
          isOpen={modalUserDataOpen}
          onRequestClose={() => setModalUserDataOpen(false)}
          className="absolute p-8 sm:p-15 overflow-auto outline-0 bg-white inset-auto top-2/4 left-2/4 mr--2/4 opacity-100 mr--50 -translate-y-2/4 
          -translate-x-2/4 rounded-md dark:bg-gray-800 focus-visible:outline-none w-4/5 sm:w-auto"
          overlayClassName="fixed inset-0 bg-over font-poppins animate-fadeIn z-20"
        >
          <div className="flex-col text-[20px] dark:text-white rounded-sm z-10">
            <span className="flex truncate ml-1">
              <p data-test-id={userData?.name}>{userData?.name}</p>
              <p className="ml-1" data-test-id={userData?.lastName}>
                {userData?.lastName}
              </p>
            </span>
            <p className="truncate ml-1" data-test-id={userData?.email}>
              {userData?.email}
            </p>
            <button
              onClick={logout}
              className="dark:bg-gray-600 mt-6 rounded-xl h-10 bg-gray-400 hover:bg-opacity-80 dark:hover:bg-gray-500 transition-all ease w-full
                focus-visible:outline-custom-light dark:focus-visible:outline-custom-dark"
            >
              Logout
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};
