import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import memes from "./features/memes";
import { composeWithDevTools } from "redux-devtools-extension";
import templates from "./features/templates";
import application from "./features/application";
import comments from "./features/comments";

export const store = createStore(
  combineReducers({ memes, application, templates, comments }),
  composeWithDevTools(applyMiddleware(thunk))
);
