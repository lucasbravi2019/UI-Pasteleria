import { call, put, select, takeLatest } from "redux-saga/effects";
import { loadIngredients, runCreateIngredient, runDeleteIngredient, runLoadIngredients, runUpdateIngredient } from "./slice";
import { showMessage } from "../../components/message/slice";
import { buildMessage } from "../../components/message";
import { setLoaded, setLoading } from "../../redux/slice";
import { deleteData, endpoints, getData, postData, putData } from "../../api";
import { selectIngredientIdSelector } from "./selector";

export function* loadIngredientsSaga() {
    try {
        yield put(setLoading())
        const response = yield call(getData, endpoints.getAllIngredients)
        if (response.error === '') {
            yield put(loadIngredients(response.body))
            yield put(setLoaded())
        }
    } catch (error) {
        yield put(showMessage(buildMessage('No se pudieron recuperar los ingredientes', 'GET', true)))
        yield put(setLoaded())
    }
}

export function* createIngredientSaga(action) {
    try {
        yield put(setLoading())
        const response = yield call(postData, endpoints.createIngredient, action.payload)
        if (response.error === '') {
            yield put(runLoadIngredients())
            yield put(showMessage(buildMessage('El ingrediente se creó correctamente', 'POST', false)))
            yield put(setLoaded())
        } 
    } catch (error) {
        yield put(showMessage(buildMessage('No se pudo crear el ingrediente', 'POST', true)))
        yield put(setLoaded())
    }
}

export function* updateIngredientSaga(action) {
    try {
        yield put(setLoading())
        const ingredientId = yield select(selectIngredientIdSelector)
        const body = {
            id: ingredientId,
            name: action.payload.name
        }
        const response = yield call(putData, endpoints.editIngredient, body)
        if (response.error === '') {
            yield put(runLoadIngredients())
            yield put(showMessage(buildMessage('Se editó el ingrediente correctamente', 'PUT', false)))
            yield put(setLoaded())
        } else {
            yield put(showMessage(buildMessage('No se pudo editar el ingrediente', 'PUT', true)))
            yield put(setLoaded())
        }
    } catch (error) {
        yield put(showMessage(buildMessage('No se pudo editar el ingrediente', 'PUT', true)))
        yield put(setLoaded())
    }
}

export function* deleteIngredientSaga(action) {
    try {
        yield put(setLoading())
        const response = yield call(deleteData, endpoints.deleteIngredient(action.payload))
        if (response.error === '') {
            yield put(runLoadIngredients())
            yield put(showMessage(buildMessage('Se borró el ingrediente correctamente', 'DELETE', false)))
            yield put(setLoaded())
        }
    } catch (error) {
        yield put(showMessage(buildMessage('El ingrediente no se pudo borrar', 'DELETE', true)))
        yield put(setLoaded())
    }
}


export default function* ingredientsSaga() {
    yield takeLatest(runLoadIngredients.type, loadIngredientsSaga)
    yield takeLatest(runCreateIngredient.type, createIngredientSaga)
    yield takeLatest(runUpdateIngredient.type, updateIngredientSaga)
    yield takeLatest(runDeleteIngredient.type, deleteIngredientSaga)
}