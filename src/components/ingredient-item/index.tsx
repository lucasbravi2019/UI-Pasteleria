import './index.scss'

import { useEffect } from 'react'

import { IngredientMultiPackage } from '../../interfaces/recipe'
import { useAppDispatch } from '../../redux/hooks/hooks'
import { runDeleteIngredient } from '../../redux/reducers/ingredientSlice'
import IngredientPackageItem from '../ingredient-package-item'
import SubmitButton from '../submit-button'

const IngredientItem = ({ ingredient }: { ingredient: IngredientMultiPackage }) => {
    const dispatch = useAppDispatch()

    const handleDeleteIngredient = (id: any) => dispatch(runDeleteIngredient(id))

    useEffect(() => {
        console.log(ingredient.package);

    }, [ingredient])

    return (
        <>
            <section className='ingredient__item'>
                <p>Nombre: {ingredient.name}</p>
                {
                    ingredient.package && ingredient.package[0]?.metric !== '' && (
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