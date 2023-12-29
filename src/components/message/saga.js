import { put, takeLatest } from "redux-saga/effects";
import { hideMessage, runShowMessage, showMessage } from "./slice";

export function* showMessageSaga(action) {
    console.log(action.payload);
    yield put(showMessage(action.payload))
    yield put(hideMessage())
}

export default function* messageSaga() {
    yield takeLatest(runShowMessage.type, showMessageSaga)
}