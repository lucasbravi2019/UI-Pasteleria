import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './root/store'
import App from './root/App'
import './globalStyles.scss'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
