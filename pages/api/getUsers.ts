import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/sanity";
import { allUsersQuery } from "../../utils/sanity-queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = await client.fetch(allUsersQuery);

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(200).json([]);
  }
}
