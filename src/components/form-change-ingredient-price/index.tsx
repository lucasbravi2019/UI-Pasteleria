import { Formik } from 'formik'

import { IngredientPriceDTO } from '../../interfaces/ingredient'

const FormChangeIngredientPrice = ({ initialValues, onSubmit }: { initialValues: IngredientPriceDTO, onSubmit: Function }) => {
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
                if (!values.packageId) {
                    errors = { ...errors, packageId: 'Requerido' }
                }
                if (!values.price) {
                    errors = { ...errors, price: 'Debe ser mayor a 0' }
                }
                return errors;
            }}
        >
            {({
                values,
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur
            }) => (
                <form className="form__container" onSubmit={handleSubmit}>
                    <section className="form__field">
                        <label htmlFor="price">Precio</label>
                        <input name="price" type="number" step={0.01} value={values.price} onChange={handleChange} onBlur={handleBlur} />
                        {
                            errors.price && touched.price && (
                                <section className="validation-error">
                                    <p>{errors.price}</p>
                                </section>
                            )
                        }
                    </section>
                    <section className="form__field">
                        <input type="hidden" name="id" value={values.packageId} />
                        {
                            errors.packageId && touched.packageId && (
                                <section className="validation-error">
                                    <p>{errors.packageId}</p>
                                </section>
                            )
                        }
                    </section>
                    <button type="submit" className='form__submit-button'>Cambiar precio</button>
                </form>
            )}
        </Formik>
    )
}

export default FormChangeIngredientPrice