
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import './index.css'

import reducers from './redux/reducers'
import App from './components/App'

const enhancer = compose(applyMiddleware(thunkMiddleware))

let store = createStore(reducers, {}, enhancer)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	 document.getElementById('root')
)
