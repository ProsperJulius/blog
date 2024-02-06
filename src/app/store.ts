import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todo-slice';


export const store = configureStore({ reducer: { todoSlice: todoReducer } });

export type AppDisptach = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>