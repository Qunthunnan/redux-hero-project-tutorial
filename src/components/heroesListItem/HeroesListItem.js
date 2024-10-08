import { useSelector, useDispatch } from "react-redux";
// import { heroDeleting, heroDeleted, heroDeletingError } from "../../actions";
// import { deleteHero } from "../heroesFilters/heroesSlice";
import { useDeleteHeroMutation } from "../api/apiSlice";
// import { useHttp } from "../../hooks/http.hook";
import { forwardRef } from "react";
import Spinner from "../spinner/Spinner";
import './heroesListItem.scss';


const HeroesListItem = forwardRef(({ name, description, element, id }, ref) => {
	const dispatch = useDispatch();
	const [deleteHero, {isLoading, isFetching, isError}] = useDeleteHeroMutation();

	// const heroes = useSelector(state => state.heroes.heroes);
	const heroDeletingStatus = useSelector(state => state.heroes.heroDeletingStatus);
	// const { request } = useHttp();


	// function deleteHero() {

		// dispatch(heroDeleting());
		// request(`http://localhost:3001/heroes/${id}`, 'DELETE')
		// .then(result => {
		// 	console.log(result);
		// 	dispatch(heroDeleted(heroes.filter(hero => hero.id !== id )))
		// })
		// .catch(error => {
		// 	console.error(error);
		// 	dispatch(heroDeletingError());
		// })
	// }

	let elementClassName;

	switch (element) {
		case "fire":
			elementClassName = "bg-danger bg-gradient";
			break;
		case "water":
			elementClassName = "bg-primary bg-gradient";
			break;
		case "wind":
			elementClassName = "bg-success bg-gradient";
			break;
		case "earth":
			elementClassName = "bg-secondary bg-gradient";
			break;
		default:
			elementClassName = "bg-warning bg-gradient";
	}

	return (
			<li
				ref={ref}
				className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
			>
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
					className="img-fluid w-25 d-inline"
					alt="unknown hero"
					style={{ objectFit: "cover" }}
				/>
				<div className="card-body">
					<h3 className="card-title">{name}</h3>
					<p className="card-text">{description}</p>
				</div>
				<span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
					{/* { heroDeletingStatus === 'loading' ? <Spinner/> :  */}
					{ isLoading || isFetching ? <Spinner/> : 
					<button
						type="button"
						className="btn-close btn-close"
						aria-label="Close"
						// onClick={() => { dispatch(deleteHero(id)) }}
						onClick={() => { deleteHero(id) }}
					></button> }
					{/* {heroDeletingStatus === 'error' ? ( <span>⚠️</span> ) : null } */}
					{isError ? ( <span>⚠️</span> ) : null }
				</span>
			</li>
	)
});

export default HeroesListItem;
