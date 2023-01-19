import './globalStyles.scss'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './root/App'
import { store } from './root/store'

const domNode = document.getElementById('root')!
const root = createRoot(domNode)

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
