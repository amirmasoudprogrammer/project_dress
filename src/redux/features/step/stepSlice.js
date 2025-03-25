import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    step: 1,
};

const stepSlice = createSlice({
    name: 'step',
    initialState,
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload;
        },
    },
});

export const { setStep } = stepSlice.actions;

export default stepSlice.reducer;
