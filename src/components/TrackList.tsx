import React from "react";
import "./trackList.css";
import TrackListItem from "./TrackListItem";
import Placeholder from "./Placeholder";
import { TrackForSearch } from "../types/Track";
interface TrackListProps {
  itemsArray: Array<TrackForSearch & { duration: string }>;
}
function TrackList(props: TrackListProps) {
  if (props.itemsArray.length === 0) {
    return <Placeholder />;
  } else {
    return (
      <div className="track-block">
        <div className="text">Результаты поиска</div>
        {props.itemsArray.map((item: any) => (
          <TrackListItem track={item} key={item.id} />
        ))}
      </div>
    );
  }
}
export default TrackList;
