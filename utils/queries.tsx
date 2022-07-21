export const fetchPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getPosts`);

  const data = res.json();

  return data;
};

export const fetchPost = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`);

  const data = res.json();

  return data;
};

export const fetchSingleUser = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`
  );

  const data = res.json();

  return data;
};

export const fetchUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getUsers`);

  const data = res.json();

  return data;
};

export const fetchSearchResults = async (searchTerm: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${searchTerm}`
  );

  const data = res.json();

  return data;
};
