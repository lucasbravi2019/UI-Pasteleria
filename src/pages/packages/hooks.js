import { Button, Form, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    resetPackageEditing,
    runCreatePackage,
    runDeletePackage,
    runLoadPackages,
    runUpdatePackage,
    setPackageEditing,
} from './slice'
import { closeModal, openModal } from '../recipes/slice'
import {
    selectPackageEditingMetricSelector,
    selectPackageEditingQuantitySelector,
} from './selectors'
import { getFilters } from './util/columns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

export const usePackagePage = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [openForm, setOpenForm] = useState(false)
    const [editing, setEditing] = useState(false)
    const packageMetricEditing = useSelector(selectPackageEditingMetricSelector)
    const [actualRow, setActualRow] = useState(null)
    const packageQuantityEditing = useSelector(
        selectPackageEditingQuantitySelector
    )

    const onCreation = () => {
        setEditing(false)
        dispatch(resetPackageEditing(null))
        setOpenForm(true)
    }

    const onEdition = (pkg) => {
        setActualRow(pkg)
        setEditing(true)
        dispatch(setPackageEditing(pkg))
        setOpenForm(true)
    }

    const onDelete = (pkg) => {
        setActualRow(pkg)
        dispatch(openModal())
    }

    const createPackage = (body) => {
        dispatch(runCreatePackage(body))
        form.resetFields()
        setOpenForm(false)
    }

    const updatePackage = (body) => {
        dispatch(runUpdatePackage(body))
        setEditing(false)
        dispatch(resetPackageEditing())
        setOpenForm(false)
    }

    const deletePackage = (packageId) => {
        dispatch(runDeletePackage(packageId))
        dispatch(closeModal())
    }

    const showForm = () => {
        setOpenForm(true)
    }

    const closeForm = () => {
        setOpenForm(false)
    }

    const tableData = (packages) => {
        return packages.map((pkg) => {
            return {
                ...pkg,
                key: pkg.id,
            }
        })
    }

    const onCancel = () => {
        dispatch(closeModal())
    }

    useEffect(() => {
        dispatch(runLoadPackages())
    }, [])

    useEffect(() => {
        if (form != null) {
            form.setFieldsValue({
                metric:
                    packageMetricEditing != null
                        ? packageMetricEditing
                        : 'default',
                quantity:
                    packageQuantityEditing != null ? packageQuantityEditing : 0,
            })
        }
    }, [packageMetricEditing, packageQuantityEditing])

    const columns = (packages) => {
        return [
            {
                title: 'Unidad de medida',
                dataIndex: 'metric',
                key: 'metric',
                width: 300,
                filters: getFilters(packages),
                sorter: (a, b) => {
                    return a.metric.localeCompare(b.metric) || a.quantity - b.quantity
                },
                onFilter: (value, record) => record.metric === value,
                defaultSortOrder: 'ascend',
                render: (_, record) => (
                    <span>
                        {record.quantity} {record.metric}
                    </span>
                ),
            },
            {
                title: 'Acciones',
                dataIndex: 'actions',
                key: 'actions',
                width: 105,
                render: (_, record) => {
                    return (
                        <div className="grid-3-lg">
                            <Tooltip title="Editar Envase">
                                <Button
                                    type="primary"
                                    onClick={() => onEdition(record)}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Borrar Envase">
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => onDelete(record)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </Tooltip>
                        </div>
                    )
                },
            },
        ]
    }

    return {
        createPackage,
        updatePackage,
        onCreation,
        form,
        openForm,
        closeForm,
        showForm,
        editing,
        columns,
        tableData,
        deletePackage,
        actualRow,
        onCancel,
    }
}
