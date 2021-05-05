import type { NextApiRequest, NextApiResponse } from "next";
import { customGet } from "../../utils/customGet";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const playlists = await customGet("https://api.spotify.com/v1/me/playlists", {
    req,
    res,
  });

  res.status(200).json(playlists);
};
