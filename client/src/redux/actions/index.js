import axios from "axios";
import { GET_RECIPE, FILTER_BY_DIET, GET_BY_TITLE, GET_DIETS, ORDER_BY_TITLE, RECIPE_DETAIL, ORDER_BY_PTS, SEARCH_BY_NAME, GET_BY_ID, ADD_RECIPE, GET_DIET_TYPES, ORDER_BY_NAME } from "./types";


const URL = "http://localhost:3001"

export const addRecipe = (recipe) => {
    return async (dispatch) => {
        const response = await axios.post("/recipes", recipe);
        return dispatch({
            type: ADD_RECIPE,
            payload: response.data,
        });
    };
};
export const getRecipesFunc = () => {
    return async (dispatch) => {
        var json = await axios.get(`${URL}/recipes`);
        return dispatch({
            type: GET_RECIPE,
            payload: json.data
        })
    }
}
export const getDiets = () => {
    return async (dispatch) => {
        const response = await axios(`/diets`);
        return dispatch({
            type: GET_DIETS,
            payload: response.data,
        });
    };
};
export const fltrByDiets = (payload) => {
    return {
        type: FILTER_BY_DIET,
        payload
    }
}
export function orderByName(name) {
    return async (dispatch) => {
        try {
            const response = await axios(
                `/recipes?name=${name}`
            );
            return dispatch({
                type: GET_BY_TITLE,
                payload: response.data,
            });
        } catch (error) {
            alert("Recipe not found");
        }
    };
};


export const fltrByTitle = (payload) => {
    return {
        type: ORDER_BY_TITLE,
        payload
    }
}

export const fltrByPts = (payload) => {
    return {
        type: ORDER_BY_PTS,
        payload
    }
}

export function getRecipesName(name) {
    return async function (dispatch) {
        let json = await axios.get('/recipes?name=' + name);
        return dispatch({ type: SEARCH_BY_NAME, payload: json.data })
    }
};

// export const getRecipesByTitleFunc = (title) => {
//     return async (dispatch) => {
//         var json = await axios.get(`http://localhost:3001/recipes?name=${title}`);
//         return dispatch({
//             type: GET_BY_TITLE,
//             payload: json.data
//         })
//     }
// }

export const getRecipesByIdFunc = (id) => {
    return async (dispatch) => {
        var json = await axios.get(`${URL}/recipes/${id}`);
        return dispatch({
            type: GET_BY_ID,
            payload: json.data
        })
    }
}

export const getRecipesByDietFunc = () => {
    return async (dispatch) => {
        var json = await axios.get(`${URL}/diets`);
        return dispatch({
            type: GET_DIET_TYPES,
            payload: json.data
        })
    }
}

// export const addRecipeFunc = (payload) => {
//     return async (dispatch) => {
//         var json = await axios.post(`${URL}/recipes`, payload);
//         dispatch({
//             type: ADD_RECIPE,
//             payload: json.data
//         })
//     }
// }
export function recipeDetail(id) {
    return async function (dispatch) {
        let json = await axios.get(`${URL}/recipes/${id}`)
        return dispatch({ type: RECIPE_DETAIL, payload: json.data })
    }
}