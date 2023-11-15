import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd/lib'
import { useEffect, useState } from 'react'

const CircleSpinner = (props) => {
    const { loading, children } = props
    const [isLoading, setLoading] = useState(loading)
    const antIcon = <LoadingOutlined spin style={{ fontSize: 50 }} />

    useEffect(() => {
        setLoading(loading)
    }, [loading])

    return (
        <Spin spinning={isLoading} indicator={antIcon}>
            {children}
        </Spin>
    )
}

export default CircleSpinner
