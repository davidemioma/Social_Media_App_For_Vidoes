import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const post = JSON.parse(req.body);

  client
    .create(post)
    .then(() => res.status(200).json("Post Uploaded"))
    .catch((err) => res.status(500).json(err));
}
