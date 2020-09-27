import { SIDEBAR } from "./types";

export const showSIDEBAR = (showSidebar) => {
  return {
    type: SIDEBAR,
    payload: showSidebar,
  };
};
