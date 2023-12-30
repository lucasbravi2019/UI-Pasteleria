import { Empty, FloatButton, Form, message } from 'antd'
import CircleSpinner from '../../components/circle-spinner'
import TableGrid from '../../components/table'
import ModalForm from '../../components/ModalForm'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoadingSelector } from '../../redux/selectors'
import { selectPackagesSelector } from './selectors'
import { useEffect, useState } from 'react'
import { closeModal, openModal, runCreateRecipe } from '../recipes/slice'
import {
    resetPackageIdEditing,
    runCreatePackage,
    runDeletePackage,
    runLoadPackages,
    runUpdatePackage,
    setPackageIdEditing,
} from './slice'
import { columns, getData } from './util/columns'
import { options } from './util/formInputs'
import FormNumber from '../../components/form-number'
import FormSearchSelect from '../../components/form-search-select'
import Message from '../../components/message'
import { selectMessageSelector } from '../../components/message/selectors'

const PackagePage = () => {
    const dispatch = useDispatch()
    const loading = useSelector(selectIsLoadingSelector)
    const packages = useSelector(selectPackagesSelector)
    const message = useSelector(selectMessageSelector)
    const [form] = Form.useForm()
    const [openForm, setOpenForm] = useState(false)
    const [editing, setEditing] = useState(false)

    const createPackage = (body) => {
        dispatch(runCreatePackage(body))
        form.resetFields()
        setOpenForm(false)
    }

    const updatePackage = (body) => {
        dispatch(runUpdatePackage(body))
        setEditing(false)
        dispatch(resetPackageIdEditing())
        form.resetFields()
        setOpenForm(false)
    }

    const deleteAction = (packageId) => {
        dispatch(runDeletePackage(packageId))
        dispatch(closeModal())
    }

    const changeInitialValues = (pkg) => {
        if (pkg == null) {
            form.resetFields()
            return
        }
        form.setFieldsValue({
            metric: pkg.metric,
            quantity: pkg.quantity,
        })
    }

    const getTableData = (packages) => {
        return {
            packages: [...packages],
            onDelete: (packageId) => deleteAction(packageId),
            onOpenModal: () => dispatch(openModal()),
            onEdition: (pkg) => {
                form.resetFields()
                changeInitialValues(pkg)
                setEditing(true)
                dispatch(setPackageIdEditing(pkg.id))
                setOpenForm(true)
            },
        }
    }

    useEffect(() => {
        dispatch(runLoadPackages())
    }, [])

    const inputs = () => {
        return (
            <>
                <FormSearchSelect
                    label="Medida"
                    name="metric"
                    placeholder="g"
                    required
                    tooltip="Dimensión usada"
                    options={options()}
                    onChange={(name, value) => form.setFieldValue(name, value)}
                    initialValue={() => form.getFieldValue('metric')}
                />
                <FormNumber
                    label="Cantidad"
                    name="quantity"
                    placeholder="150"
                    required
                    tooltip="Cantidad que tiene el envase"
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
                            data={getData(getTableData(packages))}
                        />
                    ) : (
                        <Empty description={<p>No hay envases</p>} />
                    )}
                </div>
            </CircleSpinner>
            <ModalForm
                form={form}
                render={() => inputs()}
                okText={editing ? 'Editar Envase' : 'Crear Envase'}
                onCancel={() => {
                    changeInitialValues(null)
                    setOpenForm(false)
                }}
                onOk={(body) =>
                    editing ? updatePackage(body) : createPackage(body)
                }
                open={openForm}
                title={editing ? 'Editar Envase' : 'Crear Envase'}
            />
            <FloatButton
                tooltip="Crear Envase"
                onClick={() => {
                    setEditing(false)
                    changeInitialValues(null)
                    setOpenForm(true)
                }}
            />
        </div>
    )
}

export default PackagePage
