import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { runLoadRecipe } from './slice'
import { selectRecipeNameSelector, selectShowRecipeSelector } from './selectors'
import './index.scss'
import { Descriptions, Empty } from 'antd'
import { getDescriptions } from './util/descriptions'
import { selectIsLoadingSelector } from '../../redux/selectors'
import CircleSpinner from '../../components/circle-spinner'
import Message from '../../components/message'
import { selectMessageSelector } from '../../components/message/selectors'

const ShowRecipe = ({ match }) => {
    const dispatch = useDispatch()
    const recipeSelector = useSelector(selectShowRecipeSelector)
    const recipeNameSelector = useSelector(selectRecipeNameSelector)
    const loading = useSelector(selectIsLoadingSelector)
    const message = useSelector(selectMessageSelector)

    useEffect(() => {
        const recipeId = match.params.recipeId
        dispatch(runLoadRecipe(recipeId))
    }, [])

    return (
        <>
            <Message message={message} />
            <CircleSpinner loading={loading}>
                {recipeSelector != null ? (
                    <div>
                        <Descriptions
                            title={`Viendo receta: ${recipeNameSelector}`}
                            bordered
                            items={getDescriptions(recipeSelector)}
                            layout="vertical"
                            labelStyle={{
                                margin: '0 auto',
                                display: 'block',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}
                            column={2}
                        />
                    </div>
                ) : (
                    <Empty description={<p>No se encontró la receta</p>} />
                )}
            </CircleSpinner>
        </>
    )
}

export default ShowRecipe
