import {useHttp} from '../../hooks/http.hook';
import { useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';


import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { 
    // heroesFetching, heroesFetched, heroesFetchingError, 
    fetchHeroes } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    // const heroes = useSelector(state => state.heroes.heroes);
    const elementFilter = useSelector(state => state.filters.elementFilter);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    //reselect demo
    const filteredHeroesSelector = createSelector(
        state => state.heroes.heroes,
        state => state.filters.elementFilter,
        (heroes, filter) => ( filter !== 'all' ? heroes.filter(({element}) => element === filter) : heroes )
    )

    const filteredHeroes = useSelector(filteredHeroesSelector);
     
    useEffect(() => {
        // dispatch(heroesFetching());
        // request("http://localhost:3001/heroes")
        //     .then(data => dispatch(heroesFetched(data)))
        //     .catch(() => dispatch(heroesFetchingError()))

        dispatch(fetchHeroes(request));

        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    function filterHeroesList(arr) {
        return arr.filter(({element}) => element === elementFilter);
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            const ref = createRef(null);
            return (
                <CSSTransition 
                timeout={100}
                classNames={'hero'}
                nodeRef={ref}>
                    <h5 ref={ref} className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }
        return arr.map(({id, ...props}) => {
            const ref = createRef(null);
            return (
                <CSSTransition 
                    key={id}
                    timeout={200}
                    classNames={'hero'}
                    nodeRef={ref}>
                    <HeroesListItem ref={ref} id={id} {...props}/>
                </CSSTransition>
            )
        })
    }

    // const elements = elementFilter === 'all' ? renderHeroesList(heroes) : renderHeroesList(filterHeroesList(heroes));
    console.log(filteredHeroes);
    const elements =  renderHeroesList(filteredHeroes);
    return (
       
            <TransitionGroup component='ul'>
                {elements}
            </TransitionGroup>
    

    )
}

export default HeroesList;