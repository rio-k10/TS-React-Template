import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
  loading: boolean;
}

const initialState: SearchState = {
  query: "",
  loading: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    resetSearch() {
      return initialState;
    },
  },
});

export const { setQuery, setLoading, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
