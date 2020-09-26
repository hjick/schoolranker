import { SIDEBAR } from "../_actions/types";

const initialState = {
  showSidebar: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SIDEBAR:
      return { ...state, showSidebar: action.payload };

    default:
      return state;
  }
};
