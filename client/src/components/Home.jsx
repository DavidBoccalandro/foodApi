import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRecipes, alphabetOrRankOrder, goBackGetDetails, filterByDiet, getDiets } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";

import SearchBar from "./SearchBar";
import CardRecipe from "./CardRecipe";
import Pagination from "./Pagination";
import loadingfood from '../images/loadingfood.gif'
import styles from "./Home.module.css";

function Home() {
	const dispatch = useDispatch();
	const allRecipes = useSelector((state) => state.recipes);
	const diets = useSelector((state) => state.diets);

    useEffect(() => {
		dispatch(goBackGetDetails()); // reinicio para que no re-renderice recipe anterior
	}, [dispatch]);

	useEffect(() => {
		dispatch(getAllRecipes());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getDiets());
	}, [dispatch]);

	const [currentPage, setCurrentPage] = useState(1);
	const recipesPerPage = 9;
	const last = currentPage * recipesPerPage; 
	const first = last - recipesPerPage; 
	const allPagRecipes = allRecipes.slice(first, last); // 0 a 9 excluido, por ende, de 0 a 8 incluido
    const [orderByName, setOrderByName] = useState('')
	const [filterDiet, setFilterDiet] = useState("");

	const pagination = (numberOfPage) => {
		setCurrentPage(numberOfPage);
	};

    function handleOrderByNameOrRank(e) {
			e.preventDefault(); 
			if (e.target.value === "default") {
                dispatch(goBackGetDetails())
				dispatch(getAllRecipes());
				setOrderByName(`Ordenado ${e.target.value}`);
			} else {
				dispatch(alphabetOrRankOrder(e.target.value));
				setCurrentPage(1);
				setOrderByName(`Ordenado ${e.target.value}`);
			}
		}
	
	function handleFilterByDiet(e){
		e.preventDefault();
		setFilterDiet(e.target.value)
		dispatch(filterByDiet(e.target.value))
	}

	var key = 1;

	return (
		<div>
			{allRecipes.length === 0 ? (
				<div>
					<img
						src={loadingfood}
						alt="loading gif"
						height="750px"
						width="1520px"
					/>
				</div>
			) : (
				<div className={styles.cardGrid}>
					<Link className={styles.goback} to="/"><div> Go Back! </div></Link>
					<Link to="/recipe/create" className={styles.createRecipe}><div> Create NEW Recipe </div></Link>
					<div className={styles.allSelects}>
						<SearchBar />
						<div className={styles.select}>
							<select
								onChange={(e) => {
									handleOrderByNameOrRank(e);
								}}
								className={styles.selectOrder}
							>
								<option className={styles.option} value="default">Default</option>
								<option className={styles.option} value="az">Alphabetical A-Z</option>
								<option className={styles.option} value="za">Alphabetical Z-A</option>
								<option className={styles.option} value="Top Rank">Top Rank</option>
								<option className={styles.option} value="Low Rank">Low Rank</option>
							</select>
							<select
								onChange={(e) => {
									handleFilterByDiet(e);
								}}
								className={styles.selectFilter}
							>
								<option className={styles.option} value="default">Default</option>
								{diets?.map((e) => (
									<option className={styles.option} key={key++} value={e.name}>
										{e.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<Pagination
						recipesPerPage={recipesPerPage}
						allRecipes={allRecipes.length}
						pagination={pagination}
					/>
					<div className={styles.cardGrid}>
						{allPagRecipes?.map((r) => {
							return (
								<CardRecipe
									id={r.id}
									key={r.id}
									title={r.title}
									image={r.image}
									diets={
										r.fromDb
											? r.diets.map((d) => d.name)
											: r.diets.map((d) => d)
									}
								/>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}

export default Home;
