import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// 389. Authentication: User Login With Supabase
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      // console.log(user);
      queryClient.setQueryData(["user"], user.user); //390. Authorization: Protecting Routes
      navigate("/dashboard", { replace: true });
    },

    onError: () => {
      // console.log("ERROR:", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading, error };
}
