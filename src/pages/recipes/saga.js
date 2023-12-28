import { call, put, takeLatest } from "redux-saga/effects";
import { deleteData, endpoints, getData, postData } from "../../api";
import { setLoaded, setLoading } from "../../redux/slice";
import { addRecipe, closeModal, loadRecipes, removeRecipe, runCreateRecipe, runDeleteRecipe, runLoadRecipes } from "./slice";

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
        if (response.error === '') {
            yield put(removeRecipe(action.payload))
            yield put(closeModal())
        }
    } catch (error) {
        yield put(closeModal())
    }
}

export function* createRecipeSaga(action) {
    try {
        const response = yield call(postData, endpoints.createRecipe, action.payload)
        if (response.error === '') {
            yield put(runLoadRecipes())
        }
    } catch (error) {
        console.log(error);
    }
}

export default function* recipeSaga() {
    yield takeLatest(runLoadRecipes.type, getAllRecipesSaga)
    yield takeLatest(runDeleteRecipe.type, deleteRecipeSaga)
    yield takeLatest(runCreateRecipe.type, createRecipeSaga)
} 