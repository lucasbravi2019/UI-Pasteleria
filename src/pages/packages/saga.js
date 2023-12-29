import { call, put, select, takeLatest } from "redux-saga/effects";
import { deleteData, endpoints, getData, postData, putData } from "../../api";
import { loadPackages, removePackage, runCreatePackage, runDeletePackage, runLoadPackages, runUpdatePackage } from "./slice";
import { setLoaded, setLoading } from "../../redux/slice";
import { runCreateRecipe } from "../recipes/slice";
import { selectPackageIdEditingSelector } from "./selectors";
import { runShowMessage } from "../../components/message/slice";


export function* getAllPackagesSaga() {
    try {
        yield put(setLoading())
        const response = yield call(getData, endpoints.getAllPackages)
        if (response.error === '') {
            yield put(loadPackages(response.body))
            yield put(setLoaded())
        }
    } catch (error) {
        console.log(error);
    }
}

export function* createPackageSaga(action) {
    try {
        yield put(setLoading())
        const response = yield call(postData, endpoints.createPackage, action.payload)
        if (response.error === '') {
            yield put(runLoadPackages())
            yield put(setLoaded())
        }
    } catch (error) {
        console.log(error);
    }
}

export function* deletePackageSaga(action) {
    try {
        const response = yield call(deleteData, endpoints.deletePackage(action.payload))
        if (response.error === '') {
            yield put(removePackage(action.payload))
        }
    } catch (error) {
        console.log(error);
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
            const message = {
                operation: 'PUT',
                content: 'El envase fue editado correctamente',
                error: false
            }
            yield put(runShowMessage(message))
        }
    } catch (error) {
        const message = {
            operation: 'PUT',
            content: 'El envase no se pudo editar',
            error: true
        }
        yield put(runShowMessage(message))
        console.log(error);
    }
}

export default function* packagesSaga() {
    yield takeLatest(runLoadPackages.type, getAllPackagesSaga)
    yield takeLatest(runCreatePackage.type, createPackageSaga)
    yield takeLatest(runDeletePackage.type, deletePackageSaga)
    yield takeLatest(runUpdatePackage.type, updatePackageSaga)
}