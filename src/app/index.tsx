import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter as Router } from "react-router-dom";

// Store
import { Provider } from "react-redux";
import { sagaMiddleware, store } from "./store";

// Components
import { App } from './app'
import { rootSaga } from "./sagas";

const root = createRoot(document.getElementById('app'))
root.render(
  <Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
)

sagaMiddleware.run(rootSaga)
