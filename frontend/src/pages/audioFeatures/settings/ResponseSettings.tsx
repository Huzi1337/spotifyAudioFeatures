import { useState } from "react";
import { Action, DisplayedState } from "../reducer";
import "./ReponseSettings.scss";
import { TOOLTIPS } from "../tooltipData";
import Tooltip from "../../../components/Tooltip";
import Checkbox from "../../../components/v2/Checkbox";
import { AudioFeaturesTableData, SelectedAudioFeatures } from "../../../types";
import useGetMousePos from "../../../hooks/useGetMousePos";

type Props = {
  dispatch: React.Dispatch<Action>;
  state: DisplayedState;
};

function ResponseSettings({
  dispatch,
  state: { features, pageSize, sortOrder, sortedBy },
}: Props) {
  const mousePos = useGetMousePos();

  const [currentPage, setCurrentPage] = useState(0);
  function onClickHandler(key: keyof SelectedAudioFeatures) {
    const newDisplayedFeatures = { ...features };
    newDisplayedFeatures[key] = !(features as SelectedAudioFeatures)[key];
    dispatch({ type: "update_features", payload: newDisplayedFeatures });
  }

  function handleSortOrder(e: React.ChangeEvent<HTMLSelectElement>) {
    const newSortOrder =
      e.target.value === "ascending" ? "sort_ascending" : "sort_descending";
    dispatch({
      type: newSortOrder,
    });
  }
  function handleSortBy(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: "sortBy",
      payload: e.target.value as keyof AudioFeaturesTableData,
    });
  }

  function handlePageSize(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(/\D/.test(e.target.value));
    const newPageSize = /\D/.test(e.target.value)
      ? pageSize
      : (e.target.value as unknown);

    dispatch({
      type: "set_pageSize",
      payload: newPageSize as number,
    });
  }

  return (
    <div className="settings__audioFeaturesResponse__container">
      {features && (
        <>
          <div className="settings____audioFeaturesResponse__label">
            <button onClick={() => setCurrentPage(0)}>
              Displayed Audio Features
            </button>
            <button onClick={() => setCurrentPage(1)}>Table settings</button>
          </div>
          {currentPage === 0 &&
            Object.entries(features).map(([key, value]) => (
              <div
                className="settings__audioFeaturesResponse__checkbox"
                key={key}
              >
                <Tooltip position={mousePos} text={TOOLTIPS[key].tooltip}>
                  <label>{TOOLTIPS[key].label}</label>
                </Tooltip>

                <Checkbox
                  isChecked={value as boolean}
                  onClick={() =>
                    onClickHandler(key as keyof SelectedAudioFeatures)
                  }
                  key={key}
                />
              </div>
            ))}
          {currentPage === 1 && (
            <div className="settings__audioFeaturesResponse__table">
              <label>Number of records per page</label>
              <input minLength={1} value={pageSize} onChange={handlePageSize} />

              <label>Sorting order</label>
              <select onChange={handleSortOrder} defaultValue={sortOrder}>
                <option value={"ascending"}>Ascending</option>
                <option value={"descending"}>Descending</option>
              </select>

              <label>Sort by:</label>
              <select onChange={handleSortBy} defaultValue={sortedBy}>
                <option value={"title"}>Title</option>
                <option value={"artist"}>Artist</option>
                {Object.keys(features).map((key) => (
                  <option key={key} value={key}>
                    {TOOLTIPS[key].label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ResponseSettings;
