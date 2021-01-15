import React from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUsersCog } from "react-icons/fa";
const NavBar = (props) => {
  // handleSearchQuery = searchQuery => {
  //   let category = this.state.selectedCategory;

  //   if (searchQuery) {
  //     let filteredProducts = products[category].filter(book =>
  //       book.title.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     this.setState({ products: filteredProducts.slice(0, 12) });
  //   } else {
  //     this.setState({ products: products[category].slice(0, 12) });
  //   }
  // };

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Link to="/">
        <Navbar.Brand>{props.title}</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/backoffice">Backoffice</Nav.Link>
        </Nav>
        <Nav>
          <Form inline>
            <FormControl
              controlId="navSearchBar"
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button variant="outline-primary">Search</Button>
          </Form>
          <Link to="/register">
            <Nav.Link className="text-white ml-2" href="/register">
              <FaUsersCog size="2rem" />
            </Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
