import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postNewRecipe, getDiets } from "../actions/index";
import styles from './FormCreateRecipe.module.css'


export function validate(input) {
    let errors = {};
    if (!input.title) {
        errors.title = 'Title is required';
    }
    if (!input.summary) {
        errors.summary = 'Summary is required';
    }
    if (!/^[1-9][0-9]?$|^100$/g.test(input.spoonacularScore)) {
        errors.spoonacularScore = 'Score is required and must be in a range from 1 - 100';
    }
    if (!/^[1-9][0-9]?$|^100$/g.test(input.healthScore)) {
        errors.healthScore = 'Health Score is required and must be in a range from 1 - 100';
    }
    return errors;
};


function FormCreateRecipe() {
	const dispatch = useDispatch();
	const history = useHistory();
	const diets = useSelector((state) => state.diets);
	const [input, setInput] = useState({
		title: "",
		summary: "",
		spoonacularScore: 0,
		healthScore: 0,
		analizedInstructions: "",
		image: "",
		diets: [],
	});
	const [errors, setErrors] = useState({});


    const titles = {  // object invented for titles and placeholders
		Title: "Title",
		Summary: "Summary",
		Score: "0-100",
		Healthy: "0-100",
		Instructions: "Instructions",
		Image: "URL",
	};

	const KEYS = Object.keys(input);
	KEYS.pop()
	const KEYStitles = Object.keys(titles);
	const VALUES = Object.values(titles);

	var keyForm = 1;
    var iKeys = 0;
	var iValue = 0;

	function handleChange(e) {
		e.preventDefault();
		setInput({
			...input,
			[e.target.name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
			diets: e.target.value,
		});
		let objError = validate({
            ...input, [e.target.name]: e.target.value
        });
        setErrors(objError);
	}

	function handleCheck(e) {
		if (e.target.checked) {
			setInput({
				...input,
				diets: [...input.diets, e.target.value],
			});
		} else {
			setInput({
				...input,
				diets: input.diets.filter((d) => d !== e.target.value),
			});
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(postNewRecipe(input));
		alert("Recipe created successfully!");
		setInput({
			title: "",
			summary: "",
			spoonacularScore: 0,
			healthScore: 0,
			analizedInstructions: "",
			image: "",
			diets: [],
		});
		history.push("/home");
	}

	useEffect(() => {
		dispatch(getDiets());
	}, [dispatch]);

    console.log(diets)



	return (
		<div className={styles.card}>
			<h1>Create NEW Recipe</h1>
			<form
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<div>
					<div>
						{KEYS.map((e) => (
							<div key={++keyForm}>
								<div>
									<label>
										<h2>{KEYStitles[iKeys++]}</h2>
									</label>
								</div>
								<input
									placeholder={VALUES[iValue++]}
									type="text"
									name={e}
									value={input.e}
									onChange={(e) => handleChange(e)}
								></input>
								{
									errors[e] && (
										<p>{errors[e]}</p>
									)
                            	}
							</div>
						))}
					</div>{" "}
				</div>
				<div>
					{diets?.map((d) => (
						<div key={++keyForm * 1000}>
							<div>
								<label>
									<h2>{d.name}</h2>
								</label>
							</div>
							<input
								onChange={(e) => handleCheck(e)}
								type="checkbox"
								name={d.name}
								value={d.name}
							></input>
						</div>
					))}
					<button className={styles.goback} disabled={Object.keys(errors).length > 0 ? true : false} type ='submit'>Create Recipe!!!</button>
				</div>
			</form>
			<Link className={styles.goback} to="/home">
				Go Home
			</Link>
		</div>
	);
}

export default FormCreateRecipe;
