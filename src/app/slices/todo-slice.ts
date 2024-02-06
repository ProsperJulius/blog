import { Todo } from '../../types';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import localforage from 'localforage';

interface TodoState {

    todos: Todo[];
    status: 'loading' | 'done' | 'fail' | 'idle'
}


const initialState: TodoState = { status: 'idle', todos: [] };
const getLocalTodos = async (): Promise<Todo[]> => {

    try {
        const todos = await localforage.getItem('todos') as string;

        return JSON.parse(todos) as Todo[];

    } catch (error) {

        console.log("An error occured while trying to retrieve todos from the localforage");
        return [];
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
        addTodo(state, action: PayloadAction<Todo>) {
            state.todos.push({ id: uuidv4(), content: action.payload.content, isCompleted: false });
            setLocalTodos(state.todos);
        },
        editTodo(state, action: PayloadAction<Todo>) {

            state.todos.forEach(todo => {
                if (todo.id === action.payload.id) {
                    todo.content = action.payload.content;
                }
            });
            setLocalTodos(state.todos);
        },

        completeTodo(state, action: PayloadAction<Todo>) {

            state.todos.forEach(todo => {

                if (todo.id === action.payload.id) {
                    todo.isCompleted = action.payload.isCompleted;
                }
            });
            setLocalTodos(state.todos);
        },
        clearCompleted(state) {
            state.todos = state.todos.filter(todo => !todo.isCompleted);
            setLocalTodos(state.todos);

        }
        ,
        deleteTodo(state, action: PayloadAction<Todo>) {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);

            if (index > -1) {

                state.todos.splice(index, 1);
            }
            setLocalTodos(state.todos);
        }
    },

    extraReducers: builder => {

        builder.addCase(fetchLocalTodos.pending, (state) => {
            state.status = 'loading';
        })

            .addCase(fetchLocalTodos.fulfilled, (state, action) => {

                if (action.payload) {
                    state.todos = action.payload;

                }
                state.status = 'idle';
            })


    }



})
const setLocalTodos = (todos: Todo[]) => {

    return localforage.setItem("todos", JSON.stringify(todos));
}

export const { completeTodo, deleteTodo, addTodo, editTodo, clearCompleted } = todoSlice.actions;
export default todoSlice.reducer;

