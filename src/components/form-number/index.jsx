import { Form, InputNumber } from 'antd'
import { useEffect } from 'react'

const FormNumber = ({
    name,
    label,
    required,
    tooltip,
    placeholder,
    initialValue,
}) => {

    const validateInputNumber = (_, value) => {
        if (value <= 0)
            return Promise.reject('Debe ser mayor a 0')

        return Promise.resolve()
    }
    return (
        <>
            <Form.Item
                name={name}
                label={label ? label : null}
                required={required}
                tooltip={tooltip}
                style={{
                    display: 'block',
                    margin: 'auto',
                    minWidth: '100%',
                }}
                initialValue={initialValue}
                rules={[{ required: true, message: "Debe ingresar un valor" }, { validator: validateInputNumber }]}
            >
                <InputNumber
                    placeholder={placeholder}
                    style={{
                        display: 'block',
                        minWidth: '100%',
                    }}
                    min={0}
                />
            </Form.Item>
        </>
    )
}

export default FormNumber
