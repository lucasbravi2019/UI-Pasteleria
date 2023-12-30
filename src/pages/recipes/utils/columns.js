import { faDollarSign, faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { Button, Tooltip } from "antd/lib"
import ModalCustom from "../../../components/modal-custom"


export const columns = (recipes) => [
    {
        title: "Nombre",
        dataIndex: "name",
        key: "name",
        filters: getFilters(recipes),
        sorter: (a, b) => a.name.localeCompare(b.name),
        onFilter: (value, record) => record.name === value,
        width: 200
    },
    {
        title: "Precio",
        dataIndex: "price",
        key: "price",
        width: 150,
        render: (price) => <span><FontAwesomeIcon icon={faDollarSign} /> {price}</span>
    },
    {
        title: "Acciones",
        dataIndex: "actions",
        key: "actions",
        width: 100,
        render: (_, record) => {
            return (
                <div className="grid-3-lg">
                    <Tooltip title='Ver Receta'>
                        <Link to={`recetas/${record.recipeId}`}
                            className='link__icon'
                        ><FontAwesomeIcon icon={faEye} /></Link>
                    </Tooltip>
                    <Tooltip title='Editar Receta'>
                        <Button type="primary"
                        ><FontAwesomeIcon icon={faPenToSquare} /></Button>
                    </Tooltip>
                    <Tooltip title='Borrar Receta'>
                        <Button type="primary" danger
                            onClick={() => record.onOpenModal()}
                        ><FontAwesomeIcon icon={faTrash} /></Button>
                    </Tooltip>
                    <ModalCustom text="Borrar Receta?" onOk={() => record.onDelete(record.recipeId)} />
                </div>
            )
        }
    }
]



const getFilters = (recipes) => {
    const recipeMap = new Map()
    Object.values(recipes).forEach(recipe => recipeMap.set(recipe.name.toLowerCase(), recipe.name))
    return Array.from(recipeMap.values()).map(recipe => {
        return {
            text: recipe,
            value: recipe
        }
    })
}

export const data = (tableData) => {
    return Object.values(tableData.data).map(recipe => {
        return {
            key: `${recipe.id}`,
            name: recipe.name,
            price: recipe.price,
            recipeId: recipe.id,
            onDelete: (recipeId) => tableData.onDelete(recipeId),
            onOpenModal: () => tableData.onOpenModal()
        }
    })
}