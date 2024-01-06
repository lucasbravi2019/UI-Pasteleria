import { useSelector } from 'react-redux'
import { selectIngredientEditingNameSelector, selectIngredientEditingPackagesSelector, selectIngredientPackagesOptions, selectIngredientsSelector } from './selector'
import { selectMessageSelector } from '../../components/message/selectors'
import Message from '../../components/message'
import CircleSpinner from '../../components/circle-spinner'
import { selectIsLoadingSelector } from '../../redux/selectors'
import TableGrid from '../../components/table'
import { Empty, FloatButton, Form } from 'antd'
import ModalForm from '../../components/ModalForm'
import { columns, getData } from './util/columns'
import { selectPackagesSelector } from '../packages/selectors'
import { useIngredientPage } from './hooks'
import FormInput from '../../components/form-input'
import FormList from '../../components/form-list'
import { options } from './util/formInputs'
import { useEffect } from 'react'

const IngredientPage = () => {
    const ingredients = useSelector(selectIngredientsSelector)
    const packages = useSelector(selectPackagesSelector)
    const message = useSelector(selectMessageSelector)
    const loading = useSelector(selectIsLoadingSelector)
    const ingredientName = useSelector(selectIngredientEditingNameSelector)
    const packagesOptions = useSelector(selectIngredientPackagesOptions)

    useEffect(() => {
        console.log(ingredients);
    }, [ingredients])

    const {
        createIngredient,
        updateIngredient,
        closeForm,
        form,
        getTableData,
        editing,
        openForm,
        onCreation
    } = useIngredientPage()

    const inputs = () => {
        return (
            <>
                <FormInput
                    label="Ingrediente"
                    name="name"
                    placeholder="Dulce de leche"
                    required
                    tooltip="Nombre del ingrediente"
                    initialValue={ingredientName != null ? ingredientName : ''}
                />
                <FormList
                    options={options(packages)}
                    initialValue={packagesOptions}
                />
            </>
        )
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
                            data={getTableData(ingredients)}
                        />
                    ) : (
                        <Empty description={<p>No hay ingredientes</p>} />
                    )}
                </div>
            </CircleSpinner>
            <ModalForm
                form={form}
                inputs={inputs}
                okText={editing ? 'Editar Ingrediente' : 'Crear Ingrediente'}
                onCancel={closeForm}
                onOk={(body) =>
                    editing ? updateIngredient(body) : createIngredient(body)
                }
                open={openForm}
                title={editing ? 'Editar Ingrediente' : 'Crear Ingrediente'}
                key={1}
            />
            <FloatButton
                tooltip="Crear Ingrediente"
                onClick={onCreation}
            />
        </div>
    )
}

export default IngredientPage
