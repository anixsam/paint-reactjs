import {createSlice } from "@reduxjs/toolkit";

const initialState = {
  tool : "pencil"
};

const toolSlice = createSlice({
    name: "tool",
    initialState,
    reducers: {
        setTool: (state, action) => {
            state.tool = action.payload;
        }
    }
});

export const reducer = toolSlice.reducer;
export const {setTool} = toolSlice.actions;
