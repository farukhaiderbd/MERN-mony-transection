import {createStore, compose, applyMiddleware} from 'redux'
import rootReducre from './reducers/rootReducer'
import thunk from 'redux-thunk'

const middleware = [thunk]
const store = createStore(rootReducre,
   compose(
      applyMiddleware(...middleware),
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     
))

export default store