import {createSlice } from "@reduxjs/toolkit";

const initialState = {
  tool : "",
  color : "#000000",
};

const toolSlice = createSlice({
    name: "tool",
    initialState,
    reducers: {
        setTool: (state, action) => {
            state.tool = action.payload;
        },
        setColor : (state, action) => {
            state.color = action.payload;
        },
    }
});

export const reducer = toolSlice.reducer;
export const {setTool,setColor} = toolSlice.actions;
