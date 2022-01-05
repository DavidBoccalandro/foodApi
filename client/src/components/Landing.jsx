import React from 'react'
import { NavLink } from "react-router-dom";

function Landing() {
    return (
        <div>
            <h1>Individual Project FOOD</h1>
			<NavLink to="/home">
				GO!
			</NavLink>
        </div>
    )
}

export default Landing
