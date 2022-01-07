import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postNewRecipe, getDiets } from "../actions/index";

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


    const titles = {  // object invented for titles and placeholders
		Title: "Title",
		Summary: "Summary",
		Score: "0-100",
		Healthy: "0-100",
		Instructions: "Instructions",
		Image: "URL",
	};

	const KEYS = Object.keys(titles);
	const VALUES = Object.values(titles);

	var keyForm = 1;
    var iValue = 0;

	function handleChange(e) {
		e.preventDefault();
		setInput({
			...input,
			[e.target.name]: e.target.value,
			diets: e.target.value,
		});
	}

	function handleCheck(e) {
		e.preventDefault();
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
		<div>
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
										<h2>{e}</h2>
									</label>
								</div>
								<input
									placeholder={VALUES[iValue++]}
									type="text"
									name={e}
									value={input.e}
									onChange={(e) => handleChange(e)}
								></input>
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
					<button>Create Recipe!!!</button>
				</div>
			</form>
			<Link to="/home">
				<button>Go Home</button>
			</Link>
		</div>
	);
}

export default FormCreateRecipe;
