import React from 'react'
import styles from "./Pagination.module.css";

function Pagination(props) {
    const pageNumbers=[];
    for (
			let i = 1;
			i <= Math.ceil(props.allRecipes / props.recipesPerPage);
			i++
		) {
			pageNumbers.push(i);
		}
        
    return (
            <ul className={styles.ul}>
                {pageNumbers &&
                    pageNumbers?.map((i) => (
                        <li className={styles.li} key={i}>
                            <button className={styles.button} onClick={() => props.pagination(i)}>{i}</button>
                        </li>
                    ))}
            </ul>
		);
}

export default Pagination
