import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Details from "./components/Details";
import FormCreateRecipe from "./components/FormCreateRecipe";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path="/" component={Landing}></Route>
					<Route exact path="/home" component={Home}></Route>
					<Route path="/home/detail/:id" component={Details}></Route>
					<Route path="/recipe" component={FormCreateRecipe}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
