import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

// 349. Fetching Cabin Data
function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>

        {/* 375. Client-Side Filtering: Filtering Cabins */}
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />

        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
