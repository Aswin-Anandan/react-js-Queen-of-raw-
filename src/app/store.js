import { init } from "@rematch/core";
import * as models from "./models";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";

const history = createHistory();
const routeMiddleware = routerMiddleware(history);

const middlewares = [routeMiddleware];

const store = init({
  redux: {
    middlewares: middlewares
  },
  models
});

export { store, history };
