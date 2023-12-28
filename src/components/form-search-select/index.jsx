import { Form } from "antd"
import SearchSelect from "../search-select"

const FormSearchSelect = ({ label, name, placeholder, options, onChange }) => {
    return (
        <>
            <Form.Item label={label} name={name}>
                <SearchSelect placeholder={placeholder} options={options} onChange={onChange} name={name} />
            </Form.Item>
        </>
    )
}

export default FormSearchSelect