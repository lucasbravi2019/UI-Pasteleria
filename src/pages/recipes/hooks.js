import { useEffect, useState } from "react"
import { openModal, runCreateRecipe, runDeleteRecipe, runLoadRecipes } from "./slice"
import { useDispatch, useSelector } from 'react-redux'
import { Form } from "antd"
import { selectIsLoadingSelector } from "../../redux/selectors"
import { selectRecipesSelector } from "./selectors"
import { selectMessageSelector } from "../../components/message/selectors"

export const useRecipePage = () => {
    const [openForm, setOpenForm] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(runLoadRecipes())
    }, [])

    const deleteRecipe = (recipeId) => {
        dispatch(runDeleteRecipe(recipeId))
    }

    const openCreationForm = () => {
        setOpenForm(true)
    }

    const closeForm = () => {
        setOpenForm(false)
    }

    const createRecipe = (body) => {
        dispatch(runCreateRecipe(body))
        setOpenForm(false)
    }

    const deleteModal = () => dispatch(openModal())

    const tableData = (recipes) => {
        return {
            data: recipes,
            onDelete: (recipeId) => deleteRecipe(recipeId),
            onOpenModal: () => deleteModal(),
        }
    }

    const loading = useSelector(selectIsLoadingSelector)
    const recipes = useSelector(selectRecipesSelector)

    const [form] = Form.useForm()
    const message = useSelector(selectMessageSelector)

    return {
        loading,
        recipes,
        message,
        form,
        openForm,
        openCreationForm,
        closeForm,
        createRecipe,
        tableData
    }
}