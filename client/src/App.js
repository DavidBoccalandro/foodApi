import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Details from "./components/Details";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path="/" component={Landing}></Route>
					<Route path="/home" component={Home}></Route>
					<Route path="/home/detail/:id" component={Details}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
