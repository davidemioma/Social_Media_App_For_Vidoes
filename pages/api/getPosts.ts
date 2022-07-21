import type { NextApiRequest, NextApiResponse } from "next";
import { postsQuery } from "../../utils/sanity-queries";
import { client } from "../../utils/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const posts = await client.fetch(postsQuery);

    res.status(200).json(posts);
  }
}
