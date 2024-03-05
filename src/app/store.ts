import { historyIndexReducer } from './slices/paintapp/historyindex-slice';
import { currentStroke } from './slices/paintapp/currentstroke-slice';
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todoapp/todo-slice';
import capitalCityReducer from './slices/quiz/quiz-slice'
import { strokesReducer } from './slices/paintapp/strokes-slice';

export const store = configureStore({
    reducer: {
        todoSlice: todoReducer,
        currentStroke: currentStroke,
        historyIndex: historyIndexReducer,
        strokes: strokesReducer,
        capitalCityQuiz: capitalCityReducer

    }

});

export type AppDisptach = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>