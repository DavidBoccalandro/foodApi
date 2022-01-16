import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardRecipe.module.css";

function CardRecipe(props) {
    var keyDiets = 1
	return (
		<div className={styles.card}>
			<Link to={`/home/detail/${props.id}`}>
				<h2 className={styles.linkedname}>{props.title}</h2>
				<img className={styles.img} alt="Img Not Found" src={props.image} />
				<div>
					{props.diets.map((d) => (
						<h5 className={styles.extras} key={++keyDiets}>{d} </h5>
					))}
				</div>
			</Link>
		</div>
	);
}

export default CardRecipe;
