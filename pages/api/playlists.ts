import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import type { Playlist } from "@/types/types";
import { customGet } from "@/utils/custom-get";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });

	const playlists: { items: Playlist[] } = await customGet(
		"https://api.spotify.com/v1/me/playlists",
		session
	);

	res.status(200).json(playlists);
}
