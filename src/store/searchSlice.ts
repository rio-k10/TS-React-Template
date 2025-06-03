import { Post } from "@/types/post";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
  loading: boolean;
  error: string;
  results: Array<Post>;
}

const initialState: SearchState = {
  query: "",
  loading: false,
  error: "",
  results: [],
};

export const fetchResults = createAsyncThunk<Array<Post>, number>(
  "search/fetchResults",
  async (pageNumber) => {
    console.log("fetching posts redux");

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }
    const data = await response.json();
    return data;
  },
);

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
    setResults(state, action: PayloadAction<Array<Post>>) {
      state.results = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = [...state.results, ...action.payload];
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "501 Internal Server Error";
        state.results = [];
      });
  },
});

export const { setQuery, setLoading, setResults } = searchSlice.actions;
export default searchSlice.reducer;
