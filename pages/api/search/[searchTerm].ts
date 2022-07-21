import type { NextApiRequest, NextApiResponse } from "next";
import { searchPostsQuery } from "../../../utils/sanity-queries";
import { client } from "../../../utils/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { searchTerm } = req.query;

    const query = searchPostsQuery(`${searchTerm}`);

    const posts = await client.fetch(query);

    res.status(200).json(posts);
  }
}
