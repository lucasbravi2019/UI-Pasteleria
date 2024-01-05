import { Form, Select } from 'antd'

const FormSearchSelect = ({
    label,
    name,
    placeholder,
    options,
    initialValue,
}) => {
    const filterOption = (input, option) => {
        return (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
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
