import React from "react";
import { NavLink } from "react-router-dom";

function CardRecipe(props) {
    var keyDiets = 1
	return (
		<div>
			<NavLink to={`/home/detail/${props.id}`}>
				<img alt="Img Not Found" src={props.image} />
				<h2>{props.title}</h2>
				<h4>Diets</h4>
				<div>
					{props.diets.map((d) => (
						<h5 key={++keyDiets}>{d}</h5>
					))}
				</div>
			</NavLink>
		</div>
	);
}

export default CardRecipe;
