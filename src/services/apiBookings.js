import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

// 377. Building the Bookings Table
// 379. API-Side Filtering: Filtering Bookings
// 382. API-Side Pagination: Paginating Bookings
export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  // FILTER
  // 379. API-Side Filtering: Filtering Bookings
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  // SORT
  // 380. API-Side Sorting: Sorting Bookings
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // PAGINATION
  // 382. API-Side Pagination: Paginating Bookings
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// 400. Computing Recent Bookings and Stays
// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// data: ISO string
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// // 400. Computing Recent Bookings and Stays
// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// 404. Displaying Stays for Current Day
// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

// 400. Computing Recent Bookings and Stays
export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

// 388. Deleting a Booking
export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
