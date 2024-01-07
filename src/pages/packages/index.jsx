import { Empty, FloatButton } from 'antd'
import CircleSpinner from '../../components/circle-spinner'
import TableGrid from '../../components/table'
import ModalForm from '../../components/ModalForm'
import { options } from './util/formInputs'
import FormNumber from '../../components/form-number'
import FormSearchSelect from '../../components/form-search-select'
import Message from '../../components/message'
import { usePackagePage } from './hooks'
import { selectMessageSelector } from '../../components/message/selectors'
import { useSelector } from 'react-redux'
import {
    selectPackageEditingMetricSelector,
    selectPackageEditingQuantitySelector,
    selectPackagesSelector,
} from './selectors'
import { selectIsLoadingSelector } from '../../redux/selectors'
import ModalCustom from '../../components/modal-custom'

const PackagePage = () => {
    const {
        createPackage,
        updatePackage,
        onCreation,
        closeForm,
        openForm,
        editing,
        form,
        columns,
        tableData,
        deletePackage,
        actualRow,
        onCancel,
    } = usePackagePage()

    const message = useSelector(selectMessageSelector)
    const packages = useSelector(selectPackagesSelector)
    const loading = useSelector(selectIsLoadingSelector)
    const packageMetricEditing = useSelector(selectPackageEditingMetricSelector)
    const packageQuantityEditing = useSelector(
        selectPackageEditingQuantitySelector
    )

    const inputs = () => {
        return (
            <>
                <FormSearchSelect
                    label="Medida"
                    name="metric"
                    placeholder="g"
                    options={options()}
                    initialValue={
                        packageMetricEditing != null
                            ? packageMetricEditing
                            : options()[0]
                    }
                />
                <FormNumber
                    label="Cantidad"
                    name="quantity"
                    placeholder="150"
                    required
                    tooltip="Cantidad que tiene el envase"
                    initialValue={
                        packageQuantityEditing != null
                            ? packageQuantityEditing
                            : 0
                    }
                />
            </>
        )
    }

    return (
        <div>
            <Message message={message} />
            <h1>Envases</h1>
            <CircleSpinner loading={loading}>
                <div className="table-recipes">
                    {packages != null && packages.length > 0 ? (
                        <TableGrid
                            columns={columns(packages)}
                            data={tableData(packages)}
                        />
                    ) : (
                        <Empty description={<p>No hay envases</p>} />
                    )}
                </div>
            </CircleSpinner>
            <ModalForm
                form={form}
                inputs={inputs}
                okText={editing ? 'Editar Envase' : 'Crear Envase'}
                onCancel={closeForm}
                onOk={(body) =>
                    editing ? updatePackage(body) : createPackage(body)
                }
                open={openForm}
                title={editing ? 'Editar Envase' : 'Crear Envase'}
            />
            <FloatButton tooltip="Crear Envase" onClick={onCreation} />
            <ModalCustom
                onOk={() => deletePackage(actualRow.id)}
                onCancel={onCancel}
                withButtons={true}
            >
                <span>Borrar envase?</span>
            </ModalCustom>
        </div>
    )
}

export default PackagePage
