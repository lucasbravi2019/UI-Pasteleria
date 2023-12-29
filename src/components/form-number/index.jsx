import { Form, InputNumber } from "antd"

const FormNumber = ({ name, label, required, tooltip, placeholder, defaultValue }) => {
    return (
        <>
            <Form.Item name={name} label={label} required={required} tooltip={tooltip}>
                <InputNumber placeholder={placeholder} value={defaultValue} />
            </Form.Item>
        </>
    )
}

export default FormNumber