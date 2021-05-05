import { NextApiRequest, NextApiResponse } from "next";
import { customGet } from "../../utils/customGet";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query?.q;
  const searchResults = await customGet(
    `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=album,track,artist,playlist&limit=50`,
    { req, res }
  );
  res.status(200).json(searchResults);
};
