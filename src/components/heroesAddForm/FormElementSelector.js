import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { filtersFetching, filtersFetched, filtersError } from "../../actions";
import { Field } from "formik";

function FormElementSelector () {
    const dispatch = useDispatch();
    const { request } = useHttp();

    const elements  = useSelector(state => state.elements);
    const elementsLoadingStatus = useSelector(state => state.elementsLoadingStatus);

    useEffect(() => {
        dispatch(filtersFetching());

        request('http://localhost:3001/elements')
        .then((result) => {
            dispatch(filtersFetched(result))
        })
        .catch(() => {dispatch(filtersError())})
    }, []);
    
    switch (elementsLoadingStatus) {
        case 'idle':
            return (
            <Field 
                as="select"
                className="form-select" 
                id="element" 
                name="element">
                <option>Я володію елементом...</option>
                { elements.map(element => ( <option key={element.id} value={element.dataName}>{element.name}</option>)) }
            </Field>
            )
        
        case 'loading':
            return (
            <select 
                required
                className="form-select" 
                id="element" 
                name="element">
                <option >Завантажуються елементи...</option>
            </select>
            )
        case 'error':
            return (
                <h5>Виникла помилка під час завантаження елементів, спробуйте пізніше</h5>
            )
    }
}

export default FormElementSelector;