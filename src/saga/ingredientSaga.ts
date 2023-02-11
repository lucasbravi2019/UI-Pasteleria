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
  putData,
} from '../api/index'
import { PackagePrice } from '../interfaces/recipe'
import {
  addIngredient,
  loadIngredients,
  removeIngredient,
  runAddIngredient,
  runAddPackageToIngredient,
  runDeleteIngredient,
  runLoadIngredients,
} from '../redux/reducers/ingredientSlice'
import {
  resetMessages,
  setErrorMessage,
  setSuccessMessage,
} from '../redux/reducers/messageSlice'

export function* getIngredientsSaga(): Generator<any> {
    try {
        yield put(resetMessages())
        const response: any = yield call(getData, endpoints.getAllIngredients)
        if (response) {
            console.log(response);

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
            yield put(addIngredient(response))
            yield put(setSuccessMessage('El ingrediente fue creado con éxito'))
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

export function* AddPackageToIngredientSaga(action: any): Generator<any> {
    try {
        const ingredientId = action.payload.ingredientId
        const packageId = action.payload.packageId
        const price: PackagePrice = {
            price: action.payload.price
        }

        const response: any = yield call(putData, endpoints.addPackageToIngredient(ingredientId, packageId), price)
        if (response.hasOwnProperty('error')) {
            yield put(setErrorMessage('No se pudo agregar el envase al ingrediente'))
        } else {
            yield put(setSuccessMessage('Se pudo agregar el envase correctamente'))
        }
    } catch (error) {
        console.log(error);
        yield put(setErrorMessage('No se pudo agregar el envase al ingrediente'))
    }
}

export default function* ingredientSaga() {
    yield takeLatest(runLoadIngredients.type, getIngredientsSaga)
    yield takeLatest(runAddIngredient.type, createIngredientSaga)
    yield takeLatest(runDeleteIngredient.type, deleteIngredientSaga)
    yield takeLatest(runAddPackageToIngredient.type, AddPackageToIngredientSaga)
}
