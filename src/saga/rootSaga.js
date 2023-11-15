import { all } from 'redux-saga/effects'
import homeSaga from '../pages/home/saga'
import recipeSaga from '../pages/recipes/saga'


export function* rootSaga() {
    yield all([
        homeSaga(),
        recipeSaga()
    ])
}