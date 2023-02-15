import {
    Field,
    Formik,
} from 'formik'

import {
    IngredientFieldDTO,
    IngredientPackageDTO,
} from '../../interfaces/ingredient'
import { PackageField } from '../../interfaces/package'

const FormIngredientPackage = ({ initialValues, ingredientes, envases, onSubmit }:
    { initialValues: IngredientPackageDTO, ingredientes: IngredientFieldDTO[], envases: PackageField[], onSubmit: Function }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                onSubmit(values)
                resetForm()
                setSubmitting(false)
            }}
            validate={(values) => {
                let errors = {}
                if (!values.ingredientId) {
                    errors = { ...errors, ingredientId: 'Requerido' }
                }
                if (!values.packageId) {
                    errors = { ...errors, packageId: 'Requerido' }
                }
                if (values.price === 0) {
                    errors = { ...errors, price: 'Debe ser un valor mayor que 0' }
                }
                return errors
            }}
        >
            {({
                values,
                errors,
                touched,
                isSubmitting,
                handleSubmit,
                handleChange,
                handleBlur
            }) => (
                <form onSubmit={handleSubmit} className="form__container">
                    <section className="form__field">
                        <label htmlFor="ingredientId">Ingrediente</label>
                        <Field as="select" name="ingredientId" >
                            <option value="" disabled>-- Seleccione un ingrediente --</option>
                            {
                                ingredientes.map(ingrediente => (
                                    <option key={ingrediente.id} value={ingrediente.id}>{ingrediente.name}</option>
                                ))
                            }
                        </Field>
                        {
                            errors.ingredientId && touched.ingredientId && (
                                <section className='validation-error'>
                                    <p>{errors.ingredientId}</p>
                                </section>
                            )
                        }
                    </section>
                    <section className="form__field">
                        <label htmlFor="packageId">Envase</label>
                        <Field as="select" name="packageId" >
                            <option value="" disabled>-- Seleccione un envase --</option>
                            {
                                envases.map(envase => (
                                    <option key={envase.id} value={envase.id}>{envase.name}</option>
                                ))
                            }
                        </Field>
                        {
                            errors.packageId && touched.packageId && (
                                <section className='validation-error'>
                                    <p>{errors.packageId}</p>
                                </section>
                            )
                        }
                    </section>
                    <section className="form__field">
                        <label htmlFor="price">Precio</label>
                        <input type="number" name="price" value={values.price} onChange={handleChange} onBlur={handleBlur} />
                        {
                            errors.price && touched.price && (
                                <section className='validation-error'>
                                    <p>{errors.price}</p>
                                </section>
                            )
                        }
                    </section>
                    <button type="submit" className='form__submit-button' disabled={isSubmitting}>Agregar Envase</button>
                </form>
            )}


        </Formik>
    )
}

export default FormIngredientPackage