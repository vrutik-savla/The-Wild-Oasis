import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

// 357. Abstracting React Query Into Custom Hooks
export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
