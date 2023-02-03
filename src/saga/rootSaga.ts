import { all } from 'redux-saga/effects'

import ingredientSaga from './ingredientSaga'
import packageSaga from './packageSaga'
import recipeIngredientSaga from './recipeIngredientSaga'
import recipeSaga from './recipeSaga'

export function* rootSaga(): Generator<any> {
    yield all([
        recipeSaga(),
        ingredientSaga(),
        recipeIngredientSaga(),
        packageSaga()
    ])
}