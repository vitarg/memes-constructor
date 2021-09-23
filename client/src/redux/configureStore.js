import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import memes from "./features/memes";
import { composeWithDevTools } from "redux-devtools-extension";
import application from "./features/application";

export const store = createStore(
  combineReducers({ memes, application }),
  composeWithDevTools(applyMiddleware(thunk))
);
