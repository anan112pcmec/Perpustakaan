import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface State {
  searchQuery: string;
}

const initialState: State = {
  searchQuery: "",
};

export const CariBukuState = createSlice({
  name: "CariBukuState",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSearchQuery: (state) => {
      state.searchQuery = "";
    },
  },
  selectors: {
    selectSearchQuery: (state) => state.searchQuery,
  },
});

// Export actions dan reducer-nya
export const { setSearchQuery, clearSearchQuery } = CariBukuState.actions;
export default CariBukuState.reducer;
