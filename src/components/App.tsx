import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import TrackList from "./TrackList";
import SearchBlock from "./SearchBlock";
import Album from "./Album";
import Track from "./Track";
import Artist from "./Artist";
import populateSongsWithTime from "./utils/populateSongsWithTime";
import { TrackForSearch } from "../types/Track";
import { searchTrack } from "../api";
import { Link } from "react-router-dom";
import Placeholder from "./Placeholder";

interface ComponentState {
  itemsArray: Array<TrackForSearch & { duration: string }>;
  value: string;
}
interface ComponentProps {}

class App extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      itemsArray: [],
      value: "",
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.itemsArrayChange = this.itemsArrayChange.bind(this);
  }
  //обновляет value в state
  handlerChange(event: string) {
    this.setState({
      value: event,
    });
  }

  //обновляет itemsArray в state
  itemsArrayChange(result: Array<TrackForSearch>) {
    this.setState({
      itemsArray: populateSongsWithTime(result),
    });
  }

  async trackSearch(inputValue: string): Promise<void> {
    const result = await searchTrack(inputValue);
    const resultWithReleases = result.recordings.filter((item) =>
      Object.hasOwn(item, "releases")
    );

    this.itemsArrayChange(resultWithReleases);
  }

  render() {
    return (
      <div>
        <header id="navigation-block">
          <div className="music-app-text">MusicApp</div>
          <Link to={"/"}>
            <button
              onClick={() => {
                //запрос по методу searchTrack с записью результата в state компонента App
                this.handlerChange("");
                this.itemsArrayChange([]);
              }}
              className="navigation-block-button"
            >
              Главная страница
            </button>
          </Link>
        </header>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <SearchBlock
                  value={this.state.value}
                  handlerChange={this.handlerChange}
                  itemsArrayChange={this.itemsArrayChange}
                  trackSearch={this.trackSearch}
                />
              }
            >
              <Route
                path="/:trackList"
                index
                element={
                  <TrackList
                    itemsArray={this.state.itemsArray}
                    value={this.state.value}
                  />
                }
              />
              <Route path="/" element={<Placeholder />} />
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
