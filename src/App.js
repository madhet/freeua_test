import React from "react";
import "./main.css";
import { Switch, BrowserRouter } from "react-router-dom";
import Router from "./Router";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Router />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
