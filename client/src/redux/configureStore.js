import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import memes from "./features/memes";
import { composeWithDevTools } from "redux-devtools-extension";
import templates from "./features/templates";

export const store = createStore(
  combineReducers({ memes, templates }),
  composeWithDevTools(applyMiddleware(thunk))
);
