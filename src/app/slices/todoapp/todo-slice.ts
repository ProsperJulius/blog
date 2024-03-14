import { Todo } from '../../../types';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import localforage from 'localforage';
import { TODO_PERIODS } from '../../common/constants';

export type TodoPeriod = typeof TODO_PERIODS[number];
interface TodoState {
    todos: {
        [key in TodoPeriod]: Todo[]
    },
    status: 'loading' | 'done' | 'fail' | 'idle'
    selectedPeriod: TodoPeriod
}

const getInitialState = (): TodoState => {

    return { status: 'idle', todos: { daily: [], weekly: [], monthly: [], yearly: [] }, selectedPeriod: "daily" };
}
const initialState: TodoState = getInitialState();
const getLocalTodos = async (): Promise<TodoState> => {

    try {
        const todos = await localforage.getItem('todoState') as string;

        return JSON.parse(todos) as TodoState;

    } catch (error) {

        console.log("An error occured while trying to retrieve todos from the localforage");
        return initialState;
    }


}

export const fetchLocalTodos = createAsyncThunk('todos/localForageFetch', async () => {

    const response = await getLocalTodos();

    return response;

})

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {

        changeTodoPeriod(state, action: PayloadAction<TodoPeriod>) {
            state.selectedPeriod = action.payload;
            setLocalTodos(state);
        },
        addTodo(state, action: PayloadAction<Todo>) {


            state.todos[state.selectedPeriod]?.push({ id: uuidv4(), content: action.payload.content, isCompleted: false });
            setLocalTodos(state);
        },
        editTodo(state, action: PayloadAction<Todo>) {

            state.todos[state.selectedPeriod].forEach(todo => {

                if (todo.id === action.payload.id) {
                    todo.content = action.payload.content;
                }
            })

            setLocalTodos(state);
        },

        completeTodo(state, action: PayloadAction<Todo>) {

            state.todos[state.selectedPeriod].forEach(todo => {

                if (todo.id === action.payload.id) {
                    todo.isCompleted = true;
                }
            })

            setLocalTodos(state);
        },
        clearCompleted(state) {

            const filteredTodos = state.todos[state.selectedPeriod].filter(todo => !todo.isCompleted);

            state.todos[state.selectedPeriod] = filteredTodos;

            setLocalTodos(state);

        }
        ,
        deleteTodo(state, action: PayloadAction<Todo>) {
            const currentIndex = state.todos[state.selectedPeriod].findIndex(todo => todo.id === action.payload.id);

            if (currentIndex > -1) {
                state.todos[state.selectedPeriod].splice(currentIndex, 1);
            }

            setLocalTodos(state);
        }
    },

    extraReducers: builder => {

        builder.addCase(fetchLocalTodos.pending, (state) => {
            state.status = 'loading';
        })

            .addCase(fetchLocalTodos.fulfilled, (state, action) => {

                if (action.payload) {
                    state.todos = action.payload.todos;
                    state.selectedPeriod = action.payload.selectedPeriod;
                    state.status = 'done';

                }

            })


    }



})
const setLocalTodos = (todos: TodoState) => {

    return localforage.setItem("todoState", JSON.stringify(todos));
}

export const { completeTodo, deleteTodo, addTodo, editTodo, clearCompleted, changeTodoPeriod } = todoSlice.actions;
export default todoSlice.reducer;
