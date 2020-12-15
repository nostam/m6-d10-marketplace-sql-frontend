import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home";
import MyNavBar from "./components/MyNavBar";
import Registration from "./components/Registration";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
class App extends React.Component {
  state = { books: [] };
  componentDidMount = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/books`);
    const jsonBooks = await response.json();
    console.log(jsonBooks);

    this.setState({
      books: jsonBooks,
    });
  };
  render() {
    return (
      <Router>
        <MyNavBar title="M5 Book store!" />
        {/* <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Registration} /> */}
        {this.state.books &&
          this.state.books.map((book, index) => (
            <div key={index}>
              <img src={book.img} style={{ width: "200px" }} alt=""></img>
              <span>{book.title}</span>
            </div>
          ))}
      </Router>
    );
  }
}

export default App;
