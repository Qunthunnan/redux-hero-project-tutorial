const initialState = {
    elements: [],
    elementsLoadingStatus: 'idle',
    elementFilter: 'all'
}

const filters = (state = initialState, action) => {
    switch (action.type) {
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

export default filters;