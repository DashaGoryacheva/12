import { TrackForSearch } from "../types/Track";

interface InitialState {
  queryResultArray: Array<TrackForSearch & { duration: string }>;
  queryValue: string;
  status: string;
}
export default InitialState;
