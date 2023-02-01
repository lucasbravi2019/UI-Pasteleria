import { all } from 'redux-saga/effects'

import homeSaga from '../containers/home/homeSaga'

export function* rootSaga(): Generator<any> {
    yield all([
        homeSaga()
    ])
}