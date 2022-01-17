import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardRecipe.module.css";

function CardRecipe(props) {
    var keyDiets = 1
	return (
		<div className={styles.card}>
			<Link to={`/home/detail/${props.id}`}>
				<img className={styles.img} alt="Img Not Found" src={props.image} />
				<h2 className={styles.title}>{props.title}</h2>
				<div>
					{props.diets.map((d) => (
						<h5 className={styles.extras} key={++keyDiets}>{d} 
						<br/>
						</h5>
					))}
				</div>
			</Link>
		</div>
	);
}

export default CardRecipe;
