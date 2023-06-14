import { createStore, applyMiddleware } from "redux";
import { TrackForSearch } from "../types/Track";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import populateSongsWithTime from "../components/utils/populateSongsWithTime";
import InitialState from "./typesOfGlobalState";
import { Status } from "../types/Status";

interface StateActions<T = any> {
  type: string;
  payload: T;
}

const initialState = {
  queryResultArray: [],
  queryValue: "",
  status: Status.INITIAL,
};
const CHANGE_QUERY_VALUE = "CHANGE_QUERY_VALUE";
const CHANGE_QUERY_RESULT_ARRAY = "CHANGE_QUERY_RESULT_ARRAY";
const SET_STATUS = "SET_STATUS";
//action creators
export function setQueryValue(queryValue: string) {
  const action: StateActions<string> = {
    type: CHANGE_QUERY_VALUE,
    payload: queryValue,
  };
  return action;
}

export function setQueryResultArray(queryResultArray: Array<TrackForSearch>) {
  const action: StateActions = {
    type: CHANGE_QUERY_RESULT_ARRAY,
    payload: queryResultArray,
  };

  return action;
}
export function setStatus(status: string) {
  const action: StateActions = {
    type: SET_STATUS,
    payload: status,
  };

  return action;
}

const reducer = (
  state: InitialState = initialState,
  action: StateActions
): InitialState => {
  switch (action.type) {
    case CHANGE_QUERY_VALUE:
      const newValue: InitialState = {
        ...state,
        queryValue: action.payload,
      };
      return newValue;
    case CHANGE_QUERY_RESULT_ARRAY:
      const newArray: InitialState = {
        ...state,
        queryResultArray: populateSongsWithTime(action.payload),
      };
      return newArray;
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

let store = createStore(reducer, composedEnhancer);
export default store;
