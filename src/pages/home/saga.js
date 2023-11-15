import { call, put, takeLatest } from 'redux-saga/effects';
import { endpoints, getData } from "../../api";
import { loadRecipes, runGetRecipes } from "./slice";
import { setLoading, setLoaded } from '../../redux/slice'


export function* getRecipesSaga() {
    try {
        yield put(setLoading())
        const recipes = yield call(getData, endpoints.getAllRecipes)
        yield put(loadRecipes(recipes.body))

        yield put(setLoaded())
    } catch (error) {
        console.log(error);
        yield put(setLoaded())
    }
}

export default function* homeSaga() {
    yield takeLatest(runGetRecipes.type, getRecipesSaga)
}