import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getDetails } from "../actions/index";

function Details() {
	const details = useSelector((state) => state.details);
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(getDetails(id));
	}, [dispatch, id]);
	

	console.log(details)

	var divKey = Math.floor(100000 + Math.random() * 900000);
	
	return (
		<div>
			{details.length ? (
				<div>
					<img src={details[0]?.image} alt="Img Not Found" />
					<h1>{details[0]?.title}</h1>
					<hr></hr>
					<h2>Diets</h2>
					<div>
					{details[0]?.fromDb
						? details[0]?.diets.map((d) => <div key={++divKey}>{d.name}</div>)
						: details[0]?.diets.map((d) => <div key={++divKey}>{d}</div>)}
					</div>
					<hr></hr>
					<h2>Summary</h2>
					{details[0]?.summary? <div dangerouslySetInnerHTML={{__html: details[0]?.summary}}></div> : <div>There is no summary in this recipe</div>}
					<h2>Score: {details[0]?.spoonacularScore}%</h2>
					<h2>Healthy: {details[0]?.healthScore}%</h2>
					<h4>
						Step by Step:{" "}
						<ol>
							{details[0]?.fromDb? <li>{details[0]?.analizedInstructions}</li> : 
							details[0]?.analizedInstructions[0]?.steps?.map(e=><li key={++divKey}>{e.step}</li>)
							}
						</ol>
					</h4>
					<NavLink to="/home">Go Back</NavLink>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
}

export default Details