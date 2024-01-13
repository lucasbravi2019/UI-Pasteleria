import { Button, Form } from "antd"

const FormButton = ({ text }) => {
    return (
        <>
            <Form.Item>
                <Button type="primary">{text}</Button>
            </Form.Item>
        </>
    )
}

export default FormButton