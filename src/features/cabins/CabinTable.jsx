import { useCabins } from "./useCabins";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// 349. Fetching Cabin Data
// 371. Building a Reusable Table
function CabinTable() {
  // 357. Abstracting React Query Into Custom Hooks
  const { isLoading, cabins } = useCabins();

  // 375. Client-Side Filtering: Filtering Cabins
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resourceName="cabins" />;

  // FILTER
  // 375. Client-Side Filtering: Filtering Cabins
  const filterValue = searchParams.get("discount") || "all";
  // console.log(filterValue);
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // SORT
  // 376. Client-Side Sorting: Sorting Cabins
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  // 373. Building a Reusable Context Menu
  return (
    <Menus>
      <Table $columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        {/* 372. Applying the Render Props Pattern */}
        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
