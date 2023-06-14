import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { GrPlayFill } from "react-icons/gr";
import "./artist.css";
import TrackListItem from "../TrackListItem/TrackListItem";
import { getArtistById } from "../../api";
import { getTrackByArtistId } from "../../api";
import { getImageById } from "../../api";
import Loader from "../../loader/loader";
import populateSongsWithTime from "../utils/populateSongsWithTime";
import { TrackForSearch } from "../../types/Track";
type MyParams = {
  artistId: string;
};
function Artist() {
  const { artistId } = useParams<keyof MyParams>() as MyParams;
  const [artistObject, setArtistObject] = useState<string>();
  const [tracksArray, setTracksArray] = useState<
    Array<TrackForSearch> | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [url, setUrl] = useState<string>();

  React.useEffect(() => {
    const getArtist = getArtistById(artistId).then((result) => {
      if (result.artists.length === 0) {
        setArtistObject("NO MATCHES FOUND");
      } else {
        setArtistObject(result.artists[0].name);
      }
    });
    const getTrack = getTrackByArtistId(artistId).then((res) => {
      setTracksArray(populateSongsWithTime<TrackForSearch>(res.recordings));
    });

    //после выполнения обоих запросов исключаем loader
    Promise.all([getArtist, getTrack]).then((r) => {
      setIsLoading(false);
    });
  }, [artistId]);

  getImageById(artistId).then((response) => {
    if (response.status === 404) {
      setUrl(`./musicplaceholder.jpg`);
    } else {
      setUrl(response.url);
    }
  });

  if (isLoading) {
    return <Loader />;
  } else {
    if (tracksArray == null) {
      return (
        <div className="artist-component">
          {" "}
          МУЗЫКАЛЬНЫЕ КОМПОЗИЦИИ НЕ НАЙДЕНЫ
        </div>
      );
    } else {
      return (
        <div className="artist-component">
          <div
            className="artist-box"
            style={{
              backgroundImage: `url(${url})`,
            }}
          >
            <div className="artist-image">
              {" "}
              <div className="artist-block">
                <div className="artist-name">{artistObject}</div>
                <div className="artist-actions">
                  <button className="button  grey-button">
                    <GrAdd />
                    <span className="text-in-button">Подписаться</span>
                  </button>
                  <button className="button">
                    <GrPlayFill />
                    <span className="text-in-button">Cлушать</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h1>Популярное</h1>
          {tracksArray.length <= 4 ? (
            <div className="popular-songs-in-one-column">
              {" "}
              {tracksArray.map((item) => (
                <TrackListItem track={item} key={item.id} />
              ))}
            </div>
          ) : tracksArray.length <= 12 ? (
            <div className="popular-songs-in-two-column">
              {tracksArray.map((item) => (
                <TrackListItem track={item} key={item.id} />
              ))}
            </div>
          ) : (
            <div className="popular-songs">
              {tracksArray.map((item) => (
                <TrackListItem track={item} key={item.id} />
              ))}
            </div>
          )}
        </div>
      );
    }
  }
}

export default Artist;
