import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

// 377. Building the Bookings Table
function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>

        {/* 379. API-Side Filtering: Filtering Bookings */}
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
