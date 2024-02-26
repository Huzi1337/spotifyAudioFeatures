import { AudioFeatures } from "../../types";

export type DisplayedState = {
  features: AudioFeatures | null;
  recordsPerPage: number;
};

type FeaturesAction = {
  type: "set_features" | "update_features";
  payload: AudioFeatures | null;
};

type RecordsAction = {
  type: "set_recordsPerPage";
  payload: number;
};

export type Action = RecordsAction | FeaturesAction;

function reducer(state: DisplayedState, action: Action) {
  switch (action.type) {
    case "set_features": {
      return { ...state, features: { ...action.payload } };
    }
    case "update_features": {
      return { ...state, features: { ...state.features, ...action.payload } };
    }
    case "set_recordsPerPage": {
      return { ...state, recordsPerPage: action.payload };
    }
  }
}

export default reducer;
