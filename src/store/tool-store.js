import {createSlice } from "@reduxjs/toolkit";

const initialState = {
  tool : "pencil",
  color : "#000000",
  clearAll : false
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
        setClear : (state, action) => {
            state.clearAll = action.payload;
        }
    }
});

export const reducer = toolSlice.reducer;
export const {setTool,setColor} = toolSlice.actions;
