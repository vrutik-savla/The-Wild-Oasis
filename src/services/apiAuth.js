import supabase, { supabaseUrl } from "./supabase";

// 394. User Sign Up
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        //data for additional information of user
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

// 389. Authentication: User Login With Supabase
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  // console.log(data);
  return data;
}

// 390. Authorization: Protecting Routes
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  // console.log(data);

  if (error) throw new Error(error.message);

  return data?.user;
}

// 391. User Logout
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

// 397. Updating User Data and Password
export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1) Update password OR fullname
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, errorUpdateUser } = await supabase.auth.updateUser(updateData);

  if (errorUpdateUser) throw new Error(errorUpdateUser.message);

  if (!avatar) return data;

  // 2) Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3) Update avatar in the user data
  const { data: updatedUser, error } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error) throw new Error(error.message);

  return updatedUser;
}
