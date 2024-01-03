import { Select } from 'antd'
import { useEffect, useState } from 'react'

const SearchSelect = ({
    placeholder,
    options,
    name,
    onChange,
    initialValue,
}) => {
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
                defaultValue={initialValue()}
                placeholder={placeholder}
                optionFilterProp="children"
                filterOption={filterOption}
                onChange={onSelectChange}
                options={options}
                style={{
                    display: 'block',
                    minWidth: '100%',
                    margin: 'auto',
                }}
            />
        </>
    )
}

export default SearchSelect
