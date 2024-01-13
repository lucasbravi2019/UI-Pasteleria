import { call, put, select, takeLatest } from "redux-saga/effects";
import { deleteData, endpoints, getData, postData, putData } from "../../api";
import { loadPackages, removePackage, runCreatePackage, runDeletePackage, runLoadPackages, runUpdatePackage } from "./slice";
import { setLoaded, setLoading } from "../../redux/slice";
import { selectPackageEditingIdSelector } from "./selectors";
import { runShowMessage, showMessage } from "../../components/message/slice";
import { buildMessage } from "../../components/message";


export function* getAllPackagesSaga() {
    try {
        yield put(setLoading())
        const response = yield call(getData, endpoints.getAllPackages)
        if (response.error === '') {
            yield put(loadPackages(response.body))
        } else {
            yield put(showMessage(buildMessage('No se pudieron recuperar los envases', 'GET', true)))
        }
    } catch (error) {
        yield put(showMessage(buildMessage('No se pudieron recuperar los envases', 'GET', true)))
    } finally {
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
        } else {
            yield put(showMessage(buildMessage('No se pudo crear el envase', 'POST', true)))
        }
    } catch (error) {
        yield put(showMessage(buildMessage('No se pudo crear el envase', 'POST', true)))
    } finally {
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
        } else {
            yield put(showMessage(buildMessage('El envase no se pudo borrar', 'DELETE', true)))
        }
    } catch (error) {
        yield put(showMessage(buildMessage('El envase no se pudo borrar', 'DELETE', true)))
    } finally {
        yield put(setLoaded())
    }
}

export function* updatePackageSaga(action) {
    try {
        yield put(setLoading())
        const packageId = yield select(selectPackageEditingIdSelector)
        const body = {
            id: packageId,
            metric: action.payload.metric,
            quantity: action.payload.quantity
        }
        const response = yield call(putData, endpoints.updatePackage, body)
        if (response.error === '') {
            yield put(runLoadPackages())
            yield put(runShowMessage(buildMessage('El envase fue editado correctamente', 'PUT', false)))
        } else {
            yield put(runShowMessage(buildMessage('El envase no se pudo editar', 'PUT', true)))
        }
    } catch (error) {
        yield put(runShowMessage(buildMessage('El envase no se pudo editar', 'PUT', true)))
    } finally {
        yield put(setLoaded())
    }
}

export default function* packagesSaga() {
    yield takeLatest(runLoadPackages.type, getAllPackagesSaga)
    yield takeLatest(runCreatePackage.type, createPackageSaga)
    yield takeLatest(runDeletePackage.type, deletePackageSaga)
    yield takeLatest(runUpdatePackage.type, updatePackageSaga)
}