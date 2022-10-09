import {createSlice } from "@reduxjs/toolkit";

const initialState = {
  tool : "",
  color : "#000000",
  brushSize : 5,
  strokeSize : 5,
  eraserSize : 5,
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
        setSize : (state, action) => {
            if(state.tool === 'pencil')
                state.brushSize = action.payload;
            else if(state.tool === 'rect')
                state.strokeSize = action.payload;
            else if(state.tool === 'eraser')
                state.eraserSize = action.payload;
        }
    }
});

export const reducer = toolSlice.reducer;
export const {setTool,setColor,setSize} = toolSlice.actions;
