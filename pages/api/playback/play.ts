import { NextApiRequest, NextApiResponse } from "next";
import { customPut } from "../../../utils/customPut";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const resp = await customPut("https://api.spotify.com/v1/me/player/play", {
      req,
      res,
    });
    console.log(resp);
    res.status(200).json({ message: "Play Successful" });
  } catch (err) {
    console.log(err.message);
  }
};
