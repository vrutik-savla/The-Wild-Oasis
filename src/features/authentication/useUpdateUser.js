import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

// 397. Updating User Data and Password
export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isLoading: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateCurrentUserApi,

    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");

      queryClient.setQueryData(["user"], user);

      queryClient.invalidateQueries({ queryKey: "user" });
    },

    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating, error };
}
