import type { NextApiRequest, NextApiResponse } from "next";
import { postDetailQuery } from "../../../utils/sanity-queries";
import { client } from "../../../utils/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    const query = postDetailQuery(`${id}`);

    const post = await client.fetch(query);

    res.status(200).json(post[0]);
  }
}
