import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faEye } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'antd'

export const columns = (recipes) => [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        filters: getFilters(recipes),
        sorter: (a, b) => a.name.localeCompare(b.name),
        onFilter: (value, record) => record.name === value,
        width: 200,
    },
    {
        title: 'Precio',
        dataIndex: 'price',
        key: 'price',
        width: 150,
        render: (price) => (
            <span>
                <FontAwesomeIcon icon={faDollarSign} /> {price.toFixed(2)}
            </span>
        ),
    },
    {
        title: 'Acciones',
        dataIndex: 'actions',
        key: 'actions',
        width: 100,
        render: (recipeId) => {
            return (
                <Tooltip title="Ver Receta">
                    <Link to={`recetas/${recipeId}`} className="link__icon">
                        <FontAwesomeIcon icon={faEye} />
                    </Link>
                </Tooltip>
            )
        },
    },
]

const getFilters = (recipes) => {
    return recipes.map((recipe) => {
        return {
            text: recipe.name,
            value: recipe.name,
        }
    })
}
