import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../actions/index";
import styles from "./SearchBar.module.css";


function SearchBar() {
	const dispatch = useDispatch();
	const [recipe, setRecipe] = useState("");

	function handleChange(e) {
		e.preventDefault();
		setRecipe(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(searchByName(recipe));
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.search}>
				<input
				className={styles.searchTerm}
					type="text"
					placeholder="Search..."
					onChange={(e) => handleChange(e)}
				></input>
				<button
					className={styles.searchButton}
					type="submit"
					onClick={(e) => handleSubmit(e)}
				>
					Search
				</button>
			</div>
		</div>
	);
}

export default SearchBar;
