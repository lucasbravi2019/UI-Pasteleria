import { Card, Empty } from 'antd'

const ModalRender = ({ ingredient, deleting }) => {
    const cardStyle = {
        width: '50%',
        textAlign: 'center',
    }

    return (
        <>
            {deleting ? (
                <span>Borrar Ingrediente?</span>
            ) : ingredient != null ? (
                <>
                    <h1>{ingredient.name}</h1>
                    {ingredient.packages != null &&
                        ingredient.packages.length > 0 ? (
                        <Card title="Envases">
                            {Object.values(ingredient.packages).map((pkg) => (
                                <Card.Grid
                                    style={cardStyle}
                                    key={pkg.ingredientPackageId}
                                >
                                    {`$ ${pkg.price.toFixed(2)} x ${pkg.package.quantity} ${pkg.package.metric}`}
                                </Card.Grid>
                            ))}
                        </Card>
                    ) : (
                        <Empty description={<p>No hay envases</p>} />
                    )}
                </>
            ) : (
                <Empty description={<p>No se encontró el ingrediente</p>} />
            )}
        </>
    )
}

export default ModalRender
