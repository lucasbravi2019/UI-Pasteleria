import { call, put, takeLatest } from "redux-saga/effects";
import { loadRecipe, runLoadRecipe } from "./slice";
import { endpoints, getData } from "../../api";

export function* getRecipeSaga(action) {
    try {
        const response = yield call(getData, endpoints.getRecipeById(action.payload))
        console.log(response);
        if (response.error == null) {
            yield put(loadRecipe(response.body))
        }
    } catch (error) {
        console.log(error);
    }
}


export default function* showRecipeSaga() {
    yield takeLatest(runLoadRecipe.type, getRecipeSaga)
}