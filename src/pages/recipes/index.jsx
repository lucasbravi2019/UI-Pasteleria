import { Empty, FloatButton } from 'antd/lib'
import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CircleSpinner from '../../components/circle-spinner'
import ModalCustom from '../../components/modal-custom'
import TableGrid from '../../components/table'
import { selectIsLoadingSelector } from '../../redux/selectors'
import { selectRecipesSelector } from './selectors'
import {
    openModal,
    runDeleteRecipe,
    runLoadRecipes,
    setRecipeId,
} from './slice'
import { columns, data } from './utils/columns'

const RecipePage = () => {
    const dispatch = useDispatch()
    const loading = useSelector(selectIsLoadingSelector)
    const recipes = useSelector(selectRecipesSelector)

    useEffect(() => {
        dispatch(runLoadRecipes())
    }, [])

    const onClick = (recipeId) => {
        dispatch(openModal())
        dispatch(setRecipeId(recipeId))
    }

    const deleteRecipe = () => {
        dispatch(runDeleteRecipe())
    }

    return (
        <div>
            <h1>Recetas</h1>
            <CircleSpinner loading={loading}>
                <div className="table-recipes">
                    {!isEmpty(recipes) ? (
                        <TableGrid
                            columns={columns(recipes)}
                            data={data(recipes, onClick)}
                        />
                    ) : (
                        <Empty description={<p>No hay recetas</p>} />
                    )}
                </div>
            </CircleSpinner>
            <ModalCustom text="Borrar Receta?" onOk={deleteRecipe} />
            <FloatButton tooltip="Crear Receta" />
        </div>
    )
}

export default RecipePage
