
import { Stroke } from './../../../types.d';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { endStroke } from './sharedActions';

const initialStrokes: Stroke[] = [];
const strokes = createSlice({

    name: "strokes",
    initialState: initialStrokes,
    reducers: {
        setStrokes: (_state, action: PayloadAction<Stroke[]>) => {

            return action.payload;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(endStroke, (state, action: PayloadAction<{ historyIndex: number, stroke: Stroke }>) => {

            const { historyIndex, stroke } = action.payload;
            if (historyIndex === 0) {
                state.push(stroke)
            }else{
                state.splice(-historyIndex, historyIndex,stroke);
            }
        })
    }
})

export const { setStrokes } = strokes.actions;
export const strokesReducer = strokes.reducer;