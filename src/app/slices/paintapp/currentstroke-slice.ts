import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Point, Stroke } from "../../../types";
import { endStroke } from "./sharedActions";

const initialState: Stroke = { color: "#000", points: [] };

const currentStrokeSlice = createSlice({
    name: "currentStroke",
    initialState,
    reducers: {
        beginStroke: (state, action: PayloadAction<Point>) => {
            state.points = [action.payload];
        },

        updateStroke: (state, action: PayloadAction<Point>) => {
            state.points.push(action.payload);
        },

        setStrokeColor: (state, action: PayloadAction<string>) => {

            state.color = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(endStroke, (state) => {

            state.points = [];
        })
    }
})


export const { setStrokeColor, updateStroke, beginStroke } = currentStrokeSlice.actions;
export const currentStroke = currentStrokeSlice.reducer;