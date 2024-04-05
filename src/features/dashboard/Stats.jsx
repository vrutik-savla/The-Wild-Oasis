import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

// 401. Displaying Statistics
function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1) Total Bookings
  const numBookings = bookings.length;

  // 2) Total sales
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3) Total Check-ins
  const checkins = confirmedStays.length;

  // 4) Occupancy rate
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);
  // num checked in nights / all available nights (numDays * numCabins)

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numBookings}
        color="blue"
      />

      <Stat
        icon={<HiOutlineBanknotes />}
        title="sales"
        value={formatCurrency(sales)}
        color="green"
      />

      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={checkins}
        color="indigo"
      />

      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy rate"
        value={Math.round(occupation * 100) + "%"}
        color="yellow"
      />
    </>
  );
}

export default Stats;
