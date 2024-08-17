// import { createStore, combineReducers } from 'redux';
import filters from '../components/heroesFilters/filtersSlice';
import heroes from '../reducers/heroes';
import { 
    // compose, applyMiddleware, 
    configureStore } from '@reduxjs/toolkit';
// import {thunk} from 'redux-thunk';

const stringMiddleware = ({dispatch, getState}) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action);
}

// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);
//     const oldDispatch = store.dispatch;

//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action);
//     }
//     return store;
// }

// const store = createStore(combineReducers({heroes, filters}), compose(applyMiddleware(thunk, stringMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production' 
})

export default store;