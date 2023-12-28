import { Empty, FloatButton } from 'antd/lib'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CircleSpinner from '../../components/circle-spinner'
import TableGrid from '../../components/table'
import { selectIsLoadingSelector } from '../../redux/selectors'
import { selectRecipesSelector } from './selectors'
import {
    openModal,
    runCreateRecipe,
    runDeleteRecipe,
    runLoadRecipes,
} from './slice'
import { columns, data } from './utils/columns'
import ModalForm from '../../components/ModalForm'
import { render } from './utils/formInputs'
import { Form } from 'antd'

const RecipePage = () => {
    const dispatch = useDispatch()
    const loading = useSelector(selectIsLoadingSelector)
    const recipes = useSelector(selectRecipesSelector)
    const [openForm, setOpenForm] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        dispatch(runLoadRecipes())
    }, [])

    const deleteRecipe = (recipeId) => {
        dispatch(runDeleteRecipe(recipeId))
    }

    const createRecipe = (body) => {
        dispatch(runCreateRecipe(body))
        setOpenForm(false)
    }

    const deleteModal = () => dispatch(openModal())

    const tableData = (recipes) => {
        return {
            data: recipes,
            onDelete: (recipeId) => deleteRecipe(recipeId),
            onOpenModal: () => deleteModal()
        }
    }

    return (
        <div>
            <h1>Recetas</h1>
            <CircleSpinner loading={loading}>
                <div className="table-recipes">
                    {recipes != null && recipes.length > 0 ? (
                        <TableGrid
                            columns={columns(recipes)}
                            data={data(tableData(recipes))}
                        />
                    ) : (
                        <Empty description={<p>No hay recetas</p>} />
                    )}
                </div>
            </CircleSpinner>
            <ModalForm
                form={form}
                render={render()}
                initialValues={{}}
                okText='Crear Receta'
                onCancel={() => setOpenForm(false)}
                onOk={(body) => createRecipe(body)}
                open={openForm}
                title={'Crear receta'}
                key={1}
            />
            <FloatButton tooltip="Crear Receta" onClick={() => setOpenForm(true)} />
        </div>
    )
}

export default RecipePage
