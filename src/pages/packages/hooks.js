import { Form } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPackageEditing, runCreatePackage, runDeletePackage, runLoadPackages, runUpdatePackage, setPackageEditing } from './slice'
import { closeModal, openModal } from '../recipes/slice'
import { selectPackageEditingMetricSelector, selectPackageEditingQuantitySelector } from './selectors'

export const usePackagePage = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [openForm, setOpenForm] = useState(false)
    const [editing, setEditing] = useState(false)
    const packageMetricEditing = useSelector(selectPackageEditingMetricSelector)
    const packageQuantityEditing = useSelector(selectPackageEditingQuantitySelector)

    const onCreation = () => {
        setEditing(false)
        dispatch(resetPackageEditing(null))
        setOpenForm(true)
    }

    const onEdition = (pkg) => {
        setEditing(true)
        dispatch(setPackageEditing(pkg))
        setOpenForm(true)
    }

    const onDelete = () => {
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

    const getTableData = (packages) => {
        return {
            packages: [...packages],
            onDelete,
            onEdition,
            deletePackage
        }
    }

    useEffect(() => {
        dispatch(runLoadPackages())
    }, [])

    useEffect(() => {
        if (form != null) {
            form.setFieldsValue({
                metric: packageMetricEditing != null ? packageMetricEditing : 'default',
                quantity: packageQuantityEditing != null ? packageQuantityEditing : 0
            })
        }
    }, [packageMetricEditing, packageQuantityEditing])

    return {
        createPackage,
        updatePackage,
        getTableData,
        onCreation,
        form,
        openForm,
        closeForm,
        showForm,
        editing,
    }
}