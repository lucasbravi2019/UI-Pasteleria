import { Empty } from 'antd'
import TableGrid from '../../../components/table'
import { columns, getData } from './columns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'

export const getDescriptions = (recipe) => {
    return [
        {
            key: '1',
            label: 'Receta',
            children: recipe.name,
            contentStyle: {
                display: 'block',
                textAlign: 'center',
                margin: '0 auto',
            },
        },
        {
            key: '2',
            label: 'Precio',
            children: (
                <>
                    <span
                        style={{
                            display: 'block',
                        }}
                    >
                        {'Costo: '}
                        <FontAwesomeIcon icon={faDollarSign} />
                        {` ${recipe.price.toFixed(2)}`}
                    </span>
                    <span
                        style={{
                            display: 'block',
                        }}
                    >
                        {'Precio total: '}
                        {<FontAwesomeIcon icon={faDollarSign} />}
                        {` ${(recipe.price * 3).toFixed(2)}`}
                    </span>
                </>
            ),
            contentStyle: {
                display: 'block',
                textAlign: 'center',
                margin: '0 auto',
            },
        },
        {
            key: '3',
            label: 'Ingredientes',
            contentStyle: {
                display: 'block',
                textAlign: 'center',
                margin: '0 auto',
            },
            children: (
                <>
                    {recipe.ingredients != null &&
                    recipe.ingredients.length > 0 ? (
                        <>
                            <TableGrid
                                key={recipe.id}
                                columns={columns}
                                data={getData(recipe.ingredients)}
                            />
                        </>
                    ) : (
                        <Empty description={<p>No hay ingredientes</p>} />
                    )}
                </>
            ),
        },
    ]
}
