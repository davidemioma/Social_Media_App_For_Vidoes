import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/sanity";
import { uuid } from "uuidv4";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { postId, userId, comment } = JSON.parse(req.body);

  const data = await client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .insert("after", "comments[-1]", [
      {
        comment,
        _key: uuid(),
        postedBy: { _type: "postedBy", _ref: userId },
      },
    ])
    .commit();

  res.status(200).json(data);
}
