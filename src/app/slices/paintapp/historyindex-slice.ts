
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { endStroke } from "./sharedActions";

export const historyIndexSlice = createSlice({

    name: "historyIndex",
    initialState: 0,
    reducers: {

        undo: (state, action: PayloadAction<number>) => {

            return Math.min(state + 1, action.payload);
        },

        redo: (state) => {
            return Math.max(state - 1, 0);
        },

        reset: () => {
            return 0;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(endStroke, () => {
            return 0;
        })
    }

})

export const { redo, reset, undo } = historyIndexSlice.actions;
export const historyIndexReducer = historyIndexSlice.reducer;