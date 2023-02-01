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
} from '../../api/index'
import { Recipe } from '../../interfaces/recipes'
import {
  resetMessages,
  setErrorMessage,
  setSuccessMessage,
} from '../../reducers/messageSlice'
import {
  addRecipe,
  loadRecipes,
  removeRecipe,
  runAddRecipe,
  runDeleteRecipe,
  runLoadRecipes,
} from '../../reducers/recipeSlice'

export function* getRecipeSaga(): Generator<any> {
  try {
    yield put(resetMessages())
    const response = yield call(getData, endpoints.getAllRecipes)
    yield put(loadRecipes(response))
  } catch (error) {
    console.log(error);
  }
}

export function* createRecipeSaga(action: any): Generator<any> {
  try {
    yield put(resetMessages())
    const response: any = yield call(postData, endpoints.createRecipe, action.payload)
    if (response.hasOwnProperty('error')) {
      yield put(setErrorMessage('La receta no se pudo crear'))
    } else {
      const recipe: Recipe = {
        id: response,
        name: action.payload.name
      }
      yield put(addRecipe(recipe))
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

export default function* homeSaga() {
  yield takeLatest(runLoadRecipes.type, getRecipeSaga)
  yield takeLatest(runAddRecipe.type, createRecipeSaga)
  yield takeLatest(runDeleteRecipe.type, deleteRecipeSaga)
}