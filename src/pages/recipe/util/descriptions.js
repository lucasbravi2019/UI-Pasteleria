import TableGrid from "../../../components/table"
import { columns, getData } from "./columns"


export const getDescriptions = (recipe) => {
    return [
        {
            key: '1',
            label: 'Receta',
            children: recipe.name,
            contentStyle: {
                display: 'block',
                textAlign: 'center',
                margin: '0 auto'
            }
        },
        {
            key: '2',
            label: 'Precio',
            children: `$ ${recipe.price}`,
            contentStyle: {
                display: 'block',
                textAlign: 'center',
                margin: '0 auto'
            }
        },
        {
            key: '3',
            label: 'Ingredientes',
            contentStyle: {
                display: 'block',
                textAlign: 'center',
                margin: '0 auto'
            },
            children: (
                <>
                {
                    recipe.ingredients != null && recipe.ingredients.length > 0 ? (
                        <>
                            <TableGrid
                                key={recipe.id}
                                columns={columns}
                                data={getData(recipe.ingredients)}
                            />
                        </>
                    ) : (
                        <p>No hay ingredientes</p>
                    )
                }
                </>
            )

        }
    ]
    
}