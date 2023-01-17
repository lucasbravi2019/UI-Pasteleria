import { setRecipeName } from "../../containers/create-recipe/recipeSlice"
import ErrorMessage from "../error-message/ErrorMessage"
import FormInput from "../form-input/FormInput"
import FormLabel from "../form-label/FormLabel"
import SubmitButton from "../submit-button/SubmitButton"
import SuccessMessage from "../success-message/SuccessMessage"
import './index.scss'



const RecipeForm = ({ submitText, inputs, onSubmit, successMessage, errorMessage }:
    {
        submitText: string, inputs: [{ inputName: string, inputText: string, inputType: string }], onSubmit: Function, successMessage: string,
        errorMessage: string
    }) => {

    return (
        <form>
            {
                inputs != null && inputs.map((input, index) => (
                    <div className="form__fields" key={index}>
                        <FormLabel
                            inputName={input.inputName}
                            inputText={input.inputText}
                        />
                        <FormInput
                            inputType={input.inputType}
                            inputText={input.inputText}
                            reducer={setRecipeName}
                        />
                    </div>
                ))
            }

            <SubmitButton
                buttonText={submitText}
                className={'form__submit-button'}
                onClick={() => onSubmit()}
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

export default RecipeForm