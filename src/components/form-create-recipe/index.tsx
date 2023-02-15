import './index.scss'

import { Formik } from 'formik'

import { RecipeName } from '../../interfaces/recipe'

const FormCreateRecipe = ({ initialValues, onSubmit, update, setUpdate }:
    { initialValues: RecipeName, onSubmit: Function, update: boolean, setUpdate: Function }) => {
    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                onSubmit(values)
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
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur,
                resetForm,
                isSubmitting
            }) => (
                <form onSubmit={handleSubmit} className="form__container">
                    <section className="form__field">
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
                    </section>
                    <button
                        type='submit'
                        className='form__submit-button'
                        disabled={isSubmitting}
                    >{update ? 'Actualizar Receta' : 'Crear Receta'}</button>
                    {
                        update &&
                        <button
                            className='form__submit-button'
                            onClick={() => {
                                resetForm()
                                setUpdate(false)
                            }}
                        >
                            Cancelar
                        </button>
                    }
                </form>
            )}

        </Formik>
    )
}

export default FormCreateRecipe