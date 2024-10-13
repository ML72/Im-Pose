import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    compareType: null, // Either "pics" or "vids"
    demo: null,
    target: null,
    result: null
};

export const picsSlice = createSlice({
    name: 'pics',
    initialState,
    reducers: {
        addResult: (state, action) => {
            let { compareType, demo, target, result } = action.payload;
            state.compareType = compareType;
            state.demo = demo;
            state.target = target;
            state.result = result;
        }
    }
});

export const { addResult } = picsSlice.actions;

export const selectPicsState = (state: any) => state.pics;

export default picsSlice.reducer;