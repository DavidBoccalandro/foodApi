import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllRecipes, alphabetOrRankOrder, goBackGetDetails, filterByDiet, getDiets } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";

import SearchBar from "./SearchBar";
import CardRecipe from "./CardRecipe";
import Pagination from "./Pagination";
import loadingfood from '../images/loadingfood.gif'

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
				<div><img src ={loadingfood} alt="loading gif" height="750px" width= "1520px" /></div>
			) : (
				<div>
					<NavLink to="/">Go Back</NavLink>
					<NavLink to="/recipe/create"> Create NEW Recipe </NavLink>
					<SearchBar />
					<div>
						<select onChange={(e)=>{handleOrderByNameOrRank(e)}}>
                            <option value="default">Default</option>
							<option value="az">Alphabetical A-Z</option>
							<option value="za">Alphabetical Z-A</option>
							<option value="Top Rank">Top Rank</option>
							<option value="Low Rank">Low Rank</option>
						</select>
						<select onChange={e=>{handleFilterByDiet(e)}}>
							<option value="default">Default</option>
							{
								diets?.map(e=><option key={key++} value={e.name}>{e.name}</option>)
							}
						</select>
					</div>
                    <Pagination recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} pagination={pagination}/>
					<div>
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
                    <Pagination recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} pagination={pagination}/>
				</div>
			)}
		</div>
	);
}

export default Home;
