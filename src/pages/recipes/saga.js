import { call, put, select, takeLatest } from "redux-saga/effects";
import { deleteData, endpoints, getData } from "../../api";
import { setLoaded, setLoading } from "../../redux/slice";
import { closeModal, loadIngredients, loadPackages, loadRecipes, removeRecipe, runDeleteRecipe, runLoadRecipes } from "./slice";
import { normalizeRecipes } from "./utils/normalizer";
import { selectRecipeIdSelector } from "./selectors";

export function* getAllRecipesSaga() {
    try {   
        yield put(setLoading())
        const response = yield call(getData, endpoints.getAllRecipes)
        const normalizedData = normalizeRecipes(response.body)
        const recipes = normalizedData.entities.recipes
        const ingredients = normalizedData.entities.ingredients
        const packages = normalizedData.entities.packages
        yield put(loadRecipes(recipes))
        yield put(loadIngredients(ingredients))
        yield put(loadPackages(packages))
        yield put(setLoaded())
    } catch (error) {
        yield put(setLoaded())
    }
}

export function* deleteRecipeSaga() {
    try {
        const recipeId = yield select(selectRecipeIdSelector)
        const response = yield call(deleteData, endpoints.deleteRecipe(recipeId))
        console.log(response);
        yield put(removeRecipe(recipeId))
        yield put(closeModal())
    } catch (error) {
        console.log(error);
    }
}

export default function* recipeSaga() {
    yield takeLatest(runLoadRecipes.type, getAllRecipesSaga)
    yield takeLatest(runDeleteRecipe.type, deleteRecipeSaga)
} 