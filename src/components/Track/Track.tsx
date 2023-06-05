import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./track.css";
import Actions from "../Actions/Actions";
import parseDurationToString from "../utils/parseDurationToString";
import { GrPlayFill } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { getTracktById } from "../../api";
import { getImageById } from "../../api";
import populateSongsWithTime from "../utils/populateSongsWithTime";
import Loader from "../../loader/loader";
import { Link } from "react-router-dom";
import { TrackForSearch } from "../../types/Track";

type MyParams = {
  trackId: string;
};

function Track() {
  const [trackItemArray, setTrackItemArray] = useState<Array<TrackForSearch>>();
  const { trackId } = useParams<keyof MyParams>() as MyParams;
  const [url, setUrl] = useState<string>();

  React.useEffect(() => {
    getTracktById(trackId).then((result) => {
      setTrackItemArray(
        populateSongsWithTime<TrackForSearch>(result.recordings)
      );
      return populateSongsWithTime(result.recordings);
    });
  }, [trackId]);

  if (trackItemArray == null) {
    return <Loader />;
  } else {
    getImageById(trackItemArray[0].releases[0].id).then((response) => {
      if (response.status === 404) {
        setUrl(`./musicplaceholder.jpg`);
      } else {
        setUrl(response.url);
      }
    });

    return (
      <div className="track-component">
        <div className="exact-track-block">
          <div
            className="image-block"
            style={{
              backgroundImage: `url(${url})`,
            }}
          ></div>
          <div className="description-of-track">
            <div className="top-description">
              <div className="track-name-box">
                <div className="track-name">{trackItemArray[0].title}</div>
                <Link
                  to={`/artist/${trackItemArray[0]["artist-credit"][0].artist.id}`}
                  className="link"
                  key={trackItemArray[0]["artist-credit"][0].artist.id}
                >
                  {trackItemArray[0]["artist-credit"].map((artist) => {
                    return <div>{artist.artist.name}</div>;
                  })}
                </Link>{" "}
              </div>
              <Actions />
            </div>
            <div className="bottom-description">
              <div className="play-track">
                <div className="play-button">
                  <button className="mobile-view-button">
                    <GrPrevious />
                  </button>
                  <button className="play-icon">
                    <GrPlayFill />
                  </button>
                  <button className="mobile-view-button">
                    <GrNext />
                  </button>
                </div>
                <div className="play-track-text">
                  {" "}
                  <Link
                    to={`/artist/${trackItemArray[0]["artist-credit"][0].artist.id}`}
                    className="link"
                    key={trackItemArray[0]["artist-credit"][0].artist.id}
                  >
                    {trackItemArray[0]["artist-credit"][0].artist.name}
                  </Link>{" "}
                  - {trackItemArray[0].title}
                </div>
              </div>
              <div className="time">
                {parseDurationToString(trackItemArray[0])}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Track;
