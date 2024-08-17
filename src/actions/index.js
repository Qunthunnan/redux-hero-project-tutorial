import { createAction } from "@reduxjs/toolkit";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch('HEROES_FETCHING');
    request("http://localhost:3001/heroes")
    .then(data => dispatch(heroesFetched(data)))
    .catch(() => dispatch('HEROES_FETCHING_ERROR'))
}

export const heroesFetching = createAction('HEROES_FETCHING');

export const heroesFetched = createAction('HEROES_FETCHED');

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

export const heroesPosting = createAction('HEROES_POSTING');

export const heroesPosted = createAction('HEROES_POSTED');

export const heroesPostingError = createAction('HEROES_POSTING_ERROR');

export const setElementFilter = createAction('SET_ELEMENT_FILTER');

export const heroDeleting = createAction('HERO_DELETING')

export const heroDeleted = createAction('HERO_DELETED');

export const heroDeletingError = createAction('HERO_DELETING_ERROR');

export const filtersFetching = createAction('FILTERS_FETCHING');

export const filtersFetched = createAction('FILTERS_FETCHED');

export const filtersError = createAction('FILTERS_FETCHING_ERROR');


// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const heroesPosting = () => {
//     return {
//         type: 'HEROES_POSTING'
//     }
// }

// export const heroesPosted = (heroes) => {
//     return {
//         type: 'HEROES_POSTED',
//         payload: heroes
//     }
// }

// export const heroesPostingError = () => {
//     return {
//         type: 'HEROES_POSTING_ERROR'
//     }
// }

// export const setElementFilter = (filter) => {
//     return {
//         type: 'SET_ELEMENT_FILTER',
//         payload: filter
//     }
// }

// export const heroDeleting = () => {
//     return {
//         type: 'HERO_DELETING'
//     }
// }

// export const heroDeleted = (heroes) => {
//     return {
//         type: 'HERO_DELETED',
//         payload: heroes
//     }
// }

// export const heroDeletingError = () => {
//     return {
//         type: 'HERO_DELETING_ERROR'
//     }
// }

// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters 
//     }
// }

// export const filtersError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }