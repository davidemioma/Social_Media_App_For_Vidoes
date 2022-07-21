import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/sanity";
import { commentsQuery } from "../../utils/sanity-queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { postId } = req.query;

  const comments = await client.fetch(commentsQuery, { postId });

  res.status(200).json(comments);
}
