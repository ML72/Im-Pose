import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    alerts: []
};

export const picsSlice = createSlice({
    name: 'pics',
    initialState,
    reducers: {
        addAlert: (state, action) => {
            let { msg, alertType, id } = action.payload;
            state.alerts.push({ msg, alertType, id });
        },
        removeAlert: (state, action) => {
            let { id } = action.payload;
            state.alerts = state.alerts.filter((alert: any) => alert.id != id);
        }
    }
});

export const { addAlert, removeAlert } = picsSlice.actions;

export const selectPicsState = (state: any) => state.pics.alerts;

export default picsSlice.reducer;