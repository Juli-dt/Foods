import React, { useState, useEffect, useRef } from "react";
import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AddRecipe.css";
import { Link } from "react-router-dom";

//*Funcion para validar los inputs que reciben informacion del usuario
function validate(recipe) {
    const errors = {};

    const regularExpression = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const regExpUrl = /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/;
    if (!recipe.title.trim())
        errors.title = "Please put the title of the recipe!";
    if (!regularExpression.test(recipe.title.trim()))
        errors.title = "Title field only accepts letters and blank spaces!";
    if (!recipe.summary.trim())
        errors.summary = "Please put the summary of the recipe!";
    if (!regExpUrl.test(recipe.image.trim()))
        errors.image = "Must be an image URL";
    if (!recipe.image.trim()) errors.image = "Please put the image URL";
    if (!regExpUrl.test(recipe.image.trim()))
        errors.image = "Must be an image URL";
    return errors;
}

function NewRecipe() {
    const formRef = useRef(null); //*Hook para referencia el form
    const dispatch = useDispatch();
    const allDiets = useSelector((state) => state.typeDiets);
    const [stepDescription, setStepDescription] = useState("");
    const [errors, setErrors] = useState({});
    const [recipe, setRecipe] = useState({
        title: "",
        summary: "",
        healthScore: 50,
        image: "",
        steps: [],
        diets: [],
        numSteps: 0,
    });

    //*cuando se renderiza el formulario cargo los tipos de dietas ejecutando la actions
    useEffect(() => {
        dispatch(actions.getDiets());
    }, [dispatch]);

    //*Funcion Handler que captura la informacion de los input y a la vez realiza las validaciones
    const handleChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value,
        });

        setErrors(
            validate({
                ...recipe,
                [e.target.name]: e.target.value,
            })
        );
    };

    //* Funcion handler para capturar los tipos de dieta que son chequeadas
    const changeHandler = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setRecipe({ ...recipe, diets: [...recipe.diets, value] });
        } else {
            setRecipe({
                ...recipe,
                diets: recipe.diets.filter((x) => x !== value),
            });
        }
    };

    //*Funcion Handler que realiza el envio de la informacion una vez validada o se revalida de que este completa el formnulario
    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors(validate(recipe));

        if (
            recipe.title &&
            recipe.summary &&
            recipe.image &&
            recipe.diets.length &&
            recipe.steps.length &&
            !Object.keys(errors).length
        ) {
            console.log(recipe)
            dispatch(actions.addRecipe(recipe));

            alert("Recipe successfully Created");
            setRecipe({
                title: "",
                summary: "",
                healthScore: 50,
                image: "",
                steps: [],
                diets: [],
                numSteps: 0,
            });
            formRef.current.reset();
        } else {
            alert("All fields are required");
        }
    };

    const handleDelete = (e) => {
        console.log(e.target.value);
        e.preventDefault();
        setRecipe({
            ...recipe,
            steps: [],
        });
    };

    function handleChangeStep(e) {
        setStepDescription(e.target.value);
    }

    function handleStep(e) {
        e.preventDefault();
        if (stepDescription !== "") {
            setRecipe({
                ...recipe,
                numSteps: recipe.numSteps + 1,
                steps: [
                    ...recipe.steps,
                    { number: recipe.numSteps + 1, step: stepDescription },
                ],
            });
            setStepDescription("");
        } else {
            alert("please put a step");
        }
    }

    return (
        <div className={styles.formSection}>
            <div className={styles.overlay} />

            <div className={styles.title}>
                <h2>New Recipe</h2>
            </div>

            <div className={styles.formContainer}>
                <form
                    onSubmit={handleSubmit}
                    className={styles.formulario}
                    ref={formRef}
                >
                    <Link
                        to="/home"
                        className={styles.btn}
                        style={{ textDecoration: "none" }}
                    >
                        Back
                    </Link>
                    <div className={styles.imgContainer}>
                        <img src={recipe.image} alt="" />
                    </div>
                    <div className={styles.inputName}>
                        <label className={styles.inputTitle}>Title</label>
                        <input
                            className={errors.title ? styles.errorInput : styles.input}
                            type="text"
                            value={recipe.title}
                            name="title"
                            onChange={handleChange}
                        />
                        {errors.title && (
                            <span className={styles.errorText}>{errors.title}</span>
                        )}
                    </div>
                    <div className={styles.inputResumen}>
                        <label className={styles.inputTitle}>Summary</label>
                        <textarea
                            className={
                                errors.summary ? styles.errorTextarea : styles.textarea
                            }
                            type="text"
                            value={recipe.summary}
                            name="summary"
                            maxLength="1000"
                            onChange={handleChange}
                        />
                        {errors.summary && (
                            <span className={styles.errorText}>{errors.summary}</span>
                        )}
                    </div>
                    <div className={styles.inputName}>
                        <label className={styles.inputTitle}>Health Score</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={recipe.healthScore}
                            name="healthScore"
                            onChange={handleChange}
                        />
                        <output id="rangevalue">{recipe.healthScore}</output>
                    </div>
                    <div className={styles.inputName}>
                        <label className={styles.inputTitle}>Image</label>
                        <input
                            className={errors.image ? styles.errorInput : styles.input}
                            type="url"
                            value={recipe.image}
                            name="image"
                            onChange={handleChange}
                        />
                        {errors.image && (
                            <span className={styles.errorText}>{errors.image}</span>
                        )}
                    </div>
                    <div className={styles.inputResumen}>
                        <label className={styles.inputTitle}>Step by step</label>
                        <textarea
                            className={styles.textareaSteps}
                            type="text"
                            name="steps"
                            maxLength="500"
                            value={stepDescription}
                            onChange={handleChangeStep}
                        />
                        <div className={styles.btnContainer}>
                            <button onClick={handleStep} className={styles.btnx}>
                                Add
                            </button>
                            <button className={styles.btnx} onClick={handleDelete}>
                                Clean
                            </button>
                        </div>
                        <ul>
                            {recipe.steps.map((e, idx) => {
                                return (
                                    <p key={idx} className={styles.listSteps}>
                                        {e.number} : {e.step}
                                    </p>
                                );
                            })}
                        </ul>
                    </div>
                    <div className={styles.inputDietas}>
                        <label className={styles.inputTitle}>Type Diets</label>
                        {allDiets.map((x) => {
                            return (
                                <div key={x.id}>
                                    <label htmlFor="">
                                        <input
                                            className={styles.inputCheck}
                                            type="checkbox"
                                            onChange={changeHandler}
                                            name="diets"
                                            value={x.name}
                                        />
                                        {x.name}
                                    </label>
                                </div>
                            );
                        })}
                    </div>

                    <button type="submit" className={styles.buttonForm}>
                        Create Recipe
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewRecipe;






























// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { addRecipeFunc, getRecipesByDietFunc } from "../../redux/actions/index";
// import styles from "./AddRecipe.css";

// function validate(post) {
//     let errors = {};
//     if (!post.name) {
//         errors.name = 'Ingresar nombre de la receta'
//     }
//     if (!post.summary) {
//         errors.summary = 'Escribe un breve resumen'
//     }
//     if (!post.score || post.score < 0 || post.score > 100) {
//         errors.score = 'Ingresa un valor de 0 a 100'
//     }
//     if (!post.healthScore || post.healthScore < 0 || post.healthScore > 100) {
//         errors.healthScore = 'Ingresa un valor de 0 a 100'
//     }
//     if (!post.stepByStep.length) {
//         errors.stepByStep = 'Escribe una serie de pasos sobre cómo cocinar la receta'
//     }
//     if (!post.image) {
//         errors.image = 'Ingresar URL de alguna imagen representativa'
//     }
//     if (!post.diets.length) {
//         errors.diets = 'Elige al menos un tipo de dieta'
//     }
//     return errors;
// }

// export default function RecipeCreate() {
//     const dispatch = useDispatch();
//     const diets = useSelector(state => state.diets);
//     const [errors, setErrors] = useState({});

//     useEffect(() => {
//         dispatch(getRecipesByDietFunc())
//     }, [dispatch])


//     const [post, setPost] = useState({
//         name: '',
//         summary: '',
//         score: 0,
//         healthScore: 0,
//         image: '',
//         stepByStep: [],
//         diets: []
//     })
//     function handleInputChange(e) {
//         setPost({
//             ...post,
//             [e.target.name]: e.target.value
//         });
//         setErrors(validate({
//             ...post,
//             [e.target.name]: e.target.value
//         }));
//     };

//     function handleSubmit(e) {
//         e.preventDefault();
//         if (Object.values(errors).length > 0) alert("Por favor rellenar todos los campos")
//         else {
//             dispatch(addRecipeFunc(post))
//             alert('¡Receta creada con éxito!')
//         }
//     };

//     function handleSelectDiets(e) {
//         if (!post.diets.includes(e.target.value))
//             setPost({
//                 ...post,
//                 diets: [...post.diets, e.target.value]
//             });
//         setErrors(validate({
//             ...post,
//             diets: [...post.diets, e.target.value]
//         }));
//     };

//     function handleSteps(e) {
//         setPost({
//             ...post,
//             stepByStep: [e.target.value]
//         });
//         setErrors(validate({
//             ...post,
//             stepByStep: e.target.value
//         }));
//     }

//     function handleDietDelete(diet) {
//         setPost({
//             ...post,
//             diets: post.diets.filter(elemet => elemet !== diet)
//         })
//         setErrors(validate({
//             ...post,
//             diets: [...post.diets]
//         }));

//     };

//     return (
//         <div className={styles.container}>
//             <div className={styles.bkg} />
//             <div className={styles.bkgcolor}>
//                 <div className={styles.form}>
//                     <h1>Please fill in all the fields</h1>
//                     <form onSubmit={e => handleSubmit(e)}>
//                         <div>
//                             <label>Nombre</label>
//                             <input type="text" value={post.name} name='name' onChange={e => handleInputChange(e)} />
//                             {errors.name && (
//                                 <p>{errors.name}</p>
//                             )}
//                         </div>
//                         <div>
//                             <label>Resumen</label>
//                             <textarea value={post.summary} name='summary' onChange={e => handleInputChange(e)} />
//                             {errors.summary && (
//                                 <p>{errors.summary}</p>
//                             )}
//                         </div>
//                         <div>
//                             <label>Puntaje</label>
//                             <input type="number" min="0" max='100' value={post.score} name='score' onChange={e => handleInputChange(e)} />
//                             {errors.score && (
//                                 <p>{errors.score}</p>
//                             )}
//                         </div>
//                         <div>
//                             <label>Nivel Saludable</label>
//                             <input type="number" min="0" max='100' value={post.healthScore} name='healthScore' onChange={e => handleInputChange(e)} />
//                             {errors.healthScore && (
//                                 <p>{errors.healthScore}</p>
//                             )}
//                         </div>
//                         <div>
//                             <label>Imagen</label>
//                             <input type="text" value={post.image} name='image' onChange={e => handleInputChange(e)} />
//                             {errors.image && (
//                                 <p>{errors.image}</p>
//                             )}
//                         </div>
//                         <div>
//                             <label>Paso a Paso</label>
//                             <textarea value={post.stepByStep} name='stepByStep' onChange={e => handleSteps(e)} />
//                             {errors.stepByStep && (
//                                 <p>{errors.stepByStep}</p>
//                             )}
//                         </div>
//                         <div>
//                             <select onChange={e => handleSelectDiets(e)} defaultValue='default'
//                                 className={styles.dietSelect}>
//                                 <div>
//                                     <select className={styles.dietOption}>
//                                         <option value="default" disabled>Elegir dietas</option>
//                                         <option value="gluten free">Gluten Free</option>
//                                         <option value="ketogenic">Ketogenic</option>
//                                         <option value="dairy free">Dairy Free</option>
//                                         <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
//                                         <option value="vegan">Vegan</option>
//                                         <option value="pescatarian">Pescatarian</option>
//                                         <option value="paleolithic">Paleolithic</option>
//                                         <option value="primal">Primal</option>
//                                         <option value="whole 30">Whole 30</option>
//                                     </select>
//                                 </div>

//                             </select>
//                             {errors.diets && (
//                                 <p style={{ float: 'right' }}>{errors.diets}</p>
//                             )}
//                             {post.diets.map(d =>
//                                 <div key={d.id} className={styles.divdiets}>
//                                     <p className={styles.selecteddiets}>{d}</p>
//                                     <button onClick={() => handleDietDelete(d)}
//                                         className={styles.buttonclose}>X</button>
//                                 </div>
//                             )}
//                         </div>
//                         <button type='submit' className={styles.createButton}>¡Crear!</button>
//                     </form>
//                     <Link to='/home'>
//                         <button className={styles.createButton}>Volver</button>
//                     </Link>
//                 </div>
//                 <p className="quote_author">
//                     - Elizabeth Briggs
//                 </p>
//             </div>
//         </div>
//     )

// }

