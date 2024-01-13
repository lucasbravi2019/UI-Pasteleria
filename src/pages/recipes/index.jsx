import { Empty, FloatButton } from 'antd/lib'
import CircleSpinner from '../../components/circle-spinner'
import TableGrid from '../../components/table'
import ModalForm from '../../components/ModalForm'
import Message from '../../components/message'
import { useRecipePage } from './hooks'
import FormInput from '../../components/form-input'
import FormList from '../../components/form-list'
import { options } from './utils/formInputs'
import { useSelector } from 'react-redux'
import { selectIngredientsSelector } from '../ingredients/selector'
import {
    selectRecipeEditingIngredientsOptions,
    selectRecipeEditingNameSelector,
} from './selectors'
import ModalCustom from '../../components/modal-custom'

const RecipePage = () => {
    const {
        loading,
        message,
        recipes,
        form,
        openForm,
        editing,
        onCreation,
        closeForm,
        createRecipe,
        updateRecipe,
        tableData,
        actualRow,
        hideModal,
        deleteRecipe,
        columns,
    } = useRecipePage()

    const ingredients = useSelector(selectIngredientsSelector)
    const recipeName = useSelector(selectRecipeEditingNameSelector)
    const recipeEditingOptions = useSelector(
        selectRecipeEditingIngredientsOptions
    )

    const inputs = () => {
        return (
            <>
                <FormInput
                    name="name"
                    label="Receta"
                    tooltip="Nombre de receta"
                    placeholder="Chocotorta"
                    required
                    initialValue={recipeName != null ? recipeName : ''}
                />
                <FormList
                    options={options(ingredients)}
                    initialValue={recipeEditingOptions}
                    names={['id', 'quantity']}
                    name="ingredients"
                    titles={['Ingrediente', 'Cantidad']}
                />
            </>
        )
    }

    return (
        <div>
            <Message message={message} />
            <h1>Recetas</h1>
            <CircleSpinner loading={loading}>
                <div className="table-recipes">
                    {recipes != null && recipes.length > 0 ? (
                        <TableGrid
                            columns={columns(recipes)}
                            data={tableData(recipes)}
                        />
                    ) : (
                        <Empty description={<p>No hay recetas</p>} />
                    )}
                </div>
            </CircleSpinner>
            <ModalForm
                form={form}
                inputs={inputs}
                okText={editing ? 'Editar Receta' : 'Crear Receta'}
                onCancel={closeForm}
                onOk={(body) =>
                    editing ? updateRecipe(body) : createRecipe(body)
                }
                open={openForm}
                title={'Crear receta'}
                key={1}
            />
            <FloatButton tooltip="Crear Receta" onClick={onCreation} />
            <ModalCustom
                onOk={() => deleteRecipe(actualRow.id)}
                onCancel={hideModal}
                withButtons={true}
            >
                <span>Borrar Receta?</span>
            </ModalCustom>
        </div>
    )
}

export default RecipePage
