import { Empty, FloatButton, Form } from "antd"
import CircleSpinner from "../../components/circle-spinner"
import TableGrid from "../../components/table"
import ModalForm from "../../components/ModalForm"
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoadingSelector } from "../../redux/selectors"
import { selectPackagesSelector } from "./selectors"
import { useEffect, useState } from "react"
import { render } from "./util/formInputs"
import { closeModal, openModal, runCreateRecipe } from "../recipes/slice"
import { runCreatePackage, runDeletePackage, runLoadPackages } from "./slice"
import { columns, getData } from "./util/columns"


const PackagePage = () => {
    const dispatch = useDispatch()
    const loading = useSelector(selectIsLoadingSelector)
    const packages = useSelector(selectPackagesSelector)
    const [openForm, setOpenForm] = useState(false)
    const [form] = Form.useForm()

    const createPackage = (body) => {
        dispatch(runCreatePackage(body))
        setOpenForm(false)
    }

    const setFormFieldValue = (name, value) => {
        form.setFieldValue(name, value)
    }

    const deleteAction = (packageId) => {
        dispatch(runDeletePackage(packageId))
        dispatch(closeModal())
    }

    const getTableData = (packages) => {
        return {
            packages: [...packages],
            onDelete: (packageId) => deleteAction(packageId),
            onOpenModal: () => deleteModal()
        }
    }

    const deleteModal = () => {
        dispatch(openModal())
    }

    useEffect(() => {
        dispatch(runLoadPackages())
    }, [])

    return (
        <div>
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
                render={render(setFormFieldValue)}
                initialValues={{}}
                okText='Crear Envase'
                onCancel={() => setOpenForm(false)}
                onOk={(body) => createPackage(body)}
                open={openForm}
                title={'Crear Envase'}
                key={1}
            />
            <FloatButton tooltip="Crear Envase" onClick={() => setOpenForm(true)} />
        </div>
    )
}

export default PackagePage
