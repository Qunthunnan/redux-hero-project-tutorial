import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { filtersFetching, filtersFetched, filtersError } from "../../actions";

function FormFilters () {
    const dispatch = useDispatch();
    const { request } = useHttp();

    const filters  = useSelector(state => state.filters);
    const filtersLoadingStatus = useSelector(state => state.filtersLoadingStatus);

    useEffect(() => {
        dispatch(filtersFetching());

        request('http://localhost:3001/filters')
        .then((result) => {
            dispatch(filtersFetched(result))
        })
        .catch(() => {dispatch(filtersError())})
    }, []);

    useEffect(()=> {
        console.log(filters);
        console.log(filtersLoadingStatus);
    }); 

    switch (filtersLoadingStatus) {
        case 'idle':
            return (
            <select 
                required
                className="form-select" 
                id="element" 
                name="element">
                <option >Я володію елементом...</option>
                { filters.map(filter => (<option key={filter.id} value={filter.dataName}>{filter.name}</option>)) }
            </select>
            )
        
        case 'loading':
            return (
            <select 
                required
                className="form-select" 
                id="element" 
                name="element">
                <option >Завантажуються фільтри...</option>
            </select>
            )
        case 'error':
            return (
                <h5>Виникла помилка під час завантаження фільтрів, спробуйте пізніше</h5>
            )
    }
}

export default FormFilters;