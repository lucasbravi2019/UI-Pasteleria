import { call, put, takeLatest } from "redux-saga/effects";
import { deleteData, endpoints, getData, postData } from "../../api";
import { loadPackages, removePackage, runCreatePackage, runDeletePackage, runLoadPackages } from "./slice";
import { setLoaded, setLoading } from "../../redux/slice";
import { runCreateRecipe } from "../recipes/slice";


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

export default function* packagesSaga() {
    yield takeLatest(runLoadPackages.type, getAllPackagesSaga)
    yield takeLatest(runCreatePackage.type, createPackageSaga)
    yield takeLatest(runDeletePackage.type, deletePackageSaga)
}