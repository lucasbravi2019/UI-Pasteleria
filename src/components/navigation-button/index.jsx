import './index.scss'

import { Link } from 'react-router-dom'

const NavigationButton = ({ link, routeName }) => {
    return (
        <Link
            className={'navigation-bar__link'}
            to={link}
        >{routeName}</Link>
    )
}

export default NavigationButton