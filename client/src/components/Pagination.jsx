import React from 'react'

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
            <nav>
                <ul>
                    {pageNumbers &&
                        pageNumbers?.map((i) => (
                            <li key={i}>
                                <button onClick={() => props.pagination(i)}>{i}</button>
                            </li>
                        ))}
                </ul>
            </nav>
		);
}

export default Pagination
