import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../actions/index";

function Details() {
	const details = useSelector((state) => state.details);
    const dispatch = useDispatch();
	const { id } = useParams();
    
	useEffect(() => {
        dispatch(getDetails(id));
	}, [dispatch, id]);
    
    console.log(details)

	return (
		<div>
            {/* <h2>{details[0].title}</h2> */}
			Hola
		</div>
	)
}

//TAREA PENDIENTE AUN: 
// [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
// [ ] Resumen del plato
// [ ] Puntuación
// [ ] Nivel de "comida saludable"
// [ ] Paso a paso

export default Details;
