import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllRecipies } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./SearchBar";

import CardRecipe from "./CardRecipe";

function Home() {

    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes)

    useEffect(() => {
			dispatch(getAllRecipies());
		}, [dispatch]);

	return (
        <div>
            <NavLink to="/">Go Back</NavLink>
            <SearchBar/>
            <div>
                <select>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </select>
                <select>
                    <option value="Top Rank">Top Rank</option>
                    <option value="Low Rank">Low Rank</option>
                </select>
                <select>
                    <option value="Diets">Diets</option>
                </select>
            </div>
            <div>
                {
                    allRecipes.map(r=>{
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
                                ></CardRecipe>
                            );
                    })
                }
            </div>
        </div>
    )
}

export default Home;
