import React from "react";
import "./trackList.css";
import TrackListItem from "./TrackListItem";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Status } from "../types/Status";
import Loader from "../loader/loader";

function TrackList() {
  const status = useSelector((state: any) => state.status);
  const queryResultArray = useSelector((state: any) => state.queryResultArray);
  if (status === Status.NO_DATA) {
    return (
      <div className="track-block">
        <div className="text">
          НИЧЕГО НЕ НАЙДЕНО! ВОЗМОЖНО В НАЗВАНИИ ПЕСНИ ОШИБКА
        </div>
      </div>
    );
  } else if (status === Status.IN_PROGRESS) {
    return <Loader />;
  } else {
    return (
      <div className="track-block">
        <div className="text">Результаты поиска</div>
        <div className="songs-block">
          {queryResultArray.map((item: any) => (
            <TrackListItem track={item} key={item.id} />
          ))}
        </div>
      </div>
    );
  }
}
export default TrackList;
