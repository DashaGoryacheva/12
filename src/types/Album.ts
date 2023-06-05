import { BaseType } from "./Base";

export interface Albums {
  title: string;
  id: string;
  media: Array<AlbumMedia>;
}
interface AlbumMedia {
  tracks: Array<AlbumTracks>;
}
export interface AlbumTracks extends BaseType {
  position: number;
  recording: BaseType;
}

export interface AlbumWithArtistInfo {
  releases: Array<AlbumWithArtist>;
}
export interface AlbumWithArtist {
  id: string;
  title: string;
  "artist-credit": Array<ArtistOfAlbum>;
}
export interface ArtistOfAlbum {
  artist: {
    id: string;
    name: string;
  };
}
