import { call, put, takeLatest } from "redux-saga/effects";
import { deleteData, endpoints, getData, postData } from "../../api";
import { setLoaded, setLoading } from "../../redux/slice";
import { addRecipe, closeModal, loadRecipes, removeRecipe, runCreateRecipe, runDeleteRecipe, runLoadRecipes } from "./slice";
import { buildMessage } from "../../components/message";
import { showMessage } from "../../components/message/slice";

export function* getAllRecipesSaga() {
    try {
        yield put(setLoading())
        const response = yield call(getData, endpoints.getAllRecipes)
        yield put(loadRecipes(response.body))
        yield put(setLoaded())
    } catch (error) {
        yield put(showMessage(buildMessage('No se pudieron recuperar las recetas', 'GET', true)))
        yield put(setLoaded())
    }
}

export function* deleteRecipeSaga(action) {
    try {
        yield put(setLoading())
        const response = yield call(deleteData, endpoints.deleteRecipe(action.payload))
        if (response.error === '') {
            yield put(removeRecipe(action.payload))
            yield put(showMessage(buildMessage('Se borró la receta correctamente', 'DELETE', false)))
            yield put(setLoaded())
            yield put(closeModal())
        }
    } catch (error) {
        yield put(showMessage(buildMessage('No se pudo borrar la receta', 'DELETE', true)))
        yield put(setLoaded())
        yield put(closeModal())
    }
}

export function* createRecipeSaga(action) {
    try {
        yield put(setLoading())
        const response = yield call(postData, endpoints.createRecipe, action.payload)
        if (response.error === '') {
            yield put(runLoadRecipes())
            yield put(showMessage(buildMessage('La receta se creó correctamente', 'POST', false)))
            yield put(setLoaded())
        }
    } catch (error) {
        yield put(showMessage(buildMessage('No se pudo crear la receta', 'POST', true)))
        yield put(setLoaded())
    }
}

export default function* recipeSaga() {
    yield takeLatest(runLoadRecipes.type, getAllRecipesSaga)
    yield takeLatest(runDeleteRecipe.type, deleteRecipeSaga)
    yield takeLatest(runCreateRecipe.type, createRecipeSaga)
} 