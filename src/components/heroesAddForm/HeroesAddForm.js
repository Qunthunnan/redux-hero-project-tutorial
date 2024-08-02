

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Formik, Field } from "formik";
import FormFilters from "./FormFilters";

const HeroesAddForm = () => {
    const filtersLoadingStatus = useSelector(state => state.filtersLoadingStatus);

    if(filtersLoadingStatus !== 'error')
        return (
            <form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Ім'я нового героя</label>
                    <input 
                        required
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Я мене звати?"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Опис</label>
                    <textarea
                        required
                        name="text" 
                        className="form-control" 
                        id="text" 
                        placeholder="Що я вмію?"
                        style={{"height": '130px'}}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Обрати елемент героя</label>
                    <FormFilters />
                </div>

                <button type="submit" className="btn btn-primary">Створити</button>
            </form>
        )
    else 
        return ( <h5>Виникла помилка під час завантаження фільтрів, спробуйте пізніше</h5>)
}

export default HeroesAddForm;