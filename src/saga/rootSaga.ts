import { all } from 'redux-saga/effects'

import recipeSaga from './recipeSaga'

export function* rootSaga(): Generator<any> {
    yield all([
        recipeSaga()
    ])
}