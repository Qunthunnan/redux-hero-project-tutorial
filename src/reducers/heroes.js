import { createReducer } from "@reduxjs/toolkit";
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesPosting,
    heroesPosted,
    heroesPostingError,
    heroDeleting,
    heroDeleted,
    heroDeletingError
} from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    formPosting: 'idle',
    heroDeletingStatus: 'idle',
}

const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesPosting, state => { state.formPosting = 'loading' })
        .addCase(heroesPosted, (state, action) => {
            state.formPosting = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesPostingError, state => { state.formPosting = 'error'})
        .addCase(heroDeleting, state => { state.heroDeletingStatus = 'loading'})
        .addCase(heroDeleted, (state, action) => { 
            state.heroDeletingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroDeletingError, state => { state.heroDeletingStatus = 'error'})
        .addCase(heroesFetching, state => { state.heroesLoadingStatus = 'loading'})
        .addCase(heroesFetched, (state, action) => { 
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, state => { state.heroesLoadingStatus = 'error'})
        .addDefaultCase(() => {});
});

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_POSTING':  
//             return {
//                 ...state,
//                 formPosting: 'loading'
//             }
//         case 'HEROES_POSTED':  
//             return {
//                 ...state,
//                 formPosting: 'idle',
//                 heroes: action.payload
//             }
//         case 'HEROES_POSTING_ERROR':  
//             return {
//                 ...state,
//                 formPosting: 'error'
//             }
//         case 'HERO_DELETING':
//             return {
//                 ...state,
//                 heroDeletingStatus: 'loading'
//             }
//         case 'HERO_DELETED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroDeletingStatus: 'idle'
//             }
//         case 'HERO_DELETING_ERROR':
//             return {
//                 ...state,
//                 heroDeletingStatus: 'error'
//             }
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         default: return state
//     }
// }

export default heroes;