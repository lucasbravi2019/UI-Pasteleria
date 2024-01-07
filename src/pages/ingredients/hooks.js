import { useEffect, useState } from 'react'
import { closeModal, openModal } from '../recipes/slice'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Tooltip } from 'antd'
import {
    resetIngredientEditing,
    runCreateIngredient,
    runDeleteIngredient,
    runLoadIngredients,
    runUpdateIngredient,
    setIngredientEditing,
} from './slice'
import { runLoadPackages } from '../packages/slice'
import {
    selectIngredientEditingNameSelector,
    selectIngredientPackagesOptions,
} from './selector'
import { getFilters } from './util/columns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEye,
    faPenToSquare,
    faTrash,
} from '@fortawesome/free-solid-svg-icons'

export const useIngredientPage = () => {
    const [openForm, setOpenForm] = useState(false)
    const [form] = Form.useForm()
    const [editing, setEditing] = useState(false)
    const dispatch = useDispatch()
    const ingredientName = useSelector(selectIngredientEditingNameSelector)
    const packagesOptions = useSelector(selectIngredientPackagesOptions)
    const [deleting, setDeleting] = useState(false)
    const [actualRow, setActualRow] = useState(null)

    useEffect(() => {
        dispatch(runLoadIngredients())
        dispatch(runLoadPackages())
    }, [])

    const createIngredient = (body) => {
        dispatch(runCreateIngredient(body))
        setOpenForm(false)
    }

    const updateIngredient = (body) => {
        dispatch(runUpdateIngredient(body))
        setEditing(false)
        dispatch(resetIngredientEditing())
        form.resetFields()
        setOpenForm(false)
    }

    const deleteIngredient = (ingredientId) => {
        dispatch(runDeleteIngredient(ingredientId))
        dispatch(closeModal())
    }

    const onCreation = () => {
        setEditing(false)
        dispatch(resetIngredientEditing())
        setOpenForm(true)
    }

    const onEdition = (ingredient) => {
        console.log(ingredient)
        setEditing(true)
        dispatch(setIngredientEditing(ingredient))
        setOpenForm(true)
    }

    const onDelete = (record) => {
        setActualRow(record)
        setDeleting(true)
        dispatch(openModal())
    }

    const onOk = (ingredientId) => {
        if (deleting) {
            return deleteIngredient(ingredientId)
        }

        return hideModal()
    }

    const getTableData = (ingredients) => {
        return ingredients.map((ingredient) => {
            return {
                key: ingredient.id,
                id: ingredient.id,
                name: ingredient.name,
                packages: ingredient.packages,
            }
        })
    }

    const columns = (ingredients) => {
        return [
            {
                title: 'Nombre',
                dataIndex: 'name',
                key: 'name',
                width: 200,
                filters: getFilters(ingredients),
                sorter: (a, b) => a.name.localeCompare(b.name),
                onFilter: (value, record) => record.name === value,
            },
            {
                title: 'Acciones',
                dataIndex: 'actions',
                key: 'actions',
                width: 200,
                render: (_, record) => {
                    return (
                        <div className="grid-3-lg">
                            <Tooltip title="Ver Ingrediente">
                                <Button
                                    className="link__icon"
                                    onClick={() => showModal(record)}
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Editar Ingrediente">
                                <Button
                                    type="primary"
                                    onClick={() => onEdition(record)}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Borrar Ingrediente">
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

    const closeForm = () => {
        setEditing(false)
        dispatch(resetIngredientEditing())
        setOpenForm(false)
    }

    const showModal = (record) => {
        setActualRow(record)
        setDeleting(false)
        dispatch(openModal())
    }

    const hideModal = () => {
        dispatch(closeModal())
    }

    useEffect(() => {
        console.log(form.getFieldsValue())
        if (editing && packagesOptions != null) {
            form.setFieldsValue({
                name: ingredientName,
                packages: [...packagesOptions.packages],
            })
        } else {
            form.setFieldsValue({
                name: undefined,
                packages: undefined,
            })
        }
        console.log(form.getFieldsValue())
    }, [editing, ingredientName, packagesOptions])

    return {
        createIngredient,
        updateIngredient,
        closeForm,
        form,
        getTableData,
        editing,
        openForm,
        onCreation,
        columns,
        actualRow,
        onOk,
        hideModal,
        deleting,
    }
}
