import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
    listParams: null
};

const pagesSlice = createSlice({
    name: "pages",
    initialState,
    reducers: {
        placeListParams: (state, action) => {
            state.listParams = action.payload;
        },
    },
});

export const { placeListParams } = pagesSlice.actions;
export default pagesSlice.reducer;
