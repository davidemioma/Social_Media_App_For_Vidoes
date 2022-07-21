import type { NextApiRequest, NextApiResponse } from "next";
import {
  userQuery,
  userPostsQuery,
  userLikedPostsQuery,
} from "../../../utils/sanity-queries";
import { client } from "../../../utils/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    const query = userQuery(`${id}`);

    const postsQuery = userPostsQuery(`${id}`);

    const likedPostsQuery = userLikedPostsQuery(`${id}`);

    const user = await client.fetch(query);

    const posts = await client.fetch(postsQuery);

    const likedPosts = await client.fetch(likedPostsQuery);

    res.status(200).json({ user: user[0], posts, likedPosts });
  }
}
