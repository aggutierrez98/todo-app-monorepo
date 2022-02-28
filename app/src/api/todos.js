import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const baseUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL : "../api/";

export const getTodos = async (userId, limit, pageParam) => {
  const from = (pageParam - 1) * limit;

  const { data } = await axios.get(
    baseUrl + `todos?from=${from}&limit=${limit}&userId=${userId}`,
    {
      headers: { token: localStorage.getItem("token") || "" },
    }
  );
  return data;
};

export const addTodo = (todo) =>
  axios.post(baseUrl + "todos", todo, {
    headers: { token: localStorage.getItem("token") || "" },
  });

export const editTodo = ({ id, data: todo }) =>
  axios.put(baseUrl + `todos/${id}`, todo, {
    headers: { token: localStorage.getItem("token") || "" },
  });

export const deleteTodo = (id) =>
  axios.delete(baseUrl + `todos/${id}`, {
    headers: { token: localStorage.getItem("token") || "" },
  });

export const useAddTodos = () => {
  const queryClient = useQueryClient();
  return useMutation(addTodo, {
    onSuccess: (data) => {
      const userId = queryClient.getQueryData("user").uid;
      queryClient.setQueryData(["todos", userId], (oldQueryData) => {
        const newTodo = data.data.data;

        const { pages } = oldQueryData;
        pages[0].data = [newTodo, ...oldQueryData.pages[0].data];

        return {
          ...oldQueryData,
          pages,
        };
      });
    },
  });
};

export const useEditTodos = () => {
  const queryClient = useQueryClient();
  return useMutation(editTodo, {
    onSuccess: (data) => {
      const userId = queryClient.getQueryData("user").uid;
      queryClient.setQueryData(["todos", userId], (oldQueryData) => {
        const editedTodo = data.data.data;

        let { pages } = oldQueryData;
        pages = pages.map((pagesUnity) => ({
          ...pagesUnity,
          data: pagesUnity.data.map((page) => {
            if (page._id === editedTodo._id) {
              return editedTodo;
            }

            return page;
          }),
        }));

        return {
          ...oldQueryData,
          pages,
        };
      });
    },
  });
};

export const useDeleteTodos = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTodo, {
    onSuccess: (data) => {
      const userId = queryClient.getQueryData("user").uid;
      queryClient.setQueryData(["todos", userId], (oldQueryData) => {
        const id = data.data.data;

        let { pages } = oldQueryData;
        pages = pages.map((pagesUnity) => ({
          ...pagesUnity,
          data: pagesUnity.data.filter((page) => page._id !== id),
        }));

        return {
          ...oldQueryData,
          pages,
        };
      });
    },
  });
};
