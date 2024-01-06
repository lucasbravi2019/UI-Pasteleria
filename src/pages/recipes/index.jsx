import { Empty, FloatButton } from 'antd/lib'
import CircleSpinner from '../../components/circle-spinner'
import TableGrid from '../../components/table'
import { columns, data } from './utils/columns'
import ModalForm from '../../components/ModalForm'
import { render } from './utils/formInputs'
import Message from '../../components/message'
import { useRecipePage } from './hooks'

const RecipePage = () => {

    const {
        loading,
        message,
        recipes,
        form,
        openForm,
        openCreationForm,
        closeForm,
        createRecipe,
        tableData
    } = useRecipePage()

    return (
        <div>
            <Message message={message} />
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
                render={render}
                initialValues={{}}
                okText="Crear Receta"
                onCancel={closeForm}
                onOk={(body) => createRecipe(body)}
                open={openForm}
                title={'Crear receta'}
                key={1}
            />
            <FloatButton
                tooltip="Crear Receta"
                onClick={openCreationForm}
            />
        </div>
    )
}

export default RecipePage
