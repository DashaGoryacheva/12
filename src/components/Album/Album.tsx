import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./album.css";
import parseDurationToString from "../utils/parseDurationToString";
import Actions from "../Actions/Actions";
import { getAlbumById } from "../../api";
import Loader from "../../loader/loader";
import populateSongsWithTime from "../utils/populateSongsWithTime";
import { Link } from "react-router-dom";
import { getImageById } from "../../api";
import { AlbumTracks } from "../../types/Album";
import { getAlbumByIdWithTracks } from "../../api";
import { AlbumWithArtist } from "../../types/Album";

type MyParams = {
  albumId: string;
};
function Album() {
  const { albumId } = useParams<keyof MyParams>() as MyParams;
  const [albumObject, setAlbumObject] = useState<AlbumWithArtist>();
  const [tracksArrayForAlbum, setTracksArrayForAlbum] = useState<
    Array<AlbumTracks> | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [url, setUrl] = useState<string>();
  React.useEffect(() => {
    const getTracksOfAlbum = getAlbumByIdWithTracks(albumId)
      .then((result) => {
        setTracksArrayForAlbum(
          populateSongsWithTime<AlbumTracks>(result.media[0].tracks)
        );

        return result;
      })
      .then((res) => {
        return getImageById(res.id).then((response) => {
          if (response.status === 404) {
            setUrl(`./musicplaceholder.jpg`);
          } else {
            setUrl(response.url);
          }
        });
      });

    const getAlbum = getAlbumById(albumId).then((result) => {
      setAlbumObject(result.releases[0]);
    });
    //после выполнения обоих запросов исключаем loader
    Promise.all([getAlbum, getTracksOfAlbum]).then((r) => {
      setIsLoading(false);
    });
  }, [albumId]);

  if (isLoading) {
    return <Loader />;
  } else {
    if (albumObject == null) {
      return <div className="album-component"> АЛЬБОМ НЕ НАЙДЕН</div>;
    } else {
      return (
        <div className="album-component">
          <div className="album-box">
            <div className="album-top-box">
              <div
                className="album-image-block"
                style={{
                  backgroundImage: `url(${url})`,
                }}
              ></div>
              <div className="album-description">
                <div className="top-album-description">
                  <div className="album-name">{albumObject.title}</div>

                  <div className="artist">
                    <Link
                      to={`/artist/${albumObject["artist-credit"][0].artist.id}`}
                      className="link"
                      key={albumObject["artist-credit"][0].artist.id}
                    >
                      {albumObject["artist-credit"][0].artist.name}
                    </Link>
                  </div>
                </div>
                <Actions />
                <div className="album-actions"></div>
              </div>
            </div>
          </div>
          <div className="album-track-container">
            {tracksArrayForAlbum == null ? (
              <div className="album-track-box">
                МУЗЫКАЛЬНЫЕ КОМПОЗИЦИИ НЕ НАЙДЕНЫ
              </div>
            ) : (
              tracksArrayForAlbum.map((item: AlbumTracks) => (
                <div className="album-track-box">
                  <div className="album-track" key={item.id}>
                    <div className="number">
                      {tracksArrayForAlbum.indexOf(item) + 1}
                    </div>
                    <div>
                      {" "}
                      <span>
                        {" "}
                        <Link
                          to={`/artist/${albumObject["artist-credit"][0].artist.id}`}
                          className="link"
                          key={albumObject["artist-credit"][0].artist.id}
                        >
                          {albumObject["artist-credit"][0].artist.name}
                        </Link>
                      </span>{" "}
                      -{" "}
                      <Link to={`/${item.recording.id}`} className="link">
                        {item.title}
                      </Link>
                    </div>
                  </div>
                  <div className="time">{parseDurationToString(item)}</div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }
  }
}

export default Album;
