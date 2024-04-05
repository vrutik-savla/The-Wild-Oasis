import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

// 359. Fetching Applications Settings
export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, error, settings };
}
