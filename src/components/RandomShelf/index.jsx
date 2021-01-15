import React from "react";

import { Row, Container } from "react-bootstrap";
import SingleProduct from "../../components/SingleProduct";

class RandomShelf extends React.PureComponent {
  render() {
    return (
      <Container fluid>
        <h4>3 Random Picks </h4>
        <Row className="justify-content-between no-gutters">
          {this.props.products.map((product) => (
            <SingleProduct product={product} key={product._id} />
          ))}
        </Row>
      </Container>
    );
  }
}

export default RandomShelf;
