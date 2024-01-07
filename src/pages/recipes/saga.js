import { call, put, select, takeLatest } from 'redux-saga/effects'
import { deleteData, endpoints, getData, postData, putData } from '../../api'
import { setLoaded, setLoading } from '../../redux/slice'
import {
    closeModal,
    loadRecipes,
    removeRecipe,
    runCreateRecipe,
    runDeleteRecipe,
    runLoadRecipes,
    runUpdateRecipe,
} from './slice'
import { buildMessage } from '../../components/message'
import { showMessage } from '../../components/message/slice'
import { selectRecipeEditingIdSelector } from './selectors'

export function* getAllRecipesSaga() {
    try {
        yield put(setLoading())
        const response = yield call(getData, endpoints.getAllRecipes)
        if (response.error === '') {
            yield put(loadRecipes(response.body))
        } else {
            yield put(
                showMessage(
                    buildMessage(
                        'No se pudieron recuperar las recetas',
                        'GET',
                        true
                    )
                )
            )
        }
    } catch (error) {
        yield put(
            showMessage(
                buildMessage(
                    'No se pudieron recuperar las recetas',
                    'GET',
                    true
                )
            )
        )
    } finally {
        yield put(setLoaded())
    }
}

export function* deleteRecipeSaga(action) {
    try {
        yield put(setLoading())
        const response = yield call(
            deleteData,
            endpoints.deleteRecipe(action.payload)
        )
        if (response.error === '') {
            yield put(removeRecipe(action.payload))
            yield put(
                showMessage(
                    buildMessage(
                        'Se borró la receta correctamente',
                        'DELETE',
                        false
                    )
                )
            )
        } else {
            yield put(
                showMessage(
                    buildMessage('No se pudo borrar la receta', 'DELETE', true)
                )
            )
        }
    } catch (error) {
        yield put(
            showMessage(
                buildMessage('No se pudo borrar la receta', 'DELETE', true)
            )
        )
    } finally {
        yield put(closeModal())
        yield put(setLoaded())
    }
}

export function* createRecipeSaga(action) {
    try {
        yield put(setLoading())
        const response = yield call(
            postData,
            endpoints.createRecipe,
            action.payload
        )
        if (response.error === '') {
            yield put(runLoadRecipes())
            yield put(
                showMessage(
                    buildMessage(
                        'La receta se creó correctamente',
                        'POST',
                        false
                    )
                )
            )
        } else {
            yield put(
                showMessage(
                    buildMessage('No se pudo crear la receta', 'POST', true)
                )
            )
        }
    } catch (error) {
        yield put(
            showMessage(
                buildMessage('No se pudo crear la receta', 'POST', true)
            )
        )
    } finally {
        yield put(setLoaded())
    }
}

export function* updateRecipeSaga(action) {
    try {
        yield put(setLoading())
        const recipeId = yield select(selectRecipeEditingIdSelector)
        const body = {
            id: recipeId,
            name: action.payload.name,
            ingredients: action.payload.ingredients,
        }
        const response = yield call(putData, endpoints.updateRecipe, body)
        if (response.error === '') {
            yield put(runLoadRecipes())
            yield put(
                showMessage(
                    buildMessage(
                        'La receta fue editada correctamente',
                        'PUT',
                        false
                    )
                )
            )
        } else {
            yield put(
                showMessage(
                    buildMessage('No se pudo editar la receta', 'PUT', true)
                )
            )
        }
    } catch (error) {
        yield put(
            showMessage(
                buildMessage('No se pudo editar la receta', 'PUT', true)
            )
        )
    } finally {
        yield put(setLoaded())
    }
}

export default function* recipeSaga() {
    yield takeLatest(runLoadRecipes.type, getAllRecipesSaga)
    yield takeLatest(runDeleteRecipe.type, deleteRecipeSaga)
    yield takeLatest(runCreateRecipe.type, createRecipeSaga)
    yield takeLatest(runUpdateRecipe.type, updateRecipeSaga)
}
