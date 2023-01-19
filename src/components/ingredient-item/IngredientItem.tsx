import { Ingredient } from '../../interfaces/recipes'

const IngredientItem = ({ ingredient }: { ingredient: Ingredient }) => {
    return (
        <section>
            <p>{ingredient.name}</p>
            <p>{ingredient.metric}</p>
            <p>{ingredient.price}</p>
        </section>
    )
}

export default IngredientItem