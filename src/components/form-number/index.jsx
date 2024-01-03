import { Form, InputNumber } from 'antd'

const FormNumber = ({
    name,
    label,
    required,
    tooltip,
    placeholder,
    defaultValue,
}) => {
    return (
        <>
            <Form.Item
                name={name}
                label={label}
                required={required}
                tooltip={tooltip}
                style={{
                    display: 'block',
                    margin: 'auto',
                    minWidth: '100%',
                }}
            >
                <InputNumber
                    placeholder={placeholder}
                    value={defaultValue}
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
