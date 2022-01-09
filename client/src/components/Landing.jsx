import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Landing.module.css";
import landingImage from "../images/Landing.jpg";

function Landing() {
	return (
		<div className={styles.buttonContainer}>
			<img alt="recipe landing" src={landingImage} className={styles.img} />
			<div>
				<NavLink to="/home">
					<button className={styles.go}>My recipes!</button>
				</NavLink>
			</div>
		</div>
	);
}

export default Landing;
