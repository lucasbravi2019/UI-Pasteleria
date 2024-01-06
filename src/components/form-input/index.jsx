import { Form, Input } from "antd"

const FormInput = ({ name, label, required, tooltip, placeholder, initialValue }) => {
    return (
        <>
            <Form.Item name={name} label={label} required={required} tooltip={tooltip} initialValue={initialValue}>
                <Input placeholder={placeholder} />
            </Form.Item>
        </>
    )
}

export default FormInput