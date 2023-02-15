import {
    Field,
    Formik,
} from 'formik'

import { IngredientField } from '../../interfaces/ingredient'
import {
    RecipeField,
    RecipeIngredientForm,
} from '../../interfaces/recipe'

const FormRecipeIngredient = ({ initialValues, onSubmit, recetas, ingredientes, packageSelector }:
    { initialValues: RecipeIngredientForm, onSubmit: Function, recetas: RecipeField[], ingredientes: IngredientField[], packageSelector: Function }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                onSubmit(values);
                resetForm()
                setSubmitting(false)
            }}
            validate={(values) => {
                let errors = {}
                if (!values.recipeId) {
                    errors = { ...errors, recipeId: 'Requerido' }
                }
                if (!values.ingredientId) {
                    errors = { ...errors, ingredientId: 'Requerido' }
                }
                if (!values.metric) {
                    errors = { ...errors, metric: 'Requerido' }
                }
                if (!values.quantity) {
                    errors = { ...errors, quantity: 'Requerido' }
                }
                return errors
            }}
        >
            {({
                values,
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur,
                isSubmitting
            }) => (
                <form onSubmit={handleSubmit} className="form__container">
                    <section className="form__field">
                        <label htmlFor="recipeId">Nombre receta</label>
                        <Field name="recipeId" as="select">
                            <option value="" disabled>-- Seleccione una receta --</option>
                            {
                                recetas.map(receta => (
                                    <option key={receta.id} value={receta.id}>{receta.name}</option>
                                ))
                            }
                        </Field>
                        {
                            errors.recipeId && touched.recipeId && (
                                <section className='validation-error'>
                                    <p>{errors.recipeId}</p>
                                </section>
                            )
                        }
                    </section>
                    <section className="form__field">
                        <label htmlFor="ingredientId">Nombre Ingrediente</label>
                        <Field name="ingredientId" as="select">
                            <option value="" disabled>-- Seleccione un ingrediente --</option>
                            {
                                ingredientes.map(ingrediente => (
                                    <option key={ingrediente.id} value={ingrediente.id}>{ingrediente.name}</option>
                                ))
                            }
                        </Field>
                        {
                            errors.ingredientId && touched.ingredientId && (
                                <section className="validation-error">
                                    <p>{errors.ingredientId}</p>
                                </section>
                            )
                        }
                    </section>
                    <section className="form__field">
                        <label htmlFor="metric">Unidad</label>
                        <Field name="metric" as="select">
                            <option value="" disabled>-- Seleccione un envase --</option>
                            {
                                packageSelector(values.ingredientId, ingredientes).map((envase: any) => (
                                    <option key={envase.id} value={envase.id}>{envase.name}</option>
                                ))
                            }
                        </Field>
                        {
                            errors.metric && touched.metric && (
                                <section className="validation-error">
                                    <p>{errors.metric}</p>
                                </section>
                            )
                        }
                    </section>
                    <section className="form__field">
                        <label htmlFor="quantity">Cantidad</label>
                        <input step={0.01} type="number" name='quantity' onChange={handleChange} onBlur={handleBlur} value={values.quantity} />
                        {
                            errors.quantity && touched.quantity && (
                                <section className="validation-error">
                                    <p>{errors.quantity}</p>
                                </section>
                            )
                        }
                    </section>
                    <button type="submit" disabled={isSubmitting} className='form__submit-button'>Crear receta</button>
                </form>
            )}

        </Formik>
    )
}

export default FormRecipeIngredient