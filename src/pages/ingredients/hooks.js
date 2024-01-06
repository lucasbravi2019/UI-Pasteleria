import { useEffect, useState } from "react"
import { closeModal, openModal } from "../recipes/slice"
import { useDispatch, useSelector } from 'react-redux'
import { Form } from "antd"
import { resetIngredientEditing, resetIngredientId, runCreateIngredient, runDeleteIngredient, runLoadIngredients, runUpdateIngredient, setIngredientEditing } from "./slice"
import { runLoadPackages } from "../packages/slice"
import { selectIngredientEditingNameSelector, selectIngredientPackagesOptions } from "./selector"

export const useIngredientPage = () => {
    const [openForm, setOpenForm] = useState(false)
    const [form] = Form.useForm()
    const [editing, setEditing] = useState(false)
    const dispatch = useDispatch()
    const ingredientName = useSelector(selectIngredientEditingNameSelector)
    const packagesOptions = useSelector(selectIngredientPackagesOptions)

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
        console.log(ingredientId);
        dispatch(runDeleteIngredient(ingredientId))
        dispatch(closeModal())
    }

    const onCreation = () => {
        setEditing(false)
        dispatch(resetIngredientEditing())
        setOpenForm(true)
    }

    const onEdition = (ingredient) => {
        setEditing(true)
        dispatch(setIngredientEditing(ingredient))
        setOpenForm(true)
    }

    const onDelete = () => {
        dispatch(openModal())
    }

    const getTableData = (ingredients) => {
        return Object.values(ingredients).map(ingredient => {
            return {
                key: ingredient.id,
                name: ingredient.name,
                packages: ingredient.packages,
                deleteIngredient: () => deleteIngredient(ingredient.id),
                onDelete,
                onCreation,
                onEdition: () => onEdition(ingredient)
            }
        })
    }

    const closeForm = () => {
        setEditing(false)
        dispatch(resetIngredientEditing())
        setOpenForm(false)
    }

    useEffect(() => {
        if (editing && packagesOptions != null) {
            form.setFieldsValue({
                name: ingredientName,
                packages: [...packagesOptions.packages]
            })
        } else {
            form.setFieldsValue({
                name: undefined,
                packages: undefined
            })
        }
    }, [editing, ingredientName, packagesOptions])

    return {
        createIngredient,
        updateIngredient,
        closeForm,
        form,
        getTableData,
        editing,
        openForm,
        onCreation
    }
}