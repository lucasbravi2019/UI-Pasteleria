import { all } from 'redux-saga/effects'
import homeSaga from '../pages/home/saga'
import recipeSaga from '../pages/recipes/saga'
import showRecipeSaga from '../pages/recipe/saga'
import packagesSaga from '../pages/packages/saga'
import messageSaga from '../components/message/saga'
import ingredientsSaga from '../pages/ingredients/saga'


export function* rootSaga() {
    yield all([
        homeSaga(),
        recipeSaga(),
        showRecipeSaga(),
        packagesSaga(),
        messageSaga(),
        ingredientsSaga()
    ])
}