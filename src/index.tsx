import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './root/store'
import App from './root/App'
import './globalStyles.scss'

const domNode = document.getElementById('root')!
const root = createRoot(domNode)

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
