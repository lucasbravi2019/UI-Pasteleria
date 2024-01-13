import { useEffect, useState } from 'react'
import {
    closeModal,
    openModal,
    resetRecipeEditing,
    runCreateRecipe,
    runDeleteRecipe,
    runLoadRecipes,
    runUpdateRecipe,
    setRecipeEditing,
} from './slice'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Tooltip } from 'antd'
import { selectIsLoadingSelector } from '../../redux/selectors'
import {
    selectRecipeEditingIngredientsOptions,
    selectRecipeEditingNameSelector,
    selectRecipesSelector,
} from './selectors'
import { selectMessageSelector } from '../../components/message/selectors'
import { runLoadIngredients } from '../ingredients/slice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faDollarSign,
    faEye,
    faPenToSquare,
    faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { getFilters } from './utils/columns'
import { Link } from 'react-router-dom'

export const useRecipePage = () => {
    const [openForm, setOpenForm] = useState(false)
    const loading = useSelector(selectIsLoadingSelector)
    const recipes = useSelector(selectRecipesSelector)
    const [editing, setEditing] = useState(false)
    const [form] = Form.useForm()
    const message = useSelector(selectMessageSelector)
    const [actualRow, setActualRow] = useState(null)
    const ingredientsOptions = useSelector(
        selectRecipeEditingIngredientsOptions
    )
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
        setActualRow(recipe)
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

    const onDelete = (record) => {
        setActualRow(record)
        dispatch(openModal())
    }

    const tableData = (recipes) => {
        return Object.values(recipes).map((recipe) => {
            return {
                key: `${recipe.id}`,
                name: recipe.name,
                price: recipe.price,
                ingredients: recipe.ingredients,
                id: recipe.id,
            }
        })
    }

    const columns = (recipes) => [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            filters: getFilters(recipes),
            sorter: (a, b) => a.name.localeCompare(b.name),
            onFilter: (value, record) => record.name === value,
            defaultSortOrder: 'ascend',
            width: 250,
        },
        {
            title: 'Costo',
            dataIndex: 'price',
            key: 'price',
            width: 150,
            sorter: (a, b) => a.price - b.price,
            render: (price) => (
                <span>
                    <FontAwesomeIcon icon={faDollarSign} /> {price.toFixed(2)}
                </span>
            ),
        },
        {
            title: 'Precio de Venta',
            dataIndex: 'price',
            key: 'price',
            width: 150,
            render: (price) => (
                <span>
                    <FontAwesomeIcon icon={faDollarSign} />{' '}
                    {(price * 3).toFixed(2)}
                </span>
            ),
        },
        {
            title: 'Acciones',
            dataIndex: 'actions',
            key: 'actions',
            width: 200,
            render: (_, record) => {
                return (
                    <div className="grid-3-lg">
                        <Tooltip title="Ver Receta">
                            <Link
                                to={`recetas/${record.id}`}
                                className="link__icon"
                            >
                                <FontAwesomeIcon icon={faEye} />
                            </Link>
                        </Tooltip>
                        <Tooltip title="Editar Receta">
                            <Button
                                type="primary"
                                onClick={() => onEdition(record)}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Borrar Receta">
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

    const hideModal = () => {
        dispatch(closeModal())
    }

    useEffect(() => {
        if (editing && ingredientsOptions != null) {
            form.setFieldsValue({
                name: recipeName,
                ingredients: [...ingredientsOptions.ingredients],
            })
        } else {
            form.setFieldsValue({
                name: undefined,
                ingredients: undefined,
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
        deleteRecipe,
        tableData,
        columns,
        actualRow,
        hideModal,
        columns,
    }
}
