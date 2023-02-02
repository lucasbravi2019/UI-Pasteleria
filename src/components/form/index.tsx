import './index.scss'

import { useState } from 'react'

import { FormInterface } from '../../interfaces/formInterface'
import ErrorMessage from '../error-message'
import FormInput from '../form-input'
import FormLabel from '../form-label'
import SubmitButton from '../submit-button'
import SuccessMessage from '../success-message'

const Form = ({ submitText, inputs, onSubmit, successMessage, errorMessage }:
    {
        submitText: string, inputs: FormInterface[], onSubmit: Function, successMessage: string,
        errorMessage: string
    }) => {

    const [formData, setFormData] = useState({})

    return (
        <form className="form" onSubmit={() => setFormData({})}>
            {
                inputs && inputs.map((input, index) =>
                    <div className="form__fields" key={index}>
                        {
                            input.inputType === 'select' ? (
                                <>
                                    <FormLabel
                                        inputName={input.inputName}
                                        inputText={input.inputText}
                                    />
                                    <select name={input.inputName} title={input.inputText} className="form__select">
                                        {
                                            input.options && input.options.map((option, ind) => (
                                                <option key={ind} value={option.id}>{option.nombre}</option>
                                            ))
                                        }
                                    </select>
                                </>
                            ) : (
                                <>
                                    <FormLabel
                                        inputName={input.inputName}
                                        inputText={input.inputText}
                                    />
                                    <FormInput
                                        inputType={input.inputType}
                                        inputText={input.inputText}
                                        inputName={input.inputName}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                </>
                            )
                        }
                    </div>
                )
            }

            <SubmitButton
                buttonText={submitText}
                className={'form__submit-button'}
                onClick={() => {
                    onSubmit(formData)
                    setFormData({})
                }}
            />
            {
                successMessage && (
                    <SuccessMessage
                        message={successMessage}
                    />
                )
            }
            {
                errorMessage && (
                    <ErrorMessage
                        message={errorMessage}
                    />
                )
            }
        </form>
    )
}

export default Form