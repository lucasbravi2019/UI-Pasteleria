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
            >
                <InputNumber
                    placeholder={placeholder}
                    style={{
                        display: 'block',
                        minWidth: '100%',
                    }}
                />
            </Form.Item>
        </>
    )
}

export default FormNumber
