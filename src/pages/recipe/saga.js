import { call, put, takeLatest } from "redux-saga/effects";
import { loadRecipe, resetRecipe, runLoadRecipe } from "./slice";
import { endpoints, getData } from "../../api";
import { setLoaded, setLoading } from "../../redux/slice";
import { showMessage } from "../../components/message/slice";
import { buildMessage } from "../../components/message";

export function* getRecipeSaga(action) {
    try {
        yield put(setLoading())
        const response = yield call(getData, endpoints.getRecipeById(action.payload))
        if (response.error == '') {
            yield put(loadRecipe(response.body))
        } else {
            yield put(resetRecipe())
            yield put(showMessage(buildMessage('No se pudo cargar la receta', 'GET', true)))
        }
    } catch (error) {
        yield put(resetRecipe())
        yield put(showMessage(buildMessage('No se pudo cargar la receta', 'GET', true)))
    } finally {
        yield put(setLoaded())
    }
}


export default function* showRecipeSaga() {
    yield takeLatest(runLoadRecipe.type, getRecipeSaga)
}