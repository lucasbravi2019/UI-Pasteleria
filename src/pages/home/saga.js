import { call, put, takeLatest } from 'redux-saga/effects';
import { endpoints, getData } from "../../api";
import { loadRecipes, runGetRecipes } from "./slice";
import { setLoading, setLoaded } from '../../redux/slice'
import { showMessage } from '../../components/message/slice';
import { buildMessage } from '../../components/message';


export function* getRecipesSaga() {
    try {
        yield put(setLoading())
        const recipes = yield call(getData, endpoints.getAllRecipes)
        if (recipes.error === '') {
            yield put(loadRecipes(recipes.body))
            yield put(setLoaded())
        } else {
            yield put(showMessage(buildMessage('No se pudieron cargar las recetas', 'GET', true)))
        }
    } catch (error) {
        yield put(showMessage(buildMessage('No se pudieron cargar las recetas', 'GET', true)))
    } finally {
        yield put(setLoaded())
    }
}

export default function* homeSaga() {
    yield takeLatest(runGetRecipes.type, getRecipesSaga)
}