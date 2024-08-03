export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesPosting = () => {
    return {
        type: 'HEROES_POSTING'
    }
}

export const heroesPosted = (heroes) => {
    return {
        type: 'HEROES_POSTED',
        payload: heroes
    }
}

export const setElementFilter = (filter) => {
    return {
        type: 'SET_ELEMENT_FILTER',
        payload: filter
    }
}

export const heroesPostingError = () => {
    return {
        type: 'HEROES_POSTING_ERROR'
    }
}

export const heroDeleting = () => {
    return {
        type: 'HERO_DELETING'
    }
}

export const heroDeleted = (heroes) => {
    return {
        type: 'HERO_DELETED',
        payload: heroes
    }
}

export const heroDeletingError = () => {
    return {
        type: 'HERO_DELETING_ERROR'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters 
    }
}

export const filtersError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}