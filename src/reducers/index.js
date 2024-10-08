const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    formPosting: 'idle',
    elements: [],
    elementsLoadingStatus: 'idle',
    heroDeletingStatus: 'idle',
    elementFilter: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_POSTING':  
            return {
                ...state,
                formPosting: 'loading'
            }
        case 'HEROES_POSTED':  
            return {
                ...state,
                formPosting: 'idle',
                heroes: action.payload
            }
        case 'HEROES_POSTING_ERROR':  
            return {
                ...state,
                formPosting: 'error'
            }
        case 'HERO_DELETING':
            return {
                ...state,
                heroDeletingStatus: 'loading'
            }
        case 'HERO_DELETED':
            return {
                ...state,
                heroes: action.payload,
                heroDeletingStatus: 'idle'
            }
        case 'HERO_DELETING_ERROR':
            return {
                ...state,
                heroDeletingStatus: 'error'
            }
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING': 
            return {
                ...state,
                elementsLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED': 
            return {
                ...state,
                elements: action.payload,
                elementsLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                elementsLoadingStatus: 'error'
            }
        case 'SET_ELEMENT_FILTER':
            return {
                ...state,
                elementFilter: action.payload
            }

        default: return state
    }
}

export default reducer;