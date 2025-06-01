import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
  results: string[];
}

const initialState: SearchState = {
  query: "",
  results: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    reset(state) {
      state.query = "";
      state.results = [];
    },
  },
});

export const { setQuery, setResults, reset } = searchSlice.actions;
export default searchSlice.reducer;
