import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import TrackList from "./TrackList";
import SearchBlock from "./SearchBlock";
import Album from "./Album";
import Track from "./Track";
import Artist from "./Artist";
import { TrackForSearch } from "../types/Track";
import { Link } from "react-router-dom";
import Placeholder from "./PlaceHolder/Placeholder";
import { setQueryResultArray } from "../store";
import { setQueryValue } from "../store";
import store from "../store";

interface ComponentState {
  queryResultArray: Array<TrackForSearch & { duration: string }>;
  queryValue: string;
}
interface ComponentProps {}

class App extends Component<ComponentProps, ComponentState> {
  render() {
    return (
      <div>
        <header id="navigation-block">
          <div className="music-app-text">MusicApp</div>
          <Link to={"/"}>
            <button
              onClick={() => {
                //запрос по методу searchTrack с записью результата в глобальный state
                store.dispatch(setQueryValue(""));
                store.dispatch(setQueryResultArray([]));
              }}
              className="navigation-block-button"
            >
              Главная страница
            </button>
          </Link>
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<SearchBlock />}>
              <Route
                path="/:trackList"
                // index
                element={<TrackList />}
              />
              <Route path="/" index element={<Placeholder />} />
              <Route path="/:trackId" element={<Track />} />
              <Route path="/artist/:artistId" element={<Artist />} />
              <Route path="/album/:albumId" element={<Album />} />
            </Route>
          </Routes>
        </div>
      </div>
    );
  }
}
export default App;
