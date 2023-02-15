import './index.scss'

import { IngredientMultiPackage } from '../../interfaces/recipe'
import { useAppDispatch } from '../../redux/hooks/hooks'
import { runDeleteIngredient } from '../../redux/reducers/ingredientSlice'
import IngredientPackageItem from '../ingredient-package-item'
import SubmitButton from '../submit-button'

const IngredientItem = ({ ingredient, handleEdit }: { ingredient: IngredientMultiPackage, handleEdit: Function }) => {
    const dispatch = useAppDispatch()

    const handleDeleteIngredient = (id: any) => dispatch(runDeleteIngredient(id))

    return (
        <>
            <section className='ingredient__item'>
                <p>Nombre: {ingredient.name}</p>
                {
                    ingredient.packages && ingredient.packages.length > 0 && (
                        <>
                            <p className="ingredient-package__title">Envases</p>
                            <section className="ingredient-package__container">
                                {
                                    ingredient.packages && ingredient.packages.map(envase => (
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
                <section className="button-grid__container">
                    <SubmitButton
                        buttonText='Editar Ingrediente'
                        className='card__edit-button'
                        onClick={() => handleEdit(ingredient)}
                    />
                    <SubmitButton
                        buttonText='Borrar Ingrediente'
                        className='card__delete-button'
                        onClick={() => handleDeleteIngredient(ingredient.id)}
                    />
                </section>
            </section>
        </>
    )
}

export default IngredientItem