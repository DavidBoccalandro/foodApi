import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllRecipes } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";

import SearchBar from "./SearchBar";
import CardRecipe from "./CardRecipe";
import Pagination from "./Pagination";

function Home() {
	const dispatch = useDispatch();
	const allRecipes = useSelector((state) => state.recipes);

	useEffect(() => {
		dispatch(getAllRecipes());
	}, [dispatch]);

	const [currentPage, setCurrentPage] = useState(1);
	const recipesPerPage = 9;
	const last = currentPage * recipesPerPage;
	const first = last - recipesPerPage;
	const allPagRecipes = allRecipes.slice(first, last);

	const pagination = (numberOfPage) => {
		setCurrentPage(numberOfPage);
	};

	return (
		<div>
			{allRecipes.length === 0 ? (
				<div>Loading...</div>
			) : (
				<div>
					<NavLink to="/">Go Back</NavLink>
					<SearchBar />
					<div>
						<select>
							<option value="az">Alphabetical A-Z</option>
							<option value="za">Alphabetical Z-A</option>
							<option value="Top Rank">Top Rank</option>
							<option value="Low Rank">Low Rank</option>
						</select>
						<select>
							<option value="Diets">Diets</option>
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
