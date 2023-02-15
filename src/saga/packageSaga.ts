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
    removeIngredient,
} from '../redux/reducers/ingredientSlice'
import {
    resetMessages,
    setErrorMessage,
    setSuccessMessage,
} from '../redux/reducers/messageSlice'
import {
    addPackage,
    loadPackages,
    removePackage,
    runAddPackage,
    runChangePackagePrice,
    runLoadPackages,
    runRemovePackage,
} from '../redux/reducers/packageSlice'

export function* getPackagesSaga(): Generator<any> {
    try {
        const response: any = yield call(getData, endpoints.getAllPackages)
        if (response.error) {
            return
        }
        yield put(loadPackages(response.body))
    } catch (error) {
        console.log(error);
    }
}

export function* addPackageSaga(action: any): Generator<any> {
    try {
        yield put(resetMessages())
        const response: any = yield call(postData, endpoints.createPackage, action.payload)
        if (response.error) {
            yield put(setErrorMessage('El envase no se pudo crear'))
        } else {
            yield put(setSuccessMessage('El envase fue creado con éxito'))
            yield put(addPackage(response.body))
        }
    } catch (error) {
        console.log(error);
        yield put(setErrorMessage('El envase no se pudo crear'))
    }
}

export function* deletePackageSaga(action: any): Generator<any> {
    try {
        const packageId = action.payload
        const deletePackageResponse: any = yield call(deleteData, endpoints.deletePackage(packageId))
        if (deletePackageResponse.error) {
            yield put(setErrorMessage('No se pudo borrar el envase'))
            return
        }
        yield put(removePackage(packageId))
    } catch (error) {
        console.log(error);
        yield put(setErrorMessage('No se pudo borrar el envase'))
    }
}

export function* changePackagePriceSaga(action: any): Generator<any> {
    try {
        const price: PackagePrice = {
            price: action.payload.price
        }
        const response: any = yield call(putData, endpoints.changeIngredientPackagePrice(action.payload.packageId), price)
        if (response.error) {
            yield put(setErrorMessage('No se pudo cambiar el precio del envase'))
        } else {
            yield put(setSuccessMessage('Se cambió el precio con éxito'))
            yield put(removeIngredient(response.body.id))
            yield put(addIngredient(response.body))
        }
    } catch (error) {
        yield put(setErrorMessage('No se pudo cambiar el precio del envase'))
    }
}

export default function* packageSaga() {
    yield takeLatest(runLoadPackages.type, getPackagesSaga)
    yield takeLatest(runAddPackage.type, addPackageSaga)
    yield takeLatest(runRemovePackage.type, deletePackageSaga)
    yield takeLatest(runChangePackagePrice.type, changePackagePriceSaga)
}