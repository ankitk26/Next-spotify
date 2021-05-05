import { GetServerSideProps } from "next";
import AlbumList from "../../components/AlbumList";
import ArtistList from "../../components/ArtistList";
import Heading from "../../components/Heading";
import TracksTable from "../../components/TracksTable";
import { Album, Artist, Track } from "../../types/types";
import { customGet } from "../../utils/customGet";

interface Albums {
  items: Album[];
}

interface SingleArtistProps {
  artist: Artist;
  artistTracks: Track[];
  artistAlbums: Albums;
  artistSingles: Albums;
  artistAppearsOn: Albums;
  artistCompilation: Albums;
  relatedArtists: {
    artists: [Artist];
  };
}

export default function SingleArtist({
  artist,
  artistTracks,
  artistAlbums,
  artistSingles,
  artistAppearsOn,
  artistCompilation,
  relatedArtists,
}: SingleArtistProps) {
  return (
    <>
      <div className="flex items-end gap-6 p-4">
        {artist && (
          <>
            {artist.images.length > 0 ? (
              <img
                src={artist.images[0].url}
                alt={artist.name}
                className="object-contain rounded-full w-52 h-52"
              />
            ) : (
              <span className="flex items-center justify-center w-52 h-52 bg-paper text-9xl material-icons">
                audiotrack
              </span>
            )}
            <div className="flex flex-col items-start gap-3">
              <h2 className="text-5xl font-bold">{artist.name}</h2>
              <span className="text-sm">
                {artist.followers.total} followers
              </span>
              <div className="flex items-center gap-5 text-sm">
                {artist.genres.map((genre) => (
                  <span key={genre}>{genre}</span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-4">
        <Heading text="Popular" />
        <TracksTable tracks={artistTracks} noAlbum noArtist />
      </div>

      {artistAlbums?.items.length > 0 && (
        <div className="p-4 mt-5">
          <Heading text="Albums" />
          <AlbumList albums={artistAlbums.items} />
        </div>
      )}

      {artistSingles?.items.length > 0 && (
        <div className="p-4 mt-5">
          <Heading text="Singles" />
          <AlbumList albums={artistSingles.items} />
        </div>
      )}

      {artistAppearsOn?.items.length > 0 && (
        <div className="p-4 mt-5">
          <Heading text="Appears on" />
          <AlbumList albums={artistAppearsOn.items} />
        </div>
      )}

      {artistCompilation?.items.length > 0 && (
        <div className="p-4 mt-5">
          <Heading text="Compilation" />
          <AlbumList albums={artistCompilation.items} />
        </div>
      )}

      {relatedArtists?.artists.length > 0 && (
        <div className="p-4 mt-5">
          <Heading text="Fans also like" />
          <ArtistList artists={relatedArtists.artists} />
        </div>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const artistId = ctx.params.artistId;

  const artist = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}`,
    ctx
  );

  const artistTracks = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=from_token`,
    ctx
  );

  const artistAlbums = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album`,
    ctx
  );

  const artistSingles = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single`,
    ctx
  );

  const artistAppearsOn = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=appears_on`,
    ctx
  );

  const artistCompilation = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=compilation`,
    ctx
  );

  const relatedArtists = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
    ctx
  );

  return {
    props: {
      artist,
      artistTracks: artistTracks.tracks,
      artistAlbums,
      artistSingles,
      artistAppearsOn,
      artistCompilation,
      relatedArtists,
    },
  };
};
