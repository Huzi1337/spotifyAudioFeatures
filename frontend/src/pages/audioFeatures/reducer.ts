import { AudioFeatures, AudioFeaturesTableData } from "../../types";

export type DisplayedState = {
  features: AudioFeatures | null;
  pageSize: number;
  sortedBy: keyof AudioFeaturesTableData;
  sortOrder: string;
};

type FeaturesAction = {
  type: "set_features" | "update_features";
  payload: AudioFeatures | null;
};

type RecordsAction = {
  type: "set_pageSize";
  payload: number;
};

type SortOrderAction = {
  type: "sort_ascending" | "sort_descending";
};

type SortByAction = {
  type: "sortBy";
  payload: keyof AudioFeaturesTableData;
};

export type Action =
  | RecordsAction
  | FeaturesAction
  | SortOrderAction
  | SortByAction;

function reducer(state: DisplayedState, action: Action) {
  switch (action.type) {
    case "set_features": {
      return {
        ...state,
        features: action.payload ? { ...action.payload } : null,
      };
    }
    case "update_features": {
      return { ...state, features: { ...state.features, ...action.payload } };
    }
    case "set_pageSize": {
      return { ...state, pageSize: action.payload };
    }
    case "sort_ascending": {
      return { ...state, sortOrder: "ascending" };
    }
    case "sort_descending": {
      return { ...state, sortOrder: "descending" };
    }
    case "sortBy": {
      return { ...state, sortedBy: action.payload };
    }
  }
}

export default reducer;
