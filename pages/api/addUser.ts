import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = JSON.parse(req.body);

  client
    .createIfNotExists(user)
    .then(() => res.status(200).json("Login successful"))
    .catch((err) => res.status(500).json(err));
}
