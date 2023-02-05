import './index.scss'

import { Ingredient } from '../../interfaces/recipe'
import { useAppDispatch } from '../../redux/hooks/hooks'
import { runDeleteIngredient } from '../../redux/reducers/ingredientSlice'
import SubmitButton from '../submit-button'

const IngredientItem = ({ ingredient }: { ingredient: Ingredient }) => {
    const dispatch = useAppDispatch()

    const handleDeleteIngredient = (id: any) => dispatch(runDeleteIngredient(id))

    return (
        <section className='ingredient__item'>
            <p>Nombre: {ingredient.name}</p>
            <p>Cantidad: {ingredient.quantity} {ingredient.metric}</p>
            <p>Precio: $ {ingredient.price}</p>
            <SubmitButton
                buttonText='Borrar Ingrediente'
                className='card__submit-button'
                onClick={() => handleDeleteIngredient(ingredient.id)}
            />
        </section>
    )
}

export default IngredientItem