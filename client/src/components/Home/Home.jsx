import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipesFunc, fltrByDiets, fltrByTitle, fltrByPts, getRecipesName } from "../../redux/actions/index";
import Card from "../Card/Card";
import Paging from "../Paging/Paging";
import "./Home.css";

const Home = () => {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);

    const [search, setSearch] = useState(''); // SearchBar
    const [orden, setOrden] = useState('');
    const [order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexLastRecipe = currentPage * recipesPerPage;
    const indexFirstRecipe = indexLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);

    const webPaging = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getRecipesFunc());
    }, [dispatch]);

    function handleOnClick(e) {
        e.preventDefault();
        dispatch(getRecipesFunc());
    }

    function handleFltrDietType(e) {
        dispatch(fltrByDiets(e.target.value));
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(fltrByTitle(e.target.value));
        setCurrentPage(1);
        setOrden(`Sorted ${e.target.value}`);
    }

    function handlePts(e) {
        e.preventDefault();
        dispatch(fltrByPts(e.target.value));
        setCurrentPage(1);
        setOrder(`Sorted ${e.target.value}`);
    }

    function handleSubmit(e) {
        e.preventDefault(e);
        dispatch(getRecipesName(search));
        setSearch('');
    }

    function handleInputName(e) {
        setSearch(e.target.value);
    }

    return (
        <div>
            <div className="site-bg">
                <div className="wrapper">
                    <div className="navbar">
                        <div className="search_bar">
                            <form onSubmit={(e) => { handleSubmit(e) }}>
                                <input type="text" placeholder="look up a recipe" value={search} onChange={(e) => { handleInputName(e) }}></input>
                                <button type="submit">Search</button>
                            </form>
                        </div>
                        <div className="create_recipe">
                            <Link to="/recipes">
                                <button className="create_recipe_btn">Create New Recipe</button>
                            </Link>
                            <button onClick={e => handleOnClick(e)} className="refresh_btn">Refresh</button>
                        </div>
                        <div>
                            <select onChange={e => handleSort(e)}>
                                <option value="asc">Sort A-Z</option>
                                <option value="des">Sort Z-A</option>
                            </select>
                        </div>
                        <div>
                            <select onChange={e => handlePts(e)}>
                                <option value="highlow">Rating High-Low</option>
                                <option value="lowhigh">Rating Low-High</option>
                            </select>
                        </div>
                        <div>
                            <select onChange={e => handleFltrDietType(e)}>
                                <option value="All">All recipes</option>
                                <option value="gluten free">Gluten Free</option>
                                <option value="ketogenic">Ketogenic</option>
                                <option value="dairy free">Dairy Free</option>
                                <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                                <option value="vegan">Vegan</option>
                                <option value="pescatarian">Pescatarian</option>
                                <option value="paleolithic">Paleolithic</option>
                                <option value="primal">Primal</option>
                                <option value="whole 30">Whole 30</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <Paging recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} pagingFunc={webPaging} />
                    </div>
                    <div className="card-container">
                        {console.log(currentRecipes)};
                        {currentRecipes.map(recipe => (
                            <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                                <Card
                                    id={recipe.id}
                                    title={recipe.title}
                                    img={recipe.img}
                                    diets={recipe.diets}
                                    />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
