import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import memes from './features/memes';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
  combineReducers({memes}),
  composeWithDevTools(applyMiddleware(thunk))
)