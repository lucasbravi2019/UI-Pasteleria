import { put, takeLatest } from "redux-saga/effects";
import { runShowMessage, showMessage } from "./slice";

export function* showMessageSaga(action) {
    yield put(showMessage(action.payload))
}

export default function* messageSaga() {
    yield takeLatest(runShowMessage.type, showMessageSaga)
}