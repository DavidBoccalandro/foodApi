import React from 'react'
import {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {postNewRecipe, getDiets} from '../actions/index';

function FormCreateRecipe() {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector(state => state.diets);
    const[input, setInput] = useState({
        title: '',
        summary: '',
        spoonacularScore: 0,
        healthScore: 0,
        analizedInstructions: '',
        image: '',
        diets: [],
    })

    const KEYS = Object.keys(input);
    KEYS.pop();
    var keyForm = 1;
    
    function handleChange(e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value,
            diets: e.target.value,
        });
    }

    function handleCheck(e) {
        e.preventDefault()
        if (e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value],
            });
        } else {
            setInput({
                ...input,
                diets: input.diets.filter((d) => d !== e.target.value),
            });
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(postNewRecipe(input));
        alert("Recipe created successfully!");
        setInput({
            title: '',
            summary: '',
            spoonacularScore: 0,
            healthScore: 0,
            analizedInstructions: '',
            image: '',
            diets: [],
        })
        history.push('/home')
    }

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    return (
        <div>
            <h1>Create NEW Recipe</h1>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <div>
                    <div>
                        {
                            KEYS.map((e)=>(
                                <div key={++keyForm}>
                                    <div>
                                        <label>
                                            <h2>{e}</h2>
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        name={e}
                                        value={input.e}
                                        onChange={e=>handleChange(e)}
                                    ></input>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    {
                        diets?.map(d=>(
                            <div key={d.id}>
                                <div>
                                    <label>
                                        <h2>{d.name}</h2>
                                    </label>
                                </div>
                                <input onChange={e=> handleCheck(e)} type="checkbox" name={d.title} value={d.title}></input>
                            </div>
                        ))
                    }
                    <button>Create Recipe!!!</button>
                </div>
            </form>
            <Link to="/home">
                <button>Go Home</button>
            </Link>
        </div>
    )
}

export default FormCreateRecipe
