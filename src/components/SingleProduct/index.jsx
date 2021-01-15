import React, { Component } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
export default class SingleProduct extends Component {
  url = process.env.REACT_APP_API_URL;
  userId = "5f6b1991df85440017160811";
  addToCart = async (productId) => {
    try {
      const response = await fetch(
        `${this.url}/carts/${this.userId}/add-to-cart/${productId}`,
        { method: "POST", "Content-Type": "application/json" }
      );
      if (response.ok) {
        console.log("cart updated");
      } else {
        throw Error();
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      _id,
      name,
      description,
      brand,
      imageUrl,
      price,
      category,
    } = this.props.product;
    return (
      <div>
        <Col xs={12} md={6} xl={3} className="my-4">
          <Card style={{ width: "240px" }}>
            <Card.Img
              variant="top"
              src={imageUrl}
              style={{ height: "150px", objectFit: "cover" }}
            />
            <Card.Body className="m-0">
              <Card.Title className="text-truncate">
                {name}
                <h6>{brand}</h6>
              </Card.Title>
              <Link to={`/products/${_id}`}>
                <p>{description}</p>
              </Link>
              <Row className="d-flex justify-content-end px-2 ">
                <Button variant="primary" onClick={() => this.addToCart(_id)}>
                  <FaCartPlus /> ${price}
                </Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </div>
    );
  }
}
