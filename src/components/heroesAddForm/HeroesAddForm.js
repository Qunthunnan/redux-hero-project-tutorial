

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

// import { useHttp } from "../../hooks/http.hook";
import { Formik, Form, Field, ErrorMessage } from "formik";


import { useDispatch, useSelector } from "react-redux";
// import { heroesPosting, heroesPosted, heroesPostingError } from "../../actions";

// import { postHero } from "../heroesFilters/heroesSlice";

import Spinner from '../spinner/Spinner';
import { v4 } from "uuid";
import * as Yup from 'yup';
import FormElementSelector from "./FormElementSelector";
import { usePostHeroMutation } from "../api/apiSlice";

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const [postHero, {isLoading, isFetching, isError, isSuccess}] = usePostHeroMutation();
    // const heroes = useSelector(state => state.heroes.heroes);
    const formPosting = useSelector(state => state.heroes.formPosting);
    // const { request } = useHttp();

    function createHero(hero, { resetForm }) {
        // dispatch(heroesPosting());
        const uuid = v4();
        hero.id = parseInt(uuid.replace(/-/g, '').slice(0, 12), 16);

        postHero(hero);

        // dispatch(postHero({data: hero, reset: resetForm}));

        // request('http://localhost:3001/heroes', 'POST', JSON.stringify(hero))
        // .then(result => {
        //     dispatch(heroesPosted([...heroes, hero]));
        //     resetForm();
        // })
        // .catch(error => {
        //     console.error(error)
        //     dispatch(heroesPostingError());
        // });
    }
    
    const elementsLoadingStatus = useSelector(state => state.filters.elementsLoadingStatus);
    const elements = useSelector(state => state.filters.elements);

    const formSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Мінімальна кількість символів у імені: 2')
            .max(256, 'Максимальна кількість символів у імені: 256')
            .required("Необхідне ваше ім'я"),
        description: Yup.string()
            .min(3, 'Мінімальна кількість символів у описі: 3')
            .max(1000, 'Максимальна кількість символів у описі: 1000')
            .required("Необхідно додати опис"),
        element: Yup.string()
            .oneOf(elements.map( element => element.dataName ), 'Виберіть елемент героя')
            .required('Виберіть елемент героя')
    });

    if(elementsLoadingStatus !== 'error')
        return (
            <Formik
                initialValues={{
                    name: '',
                    description: '',
                    element: ''
                }}
                validationSchema={formSchema}
                onSubmit={createHero}>
                <Form className="border p-4 shadow-lg rounded">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fs-4">Ім'я нового героя</label>
                        <Field 
                            type="text" 
                            name="name" 
                            className="form-control" 
                            id="name" 
                            placeholder="Я мене звати?"/>
                        <ErrorMessage name="name" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label fs-4">Опис</label>
                        <Field
                            as="textarea"
                            name="description" 
                            className="form-control" 
                            id="description" 
                            placeholder="Що я вмію?"
                            style={{"height": '130px'}}/>
                        <ErrorMessage name="description" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="element" className="form-label">Обрати елемент героя</label>
                        <FormElementSelector />
                        <ErrorMessage name="element"/>
                    </div>

                    { isLoading || isFetching ? <Spinner/> : <button type="submit" className="btn btn-primary">Створити</button>}
                    { isError ? <h5>Виникла помилка під час відправки даних, спробуйте пізніше</h5> : null }
                    {/* { formPosting === 'loading' ? <Spinner/> : <button type="submit" className="btn btn-primary">Створити</button>} */}
                    {/* { formPosting === 'error' ? <h5>Виникла помилка під час відправки даних, спробуйте пізніше</h5> : null } */}
                    
                </Form>
            </Formik>
        )
    else 
        return ( <h5>Виникла помилка під час завантаження елементів, спробуйте пізніше</h5>)
}

export default HeroesAddForm;