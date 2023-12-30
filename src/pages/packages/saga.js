import { call, put, select, takeLatest } from "redux-saga/effects";
import { deleteData, endpoints, getData, postData, putData } from "../../api";
import { loadPackages, removePackage, runCreatePackage, runDeletePackage, runLoadPackages, runUpdatePackage } from "./slice";
import { setLoaded, setLoading } from "../../redux/slice";
import { selectPackageIdEditingSelector } from "./selectors";
import { runShowMessage, showMessage } from "../../components/message/slice";
import { buildMessage } from "../../components/message";


export function* getAllPackagesSaga() {
    try {
        yield put(setLoading())
        const response = yield call(getData, endpoints.getAllPackages)
        if (response.error === '') {
            yield put(loadPackages(response.body))
            yield put(setLoaded())
        }
    } catch (error) {
        yield put(showMessage(buildMessage('No se pudieron recuperar los envases', 'GET', true)))
        yield put(setLoaded())
    }
}

export function* createPackageSaga(action) {
    try {
        yield put(setLoading())
        const response = yield call(postData, endpoints.createPackage, action.payload)
        if (response.error === '') {
            yield put(runLoadPackages())
            yield put(showMessage(buildMessage('Se creó el envase correctamente', 'POST', false)))
            yield put(setLoaded())
        }
    } catch (error) {
        yield put(showMessage(buildMessage('No se pudo crear el envase', 'POST', true)))
        yield put(setLoaded())
    }
}

export function* deletePackageSaga(action) {
    try {
        yield put(setLoading())
        const response = yield call(deleteData, endpoints.deletePackage(action.payload))
        if (response.error === '') {
            yield put(removePackage(action.payload))
            yield put(showMessage(buildMessage('El envase fue borrado correctamente', 'DELETE', false)))
            yield put(setLoaded())
        }
    } catch (error) {
        yield put(showMessage(buildMessage('El envase no se pudo borrar', 'DELETE', true)))
        yield put(setLoaded())
    }
}

export function* updatePackageSaga(action) {
    try {
        yield put(setLoading())
        const packageId = yield select(selectPackageIdEditingSelector)
        const body = {
            id: packageId,
            metric: action.payload.metric,
            quantity: action.payload.quantity
        }
        const response = yield call(putData, endpoints.updatePackage, body)
        if (response.error === '') {
            yield put(runLoadPackages())
            yield put(setLoaded())
            yield put(runShowMessage(buildMessage('El envase fue editado correctamente', 'PUT', false)))
        }
    } catch (error) {
        yield put(runShowMessage(buildMessage('El envase no se pudo editar', 'PUT', true)))
        yield put(setLoaded())
    }
}

export default function* packagesSaga() {
    yield takeLatest(runLoadPackages.type, getAllPackagesSaga)
    yield takeLatest(runCreatePackage.type, createPackageSaga)
    yield takeLatest(runDeletePackage.type, deletePackageSaga)
    yield takeLatest(runUpdatePackage.type, updatePackageSaga)
}