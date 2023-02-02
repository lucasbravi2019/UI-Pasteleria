import {
  call,
  takeLatest,
} from 'redux-saga/effects'

import {
  endpoints,
  putData,
} from '../api/index'
import { IngredientDetails } from '../interfaces/recipe'
import {
  runAddIngredientToRecipe,
} from '../redux/reducers/recipeIngredientSlice'

export function* addIngredientToRecipe(action: any): Generator<any> {
    try {
        const recipeId = action.payload.recipeId
        const ingredientId = action.payload.ingredientId

        const body: IngredientDetails = {
            metric: action.payload.metric,
            quantity: action.payload.quantity
        }

        const response: any = yield call(putData, endpoints.addIngredientToRecipe(recipeId, ingredientId), body)
        console.log(response);
    } catch (error) {
        console.log(error);
    }

}




export default function* recipeIngredientSaga() {
    yield takeLatest(runAddIngredientToRecipe.type, addIngredientToRecipe)
}