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
    runLoadPackages,
    runRemovePackage,
} from '../redux/reducers/packageSlice'

export function* getPackagesSaga(): Generator<any> {
    try {
        const response = yield call(getData, endpoints.getAllPackages)
        if (response) {
            yield put(loadPackages(response))
        }
    } catch (error) {
        console.log(error);
    }
}

export function* addPackageSaga(action: any): Generator<any> {
    try {
        yield put(resetMessages())
        const response: any = yield call(postData, endpoints.createPackage, action.payload)
        if (response.hasOwnProperty('error') && response.error) {
            yield put(setErrorMessage('El envase no se pudo crear'))
        } else {
            yield put(setSuccessMessage('El envase fue creado con éxito'))
            yield put(addPackage(response))
        }
    } catch (error) {
        console.log(error);
    }
}

export function* deletePackageSaga(action: any): Generator<any> {
    try {
        const response: any = yield call(deleteData, endpoints.deletePackage(action.payload))
        if (response.hasOwnProperty('error') && response.error) {
            yield put(setErrorMessage('No se pudo borrar el envase'))
        } else {
            yield put(setSuccessMessage('El envase fue borrado con éxito'))
            yield put(removePackage(response))
        }
    } catch (error) {
        console.log(error);
        yield put(setErrorMessage('No se pudo borrar el envase'))
    }
}

export default function* packageSaga() {
    yield takeLatest(runLoadPackages.type, getPackagesSaga)
    yield takeLatest(runAddPackage.type, addPackageSaga)
    yield takeLatest(runRemovePackage.type, deletePackageSaga)
}