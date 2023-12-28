import { Form, InputNumber } from "antd"

const FormNumber = ({ name, label, required, tooltip, placeholder }) => {
    return (
        <>
            <Form.Item name={name} label={label} required={required} tooltip={tooltip}>
                <InputNumber placeholder={placeholder} />
            </Form.Item>
        </>
    )
}

export default FormNumber