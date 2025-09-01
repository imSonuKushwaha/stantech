import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
});

// Fetch users from JSONPlaceholder
const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    search: "",
    favourites: {},
    selectedId: null,
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    toggleFavourite(state, action) {
      const id = action.payload;
      state.favourites[id] = !state.favourites[id];
    },
    openDetails(state, action) {
      state.selectedId = action.payload;
    },
    closeDetails(state) {
      state.selectedId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSearch, toggleFavourite, openDetails, closeDetails } =
  usersSlice.actions;

// Selectors
const selectUsersState = (state) => state.users;
export const selectAllUsers = (state) => selectUsersState(state).items;
export const selectStatus = (state) => selectUsersState(state).status;
export const selectError = (state) => selectUsersState(state).error;
export const selectSearch = (state) => selectUsersState(state).search;
export const selectSelectedId = (state) => selectUsersState(state).selectedId;
export const selectFavourites = (state) => selectUsersState(state).favourites;

export const selectFilteredUsers = createSelector(
  [selectAllUsers, selectSearch],
  (items, term) => {
    const q = term.trim().toLowerCase();
    if (!q) return items;
    return items.filter((u) =>
      [u.name, u.username, u.email, u.company?.name]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }
);

export default usersSlice.reducer;
