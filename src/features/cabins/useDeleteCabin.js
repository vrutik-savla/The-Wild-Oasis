import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

// 357. Abstracting React Query Into Custom Hooks
export function useDeleteCabin() {
  // 350. Mutations: Deleting a Cabin
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      // 351. Displaying Toasts (Notifications)
      toast.success("Cabin successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    // 351. Displaying Toasts (Notifications)
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
