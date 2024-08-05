
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useSelector, useDispatch } from "react-redux";
import { setElementFilter } from "../../actions";

const HeroesFilters = () => {
    const elementFilter = useSelector(state => state.filters.elementFilter);
    const dispatch = useDispatch();
    function handleClick(e) {
        const filter = e.target.getAttribute('data-filter');
        if(filter) {
            dispatch(setElementFilter(filter))
        }
    }
    
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Відфільтруйт героїв по елементам</p>
                <div onClick={ handleClick } className="btn-group">
                    <button data-filter="all" className={`btn btn-outline-dark ${elementFilter === 'all' ? 'active' : null}`}>Все</button>
                    <button data-filter="fire" className={`btn btn-danger ${elementFilter === 'fire' ? 'active' : null}`}>Огонь</button>
                    <button data-filter="water" className={`btn btn-primary ${elementFilter === 'water' ? 'active' : null}`}>Вода</button>
                    <button data-filter="wind" className={`btn btn-success ${elementFilter === 'wind' ? 'active' : null}`}>Ветер</button>
                    <button data-filter="earth" className={`btn btn-secondary ${elementFilter === 'earth' ? 'active' : null}`}>Земля</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;