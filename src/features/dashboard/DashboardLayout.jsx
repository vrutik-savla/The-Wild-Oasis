import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import TodayActivity from "../check-in-out/TodayActivity";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

// 399. Building the Dashboard Layout
function DashboardLayout() {
  // 400. Computing Recent Bookings and Stays
  // 401. Displaying Statistics
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const {
    numDays,
    confirmedStays,
    isLoading: isLoadingStays,
  } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  // console.log(bookings, stays);

  return (
    <StyledDashboardLayout>
      {/* 401. Displaying Statistics */}
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />

      {/* 404. Displaying Stays for Current Day */}
      <TodayActivity />

      {/* 403. Displaying a Pie Chart */}
      <DurationChart confirmedStays={confirmedStays} />

      {/* 402. Displaying a Line Chart With the Recharts Library */}
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
