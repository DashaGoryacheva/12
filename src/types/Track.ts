import { BaseType } from "./Base";

export interface SearchTrack {
  recordings: Array<TrackForSearch>;
}
export interface TrackForSearch extends BaseType {
  video: null;
  "artist-credit": Array<ArtistInfoOfTrack>;
  releases: Array<TrackReleases>;
}
export interface TrackReleases {
  id: string;
  title: string;
  "status-id": string;
  "release-group": {
    id: string;
    "primary-type": string;
  };
  date: string;
  country: string;
  "track-count": number;
}
export interface ArtistInfoOfTrack {
  artist: {
    id: string;
    name: string;
  };
}
