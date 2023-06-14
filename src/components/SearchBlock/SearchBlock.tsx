import React from "react";
import { Outlet } from "react-router-dom";
import "./searchBlock.css";
import { GrSearch } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { setQueryValue } from "../../store";
import { useSelector } from "react-redux/es/hooks/useSelector";
import store from "../../store";
import { searchTracks } from "../../async/searchTracks";
import InitialState from "../../store/typesOfGlobalState";

function SearchBlock() {
  const queryValue = useSelector((state: InitialState) => state.queryValue);
  const queryResultArray = useSelector(
    (state: InitialState) => state.queryResultArray
  );
  const enabled = queryValue.length > 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(queryValue);

  return (
    <>
      <div className="search-block">
        <form className="search-form">
          <input
            value={queryValue}
            onChange={(event) => {
              //при изменении ввода query value попадает в поле searchblock
              dispatch(setQueryValue(event.target.value));
            }}
            //при нажатии enter query value попадает в поле searchblock и результат запроса searchTrack попадает в state App
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                //при изменении ввода query value попадает в поле searchblock
                dispatch(setQueryValue(queryValue));

                if (queryValue === "") {
                  return;
                } else {
                  // props.trackSearch(props.value).then((res) => {
                  //   navigate("/:trackList");
                  // });

                  store.dispatch(searchTracks(queryValue));
                  navigate("/:trackList");
                }
              }
            }}
            type="search"
            name="search"
            placeholder="Введите название песни"
            className="search-input"
          ></input>
        </form>
        <button
          disabled={!enabled}
          onClick={() => {
            if (queryValue.length === 0) {
              return;
              //запрос по методу searchTrack с записью результата в state компонента App
            } else if (queryValue === "" && queryResultArray.length === 0) {
              navigate("/");
            } else {
              store.dispatch(searchTracks(queryValue));
              navigate("/:trackList");
            }
            // });
          }}
          className="search-icon"
        >
          <GrSearch />
        </button>
      </div>
      <Outlet />
    </>
  );
}
export default SearchBlock;
