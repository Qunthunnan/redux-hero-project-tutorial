import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    elements: [],
    elementsLoadingStatus: 'idle',
    elementFilter: 'all'
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => { state.elementsLoadingStatus = 'loading' },
        filtersFetched: (state, action) => {
            state.elementsLoadingStatus = 'idle';
            state.elements = action.payload;
        },
        filtersFetchingError: state => { state.elementsLoadingStatus = 'error' },
        setElementFilter: (state, action) => {
            state.elementFilter = action.payload
        }
    }
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { 
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    setElementFilter
} = actions;