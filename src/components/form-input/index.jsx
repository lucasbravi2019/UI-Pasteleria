import { Form, Input } from "antd"

const FormInput = ({ name, label, required, tooltip, placeholder }) => {
    return (
        <>
            <Form.Item name={name} label={label} required={required} tooltip={tooltip}>
                <Input placeholder={placeholder} />
            </Form.Item>
        </>
    )
}

export default FormInput