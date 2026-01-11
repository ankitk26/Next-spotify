import type { DefaultSession } from "next-auth";

interface MyUser {
	name?: string | null;
	email?: string | null;
	picture?: string | null;
	image?: string | null;
	accessToken?: string | null;
	expires_at?: number;
}

export interface MySession extends Omit<DefaultSession, "user"> {
	user?: MyUser;
	expires: string;
}

export interface SpotifyImage {
	height: number | null;
	url: string;
	width: number | null;
}

export interface Category {
	id: string;
	name: string;
	icons: SpotifyImage[];
}

export interface Album {
	id: string;
	name: string;
	artists: Artist[];
	images: SpotifyImage[];
	album_type?: string;
	release_date: string;
	tracks: {
		total: number;
		items: Track[];
	};
}

export interface Artist {
	id: string;
	name: string;
	images: SpotifyImage[];
	followers?: {
		total: number;
	};
	genres?: string[];
}

export interface Track {
	id: string;
	name: string;
	album: Album;
	artists: Artist[];
	duration_ms: number;
	preview_url: string;
}

export interface Playlist {
	description?: string;
	id: string;
	images: SpotifyImage[];
	name: string;
	owner: {
		id: string;
		display_name?: string;
	};
	items?: [{ added_at: string; track: Track }];
	tracks: {
		items: [{ added_at: string; track: Track }];
		total: number;
		next?: string;
	};
	type: string;
	total?: number;
}

export interface SearchResults {
	albums?: {
		items: Album[];
	};
	artists?: {
		items: Artist[];
	};
	playlists?: {
		items: Playlist[];
	};
	tracks?: {
		items: Track[];
	};
}
