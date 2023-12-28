import { Select } from "antd"

const SearchSelect = ({ placeholder, options, name, onChange }) => {

    const filterOption = (input, option) => {
        return (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }

    const onSelectChange = (value) => {
        onChange(name, value)
    }

    return (
        <>
            <Select
                showSearch
                defaultValue="default"
                placeholder={placeholder}
                optionFilterProp="children"
                filterOption={filterOption}
                onChange={onSelectChange}
                options={options}
            />
        </>
    )
}

export default SearchSelect