import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

// 404. Displaying Stays for Current Day
export function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { isLoading, activities };
}
