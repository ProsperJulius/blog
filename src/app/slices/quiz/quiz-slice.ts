import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { COUNTRIES_ENDPOINT } from "../../rest";
import { Country } from "../../../types";
import { HelperFunctions } from "../../utils";

interface QuizState {

    answer: Country | undefined;
    options: Country[]
    status: 'loading' | 'idle'
    countries: Country[]

}


const initialState: QuizState = { answer: undefined, options: [], status: 'idle', countries: [] }
export const fetchCountries = createAsyncThunk("countries/quiz", async () => {

    const response = await fetch(COUNTRIES_ENDPOINT);
    return (await response.json()).data as Country[];


});



const capitalCityState = createSlice({
    name: "capitalCityQuiz",
    initialState,
    reducers: {

        addOptions(state) {
            const options = HelperFunctions.getThreeRandomCountries(state.countries);
            state.answer = options[0];
            state.options = HelperFunctions.shuffled(options)
        }

    },

    extraReducers: builder => {

        builder.addCase(fetchCountries.pending, (state) => {
            state.status = 'loading';
        }),

            builder.addCase(fetchCountries.fulfilled, (state, action) => {
                state.status = 'idle';

                if (action.payload) {
                    state.countries = action.payload.filter(country => country.capital)
                    const options = HelperFunctions.getThreeRandomCountries(state.countries);
                    state.answer = options[0];
                    state.options = HelperFunctions.shuffled(options)

                }

            })

    }

})

export const { addOptions } = capitalCityState.actions;
export default capitalCityState.reducer;