import { useEffect, useState } from "react"
import { openModal, resetRecipeEditing, runCreateRecipe, runDeleteRecipe, runLoadRecipes, runUpdateRecipe, setRecipeEditing } from "./slice"
import { useDispatch, useSelector } from 'react-redux'
import { Form } from "antd"
import { selectIsLoadingSelector } from "../../redux/selectors"
import { selectRecipeEditingIngredientsOptions, selectRecipeEditingNameSelector, selectRecipesSelector } from "./selectors"
import { selectMessageSelector } from "../../components/message/selectors"
import { runLoadIngredients } from "../ingredients/slice"

export const useRecipePage = () => {
    const [openForm, setOpenForm] = useState(false)
    const loading = useSelector(selectIsLoadingSelector)
    const recipes = useSelector(selectRecipesSelector)
    const [editing, setEditing] = useState(false)
    const [form] = Form.useForm()
    const message = useSelector(selectMessageSelector)
    const ingredientsOptions = useSelector(selectRecipeEditingIngredientsOptions)
    const recipeName = useSelector(selectRecipeEditingNameSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(runLoadRecipes())
        dispatch(runLoadIngredients())
    }, [])

    const onCreation = () => {
        setEditing(false)
        dispatch(resetRecipeEditing())
        setOpenForm(true)
    }

    const onEdition = (recipe) => {
        setEditing(true)    
        dispatch(setRecipeEditing(recipe))
        setOpenForm(true)
    }

    const deleteRecipe = (recipeId) => {
        dispatch(runDeleteRecipe(recipeId))
    }

    const closeForm = () => {
        setOpenForm(false)
    }

    const createRecipe = (body) => {
        dispatch(runCreateRecipe(body))
        setOpenForm(false)
    }

    const updateRecipe = (body) => {
        dispatch(runUpdateRecipe(body))
        setEditing(false)
        setOpenForm(false)
    }

    const onDelete = () => dispatch(openModal())

    const tableData = (recipes) => {
        return Object.values(recipes).map(recipe => {
            return {
                key: `${recipe.id}`,
                name: recipe.name,
                price: recipe.price,
                recipeId: recipe.id,
                onCreation: tableData.onCreation,
                onDelete,
                onEdition: () => onEdition(recipe),
                deleteRecipe: () => deleteRecipe(recipe.id)
            }
        })
    }

    useEffect(() => {
        if (editing && ingredientsOptions != null) {
            console.log(recipeName);
            console.log(ingredientsOptions);
            form.setFieldsValue({
                name: recipeName,
                ingredients: [...ingredientsOptions.ingredients]
            })
        } else {
            form.setFieldsValue({
                name: undefined,
                ingredients: undefined
            })
        }
    }, [editing, recipeName, ingredientsOptions])

    return {
        loading,
        recipes,
        message,
        editing,
        form,
        openForm,
        onCreation,
        closeForm,
        createRecipe,
        updateRecipe,
        tableData
    }
}