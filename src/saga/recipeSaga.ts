import { call } from 'redux-saga/effects'

import {
  put,
  takeLatest,
} from '@redux-saga/core/effects'

import {
  deleteData,
  endpoints,
  getData,
  postData,
  putData,
} from '../api/index'
import {
  resetMessages,
  setErrorMessage,
  setSuccessMessage,
} from '../redux/reducers/messageSlice'
import {
  addRecipe,
  loadRecipe,
  loadRecipes,
  removeRecipe,
  runAddRecipe,
  runDeleteRecipe,
  runLoadRecipe,
  runLoadRecipes,
  runUpdateRecipe,
} from '../redux/reducers/recipeSlice'

export function* getRecipeSaga(): Generator<any> {
  try {
    yield put(resetMessages())
    const response: any = yield call(getData, endpoints.getAllRecipes)
    yield put(loadRecipes(response.body))
  } catch (error) {
    console.log(error);
  }
}

export function* getRecipeByIdSaga(action: any): Generator<any> {
  try {
    const body = { id: action.payload }
    const response: any = yield call(getData, endpoints.getRecipeByOid, body)

    if (response.error) {
      console.log(response.error);
      return
    }

    yield put(loadRecipe(response.body))
  } catch (error) {
    console.log(error);
  }
}

export function* createRecipeSaga(action: any): Generator<any> {
  try {
    yield put(resetMessages())
    const response: any = yield call(postData, endpoints.createRecipe, action.payload)
    if (response.error) {
      yield put(setErrorMessage('La receta no se pudo crear'))
    } else {
      yield put(addRecipe(response.body))
      yield put(setSuccessMessage('La receta fue creada con éxito'))
    }
  } catch (error) {
    yield put(setErrorMessage('La receta no se pudo crear'))
  }
}

export function* deleteRecipeSaga(action: any): Generator<any> {
  try {
    yield put(resetMessages())
    const response: any = yield call(deleteData, endpoints.deleteRecipe(action.payload))
    if (response.error) {
      yield put(setErrorMessage('La receta no se pudo borrar'))
    } else {
      yield put(removeRecipe(action.payload))
      yield put(setSuccessMessage('La receta fue borrada con éxito'))
    }
  } catch (error) {
    yield put(setErrorMessage('La receta no se pudo borrar'))
  }
}

export function* updateRecipeSaga(action: any): Generator<any> {
  try {
    yield put(resetMessages())
    const response: any = yield call(putData, endpoints.updateRecipe(action.payload.id), action.payload)
    if (response.error) {
      yield put(setErrorMessage('La receta no se pudo editar'))
    } else {
      yield put(removeRecipe(action.payload.id))
      yield put(addRecipe(response.body))
      yield put(setSuccessMessage('La receta se pudo editar correctamente'))
    }
  } catch (error) {
    yield put(setErrorMessage('La receta no se pudo editar'))
  }
}

export default function* recipeSaga() {
  yield takeLatest(runLoadRecipes.type, getRecipeSaga)
  yield takeLatest(runLoadRecipe.type, getRecipeByIdSaga)
  yield takeLatest(runAddRecipe.type, createRecipeSaga)
  yield takeLatest(runDeleteRecipe.type, deleteRecipeSaga)
  yield takeLatest(runUpdateRecipe.type, updateRecipeSaga)
}