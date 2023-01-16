import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { useAppDispatch } from '../../root/hooks'
import './index.scss'

const FormInput = ({ inputType, inputText, reducer }: { inputType: string, inputText: string, reducer: ActionCreatorWithPayload<any, any> }) => {
    const dispatch = useAppDispatch()
    return (
        <input
            type={inputType}
            className="form__input"
            placeholder={inputText}
            onChange={(e) => dispatch(reducer(e.target.value))}
        />
    )
}

export default FormInput