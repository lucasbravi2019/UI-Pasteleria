import './index.scss'

import {
    useEffect,
    useState,
} from 'react'

import { FormInterface } from '../../interfaces/form'
import FormInput from '../form-input'
import FormLabel from '../form-label'
import FormSelect from '../form-select'
import MessagePopup from '../message-popup'
import SubmitButton from '../submit-button'

const Form = ({ submitText, inputs, onSubmit }: { submitText: string, inputs: FormInterface[], onSubmit: Function }) => {
    const [formData, setFormData] = useState({})
    const [formInputs, setFormInputs] = useState(inputs)
    useEffect(() => {
        console.log(inputs);
        console.log(formInputs);

        setFormInputs(inputs)
        console.log(formInputs);

    }, [inputs])

    return (
        <form className="form" onSubmit={() => setFormData({})}>
            {
                inputs && inputs.map((input, index) => (
                    <div className="form__fields" key={index}>
                        {
                            input.inputType === 'select' && (
                                <>
                                    <FormLabel
                                        input={input}
                                    />
                                    <FormSelect
                                        formData={formData}
                                        setFormData={setFormData}
                                        input={input}
                                    />
                                </>
                            )
                        }
                        {
                            input.inputType === 'hidden' && (
                                <>
                                    <FormInput
                                        input={input}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                </>
                            )
                        }
                        {
                            input.inputType == 'text' && (
                                <>
                                    <FormLabel
                                        input={input}
                                    />
                                    <FormInput
                                        input={input}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                </>
                            )
                        }
                        {
                            input.inputType == 'number' && (
                                <>
                                    <FormLabel
                                        input={input}
                                    />
                                    <FormInput
                                        input={input}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                </>
                            )
                        }
                    </div>
                ))
            }

            <SubmitButton
                buttonText={submitText}
                className={'form__submit-button'}
                onClick={() => {
                    onSubmit(formData)
                    setFormData({})
                }}
            />
            <MessagePopup />
        </form>
    )
}

export default Form