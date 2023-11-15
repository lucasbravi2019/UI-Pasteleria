import { faDollarSign, faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "antd/es/typography/Link";
import { Button, Tooltip } from "antd/lib"


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
        render: (actions) => {
            return (
                <div className="grid-3-lg">
                    <Tooltip title='Ver Receta'>
                        <Link to={`recetas/`} 
                            className='link__icon'
                            ><FontAwesomeIcon icon={faEye} /></Link>
                    </Tooltip>
                    <Tooltip title='Editar Receta'>
                        <Link to={`recetas/editar/`}
                            className='link__icon'
                        ><FontAwesomeIcon icon={faPenToSquare} /></Link>
                    </Tooltip>
                    <Tooltip title='Borrar Receta'>
                        <Button type="primary" danger
                            onClick={() => actions.onClick(actions.id)}
                        ><FontAwesomeIcon icon={faTrash} /></Button>
                    </Tooltip>
                </div>
            )
        }
    }
]

const getFilters = (recipes) => {
    return Object.values(recipes).map(recipe => {
        return {
            text: recipe.name,
            value: recipe.name
        }
    })
}

export const data = (recipes, onClick) => {
    return Object.values(recipes).map(recipe => {
        return {
            key: `${recipe.id}`,
            name: recipe.name,
            ingredients: recipe.ingredients,
            price: recipe.price,
            actions: {
                id: recipe.id,
                onClick: onClick
            }
        }
    })
}