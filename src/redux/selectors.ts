import { RootState } from "./store";

export const selectData = (state: RootState) => state.nodes.data;
