import { Form } from 'antd'
import SearchSelect from '../search-select'

const FormSearchSelect = ({
    label,
    name,
    placeholder,
    options,
    onChange,
    initialValue,
}) => {
    return (
        <>
            <Form.Item
                label={label}
                name={name}
                style={{
                    display: 'block',
                    margin: 'auto',
                }}
            >
                <SearchSelect
                    initialValue={initialValue}
                    placeholder={placeholder}
                    options={options}
                    onChange={onChange}
                    name={name}
                />
            </Form.Item>
        </>
    )
}

export default FormSearchSelect
