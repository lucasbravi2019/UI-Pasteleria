import './index.scss'

import { IngredientMultiPackage } from '../../interfaces/recipe'
import { useAppDispatch } from '../../redux/hooks/hooks'
import { runDeleteIngredient } from '../../redux/reducers/ingredientSlice'
import IngredientPackageItem from '../ingredient-package-item'
import SubmitButton from '../submit-button'

const IngredientItem = ({ ingredient }: { ingredient: IngredientMultiPackage }) => {
    const dispatch = useAppDispatch()

    const handleDeleteIngredient = (id: any) => dispatch(runDeleteIngredient(id))

    return (
        <>
            <section className='ingredient__item'>
                <p>Nombre: {ingredient.name}</p>
                {
                    ingredient.packages && (
                        <section className="ingredient-package__container">
                            <p>Envases</p>
                            {
                                ingredient.packages && ingredient.packages.map(envase => (
                                    <section key={envase.package.id}>
                                        <IngredientPackageItem
                                            envase={envase}
                                        />
                                    </section>
                                ))
                            }
                        </section>
                    )
                }
                <SubmitButton
                    buttonText='Borrar Ingrediente'
                    className='card__delete-button'
                    onClick={() => handleDeleteIngredient(ingredient.id)}
                />
            </section>
        </>
    )
}

export default IngredientItem