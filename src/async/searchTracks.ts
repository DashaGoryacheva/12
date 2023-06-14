import { setQueryResultArray } from "../store";
import { searchTrack } from "../api";
import { setStatus } from "../store";
import { Status } from "../store";

export const searchTracks = (track_name: string): any => {
  return (dispatch: any) => {
    dispatch(setStatus(Status.IN_PROGRESS));
    searchTrack(track_name)
      .then((result) => {
        console.log(result);
        const data = result.recordings.filter((item: any) =>
          Object.hasOwn(item, "releases")
        );
        if (data.length === 0) {
          dispatch(setStatus(Status.NO_DATA));
        } else {
          dispatch(setStatus(Status.SUCCESS));
        }
        return data;
      })
      .then((newArr: any) => {
        console.log(newArr);
        dispatch(setQueryResultArray(newArr));
      });
  };
};
