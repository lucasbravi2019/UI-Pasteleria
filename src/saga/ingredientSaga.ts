import {
    call,
    put,
    takeLatest,
} from 'redux-saga/effects'

import {
    deleteData,
    endpoints,
    getData,
    postData,
} from '../api/index'
import { Ingredient } from '../interfaces/recipe'
import {
    addIngredient,
    loadIngredients,
    removeIngredient,
    runAddIngredient,
    runDeleteIngredient,
    runLoadIngredients,
} from '../redux/reducers/ingredientSlice'
import {
    resetMessages,
    setErrorMessage,
    setSuccessMessage,
} from '../redux/reducers/messageSlice'

export function* getIngredientsSaga() {
    try {
        yield put(resetMessages())
        const response: Ingredient[] = yield call(getData, endpoints.getAllIngredients)
        if (response) {
            yield put(loadIngredients(response))
        }
    } catch (error) {
        console.log(error);
    }
}

export function* createIngredientSaga(action: any): Generator<any> {
    try {
        const response: any = yield call(postData, endpoints.createIngredient, action.payload)
        if (response.hasOwnProperty('error') && response.error) {
            yield put(setErrorMessage('El ingrediente no se pudo crear'))
        } else {
            const ingredient: Ingredient = {
                id: response,
                metric: action.payload.metric,
                name: action.payload.name,
                price: action.payload.price,
                quantity: action.payload.quantity
            }
            yield put(addIngredient(ingredient))
            yield put(setSuccessMessage('El ingrediente fue crado con éxito'))
        }
    } catch (error) {
        console.log(error);
        yield put(setErrorMessage('No pudo crearse el ingrediente'))
    }
}

export function* deleteIngredientSaga(action: any): Generator<any> {
    try {
        const response: any = yield call(deleteData, endpoints.deleteIngredient(action.payload))
        if (response.hasOwnProperty('error') && response.error) {
            yield put(setErrorMessage('No se pudo borrar el ingrediente'))
        } else {
            yield put(removeIngredient(action.payload))
            yield put(setSuccessMessage('Se pudo borrar el ingrediente con éxito'))
        }
    } catch (error) {
        console.log(error);
        yield put(setErrorMessage('No se pudo borrar el ingrediente'))
    }
}

export default function* ingredientSaga() {
    yield takeLatest(runLoadIngredients.type, getIngredientsSaga)
    yield takeLatest(runAddIngredient.type, createIngredientSaga)
    yield takeLatest(runDeleteIngredient.type, deleteIngredientSaga)
}
