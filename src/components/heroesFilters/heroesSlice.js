import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter({
    heroesLoadingStatus: 'idle',
    formPosting: 'idle',
    heroDeletingStatus: 'idle',
});

export const fetchHeroes = createAsyncThunk(
    'heroes/heroesFetching',
    () => {
        const { request } = useHttp();
        return request('http://localhost:3001/heroes');
    }
);

export const postHero = createAsyncThunk(
    'heroes/heroesPosting',
    (data) => {
        console.log(data);
        const { request } = useHttp();
        return request('http://localhost:3001/heroes', 'POST', JSON.stringify(data))
    }
)

export const deleteHero = createAsyncThunk(
    'heroes/heroDeleting',
    (id) => {
        const { request } = useHttp();
        return request(`http://localhost:3001/heroes/${id}`, id)
    }
)

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
//     formPosting: 'idle',
//     heroDeletingStatus: 'idle',
// }

const heroesSlice = createSlice({
    name: 'heroes',
    initialState: heroesAdapter.getInitialState(),
    extraReducers: builder => {
        builder
            .addCase(fetchHeroes.pending, state => { state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => { 
                state.heroesLoadingStatus = 'idle';
                // state.heroes = action.payload
                heroesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchHeroes.rejected, state => { state.heroesLoadingStatus = 'error'})
            .addCase(postHero.pending, state => {state.formPosting = 'loading'})
            .addCase(postHero.fulfilled, (state, action) => {
                state.formPosting = 'idle';
                // state.heroes = action.payload;
                heroesAdapter.addOne(state, action.payload);
            })
            .addCase(postHero.rejected, state => {state.formPosting = 'error'})
            .addCase(deleteHero.pending, state => { state.heroDeletingStatus = 'loading'})
            .addCase(deleteHero.fulfilled, (state, action) => { 
                state.heroDeletingStatus = 'idle';
                // state.heroes = action.payload;
                heroesAdapter.removeOne(state, action.payload);
            })
            .addCase(deleteHero.rejected, state => { state.heroDeletingStatus = 'error'})
            .addDefaultCase(() => {});
    }
});

export const selectAllHeroes = heroesAdapter.getSelectors(state => state.heroes).selectAll;

const { reducer } = heroesSlice;

export default reducer;