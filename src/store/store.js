import  {configureStore}  from   '@reduxjs/toolkit' ;
import {reducer}  from   './tool-store' ;


export const store = configureStore({
    reducer: {
      toolStore: reducer,
    },
  });