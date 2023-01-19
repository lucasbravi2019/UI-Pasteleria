import './index.scss'

import { useState } from 'react'

import ErrorMessage from '../error-message/ErrorMessage'
import FormInput from '../form-input/FormInput'
import FormLabel from '../form-label/FormLabel'
import SubmitButton from '../submit-button/SubmitButton'
import SuccessMessage from '../success-message/SuccessMessage'

const Form = ({ submitText, inputs, onSubmit, successMessage, errorMessage }:
    {
        submitText: string, inputs: { inputName: string, inputText: string, inputType: string }[], onSubmit: Function, successMessage: string,
        errorMessage: string
    }) => {

    const [formData, setFormData] = useState({})

    return (
        <form>
            {
                inputs && inputs.map((input, index) => (
                    <div className="form__fields" key={index}>
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
                    </div>
                ))
            }

            <SubmitButton
                buttonText={submitText}
                className={'form__submit-button'}
                onClick={() => onSubmit(formData)}
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