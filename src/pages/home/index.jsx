import { Empty } from 'antd'
import { isEmpty } from 'lodash'
import TableGrid from '../../components/table'
import './index.scss'
import { columns } from './utils/columns'

import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'
import CircleSpinner from '../../components/circle-spinner'
import { selectIsLoadingSelector } from '../../redux/selectors'
import {
    selectRecipeBasicSelector,
    selectRecipesNamesSelector,
} from './selectors'
import { runGetRecipes } from './slice'

const HomePage = () => {
    const recipesSelector = useSelector(selectRecipeBasicSelector)
    const recipesNamesSelector = useSelector(selectRecipesNamesSelector)
    const loadingSelector = useSelector(selectIsLoadingSelector)
    const dispatch = useDispatch()

    const table = !isEmpty(recipesSelector) ? (
        <TableGrid
            columns={columns(recipesNamesSelector)}
            data={recipesSelector}
        />
    ) : (
        <Empty description={<p>No hay recetas</p>} />
    )

    useEffect(() => {
        dispatch(runGetRecipes())
    }, [])

    return (
        <div>
            <h1>Recetas</h1>
            <CircleSpinner loading={loadingSelector}>
                <div className="table-recipes">{table}</div>
            </CircleSpinner>
        </div>
    )
}

export default HomePage
