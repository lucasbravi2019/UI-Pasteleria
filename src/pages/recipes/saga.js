import { call, put, select, takeLatest } from "redux-saga/effects";
import { deleteData, endpoints, getData } from "../../api";
import { setLoaded, setLoading } from "../../redux/slice";
import { closeModal, loadRecipes, removeRecipe, runDeleteRecipe, runLoadRecipes } from "./slice";
import { selectRecipeIdSelector } from "./selectors";

export function* getAllRecipesSaga() {
    try {
        yield put(setLoading())
        const response = yield call(getData, endpoints.getAllRecipes)
        yield put(loadRecipes(response.body))
        yield put(setLoaded())
    } catch (error) {
        yield put(setLoaded())
    }
}

export function* deleteRecipeSaga(action) {
    try {
        const response = yield call(deleteData, endpoints.deleteRecipe(action.payload))
        if (response.error == null) {
            yield put(removeRecipe(action.payload))
            yield put(closeModal())
        }
    } catch (error) {
        console.log(error);
    }
}

export default function* recipeSaga() {
    yield takeLatest(runLoadRecipes.type, getAllRecipesSaga)
    yield takeLatest(runDeleteRecipe.type, deleteRecipeSaga)
} 