import './index.scss'

import { Formik } from 'formik'

import { RecipeName } from '../../interfaces/recipe'

const FormCreateRecipe = ({ initialValues, onSubmit }: { initialValues: RecipeName, onSubmit: Function }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
                onSubmit(values)
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
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur,
                isSubmitting
            }) => (
                <form onSubmit={handleSubmit} className="form__container">
                    <label htmlFor="name">Nombre receta</label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />
                    {errors.name && touched.name && (
                        <section className="validation-error">
                            <p>{errors.name}</p>
                        </section>
                    )}
                    <button
                        type='submit'
                        className='form__submit-button'
                        disabled={isSubmitting}
                    >Crear Receta</button>
                </form>
            )}

        </Formik>
    )
}

export default FormCreateRecipe