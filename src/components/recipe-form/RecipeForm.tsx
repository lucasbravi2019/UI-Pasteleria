import FormInput from "../form-input/FormInput"
import FormLabel from "../form-label/FormLabel"
import SubmitButton from "../submit-button/SubmitButton"
import './index.scss'

const RecipeForm = ({submitText, inputs}: {submitText: string, inputs: [{inputName: string, inputText: string, inputType: string}]}) => {
    return (
        <form>
            {
                inputs != null && inputs.map(input => (
                        <div className="form__fields">
                            <FormLabel 
                                inputName={input.inputName}
                                inputText={input.inputText}
                            />
                            <FormInput 
                                inputType={input.inputType}
                                inputText={input.inputText}
                            />
                        </div>
                    )
                )
            }

            <SubmitButton 
                buttonText={submitText}
                className={'form__submit-button'}
                onClick={() => null}
            />
        </form>
    )
}

export default RecipeForm