import React from "react";
import { Link } from "react-router-dom";

function CardRecipe(props) {
    var keyDiets = 1
	return (
		<div>
			<Link to={`/home/detail/${props.id}`}>
				<h2>{props.title}</h2>
				<img alt="Img Not Found" src={props.image} />
				<h4>Diets</h4>
				<div>
					{props.diets.map((d) => (
						<h5 key={++keyDiets}>{d}</h5>
					))}
				</div>
			</Link>
		</div>
	);
}

export default CardRecipe;
