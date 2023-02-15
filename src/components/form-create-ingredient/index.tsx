import { Formik } from 'formik'

import { IngredientNameDTO } from '../../interfaces/ingredient'

const FormCreateIngredient = ({ initialValues, onSubmit }: { initialValues: IngredientNameDTO, onSubmit: Function }) => {
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
                if (!values.name) {
                    errors = { ...errors, name: 'Requerido' }
                }
                return errors
            }}
        >
            {({
                values,
                touched,
                errors,
                handleSubmit,
                handleChange,
                handleBlur
            }) => (
                <form onSubmit={handleSubmit} className="form__container">
                    <section className="form__field">
                        <label htmlFor="name">Ingrediente</label>
                        <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
                        {
                            errors.name && touched.name && (
                                <section className='validation-error'>
                                    <p>{errors.name}</p>
                                </section>
                            )
                        }
                    </section>
                    <button type="submit" className='form__submit-button'>Crear Ingrediente</button>
                </form>
            )}

        </Formik>
    )
}

export default FormCreateIngredient