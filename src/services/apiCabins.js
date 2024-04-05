import supabase, { supabaseUrl } from "./supabase";

// 344. Connecting Supabase With Our React App
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
// So let's just recap. So from the supabase client we can now create queries with the from method. And so then we specify the name of the table and then the fields that we want. And so here we want basically all of them. And so this returns a promise which we then await. And the result of that gives us the data and a possible error. So if there is no error, then we simply return that data. And so now we are ready to use this service anywhere.

// 353. Creating a New Cabin
// 355. Uploading Images to Supabase
// 356. Editing a Cabin
export async function createEditCabin(newCabin, id) {
  // console.log(newCabin, id);

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://bagmhqpaglysxekrbvvo.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1. Create/Edit Cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id)
    query = query.insert([
      // {
      //    some_column: "someValue",
      //    other_column: "otherValue",
      // },
      { ...newCabin, image: imagePath },
    ]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload Image
  if (hasImagePath) return data; // 358. Duplicating Cabins

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin If their was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

// 350. Mutations: Deleting a Cabin
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
