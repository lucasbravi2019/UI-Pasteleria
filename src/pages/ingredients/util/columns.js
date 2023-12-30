import { Button, Tooltip } from "antd"
import ModalCustom from "../../../components/modal-custom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"

export const columns = (ingredients) => {
    return [
        {
            title: "Nombre",
            dataIndex: "name",
            key: "name",
            width: 200,
            filters: getFilters(ingredients),
            sorter: (a, b) => a.name.localeCompare(b.name),
            onFilter: (value, record) => record.name === value,
        },
        {
            title: "Acciones",
            dataIndex: "actions",
            key: "actions",
            width: 200,
            render: (_, record) => {
                return (
                    <div className="grid-3-lg">
                        <Tooltip title='Editar Ingrediente'>
                            <Button type="primary" onClick={() => {
                                record.onEdition()
                            }}
                            ><FontAwesomeIcon icon={faPenToSquare} /></Button>
                        </Tooltip>
                        <Tooltip title='Borrar Ingrediente'>
                            <Button type="primary" danger
                                onClick={() => record.onOpenModal()}
                            ><FontAwesomeIcon icon={faTrash} /></Button>
                        </Tooltip>
                        <ModalCustom text="Borrar Ingrediente?" onOk={() => record.onDelete()} />
                    </div>
                )
            }
        }
    ]
}

const getFilters = (ingredients) => {
    const ingredientMap = new Map()
    Object.values(ingredients).forEach(ingredient => ingredientMap.set(ingredient.name.toLowerCase(), ingredient.name))
    return Array.from(ingredientMap.values()).map(ingredient => {
        return {
            text: ingredient,
            value: ingredient
        }
    })
}

export const getData = (tableData) => {
    return Object.values(tableData.data).map(ingredient => {
        return {
            key: ingredient.id,
            name: ingredient.name,
            onOpenModal: () => tableData.onOpenModal(),
            onEdition: () => tableData.onEdition(ingredient),
            onDelete: () => tableData.onDelete(ingredient.id)
        }
    })
}