import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    resetIngredientId,
    runCreateIngredient,
    runDeleteIngredient,
    runLoadIngredients,
    runUpdateIngredient,
    setIngredientId,
} from './slice'
import { selectIngredientsSelector } from './selector'
import { selectMessageSelector } from '../../components/message/selectors'
import Message from '../../components/message'
import CircleSpinner from '../../components/circle-spinner'
import { selectIsLoadingSelector } from '../../redux/selectors'
import TableGrid from '../../components/table'
import { Empty, FloatButton, Form } from 'antd'
import ModalForm from '../../components/ModalForm'
import { columns, getData } from './util/columns'
import { closeModal, openModal } from '../recipes/slice'
import { render } from './util/formInputs'
import { selectPackagesSelector } from '../packages/selectors'
import { runLoadPackages } from '../packages/slice'

const IngredientPage = () => {
    const dispatch = useDispatch()
    const ingredients = useSelector(selectIngredientsSelector)
    const packages = useSelector(selectPackagesSelector)
    const message = useSelector(selectMessageSelector)
    const loading = useSelector(selectIsLoadingSelector)
    const [openForm, setOpenForm] = useState(false)
    const [form] = Form.useForm()
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        dispatch(runLoadIngredients())
        dispatch(runLoadPackages())
    }, [])

    const deleteAction = (ingredientId) => {
        dispatch(runDeleteIngredient(ingredientId))
        dispatch(closeModal())
    }

    const createIngredient = (body) => {
        dispatch(runCreateIngredient(body))
        setOpenForm(false)
    }

    const updateIngredient = (body) => {
        dispatch(runUpdateIngredient(body))
        setEditing(false)
        dispatch(resetIngredientId())
        form.resetFields()
        setOpenForm(false)
    }

    const getTableData = (ingredients) => {
        return {
            data: [...ingredients],
            onDelete: (ingredientId) => deleteAction(ingredientId),
            onOpenModal: () => dispatch(openModal()),
            onEdition: (ingredient) => {
                form.resetFields()
                changeInitialValues(ingredient)
                setEditing(true)
                dispatch(setIngredientId(ingredient.id))
                setOpenForm(true)
            },
        }
    }

    const changeInitialValues = (ingredient) => {
        if (ingredient == null) {
            form.resetFields()
            return
        }
        form.setFieldsValue({
            name: ingredient.name,
        })
    }

    return (
        <div>
            <Message message={message} />
            <h1>Ingredientes</h1>
            <CircleSpinner loading={loading}>
                <div className="table-recipes">
                    {ingredients != null && ingredients.length > 0 ? (
                        <TableGrid
                            columns={columns(ingredients)}
                            data={getData(getTableData(ingredients))}
                        />
                    ) : (
                        <Empty description={<p>No hay ingredientes</p>} />
                    )}
                </div>
            </CircleSpinner>
            <ModalForm
                form={form}
                render={() => render(packages, form)}
                initialValues={{}}
                okText={editing ? 'Editar Ingrediente' : 'Crear Ingrediente'}
                onCancel={() => setOpenForm(false)}
                onOk={(body) =>
                    editing ? updateIngredient(body) : createIngredient(body)
                }
                open={openForm}
                title={'Crear Ingrediente'}
                key={1}
            />
            <FloatButton
                tooltip="Crear Ingrediente"
                onClick={() => setOpenForm(true)}
            />
        </div>
    )
}

export default IngredientPage
