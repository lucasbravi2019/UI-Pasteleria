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
                    ingredient.package && (
                        <>
                            <p className="ingredient-package__title">Envases</p>
                            <section className="ingredient-package__container">
                                {
                                    ingredient.package && ingredient.package.map(envase => (
                                        <section key={envase.id}>
                                            <IngredientPackageItem
                                                envase={envase}
                                            />
                                        </section>
                                    ))
                                }
                            </section>
                        </>
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