import './index.scss'

const FormInput = ({ inputType, inputText, inputName, formData, setFormData }:
    { inputType: string, inputText: string, inputName: string, formData: {}, setFormData: Function }) => {

    return (
        <input
            type={inputType}
            className="form__input"
            placeholder={inputText}
            onChange={(e) => setFormData({ ...formData, [inputName]: e.target.value })}
        />
    )
}

export default FormInput