import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// const baseUrl = import.meta.env.VITE_API_URL;
const baseUrl = "../api/";

export const registerUser = async (userData) =>
  axios.post(baseUrl + "users", userData);

export const loginUser = async (userData) =>
  axios.post(baseUrl + "users/login", userData);

export const renewLogin = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const data = await axios.get(baseUrl + "users/renew", {
        headers: { token: token },
      });

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      return data.data.user;
    } catch (error) {
      throw new Error(error.response.data.msg);
    }
  }
};

export const useLogin = (setError) => {
  const queryClient = useQueryClient();
  return useMutation(loginUser, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      queryClient.setQueryData("user", () => {
        return data.data.user;
      });
    },
    onError: (data) => {
      const errorData = data.response.data;

      setError("email", {
        type: "credentials",
        message: errorData.msg,
      });
      setError("password", {
        type: "credentials",
        message: errorData.msg,
      });
    },
  });
};

export const useRegister = (setError) => {
  const history = useHistory();
  return useMutation(registerUser, {
    onSuccess: (data) => {
      const { email } = data.data.user;

      setTimeout(() => {
        history.push({
          pathname: "/login",
          state: { email },
        });
      }, 1000);
    },

    onError: (data) => {
      const errorData = data.response.data;
      const { param, msg } = errorData.errors[0];

      setError(param, {
        type: "credentials",
        message: msg,
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
    queryClient.removeQueries("todos");
    queryClient.resetQueries();
  };

  return logout;
};
