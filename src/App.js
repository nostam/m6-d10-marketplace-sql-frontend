import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Registration from "./pages/Registration";
import BackOffice from "./pages/BackOffice";
import NewProduct from "./pages/NewProduct";
import ProductDetails from "./pages/ProductDetails";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
const routes = [
  { path: "/", component: Home },
  { path: "/register", component: Registration },
  { path: "/backoffice", component: BackOffice },
  // { path: "/new-product", component: NewProduct },
  // { path: "/product/:id", component: ProductDetails },
  // { path: "/search", component: Search },
];
class App extends React.Component {
  state = { searchQuery: "", searchCategory: "" };
  handleSearch = (e) => {
    e.preventDefault();
    this.setState({ searchQuery: e.target.value });
  };
  render() {
    return (
      <Router>
        <NavBar
          title="M6 marketplace"
          handleSearch={(e) => this.handleSearch(e)}
        />
        {routes.map(({ path, component }, index) => (
          <Route
            exact
            path={path}
            component={component}
            key={`route${index}`}
          />
        ))}
      </Router>
    );
  }
}

export default App;
