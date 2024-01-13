import { Form, Select } from 'antd'

const FormSearchSelect = ({
    label,
    name,
    placeholder,
    options,
    initialValue,
    required
}) => {
    const filterOption = (input, option) => {
        return (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }

    const validateSelect = (_, value) => {
        if (value === 'default')
            return Promise.reject('Debe seleccionar algún valor')

        return Promise.resolve()
    }

    return (
        <>
            <Form.Item
                label={label}
                name={name}
                style={{
                    display: 'block',
                    margin: 'auto',
                }}
                initialValue={initialValue}
                required={required}
                rules={[{ required: true, message: `${label} es obligatorio` }, { validator: validateSelect }]}
            >
                <Select
                    showSearch
                    placeholder={placeholder}
                    optionFilterProp="children"
                    filterOption={filterOption}
                    options={options}
                    style={{
                        display: 'block',
                        minWidth: '100%',
                        margin: 'auto',
                    }}
                />
            </Form.Item>
        </>
    )
}

export default FormSearchSelect
