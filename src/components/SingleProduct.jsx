import React, { Component } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import MyBadge from "./MyBadge";
import { FaCartPlus } from "react-icons/fa";
export default class SingleProduct extends Component {
  url = "http://localhost:3001/";
  cartID = "5f6b1991df85440017160811";
  addToCart = async (_id) => {
    try {
      const response = await fetch(
        `${this.url}carts/${this.cartID}/add-to-cart/${_id}`,
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
    return (
      <div>
        <Col xs={12} md={6} xl={4} className="my-4">
          <Card style={{ width: "16rem" }}>
            <Card.Img
              variant="top"
              src={this.props.product.imageUrl}
              style={{ height: "300px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title className="text-truncate">
                {this.props.product.name}
              </Card.Title>
              <Row className="d-flex justify-content-between px-2">
                <MyBadge color="secondary" text={this.props.product._id} />
                <Button
                  variant="primary"
                  onClick={() => this.addToCart(this.props.product._id)}
                >
                  <FaCartPlus /> ${this.props.product.price}
                </Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </div>
    );
  }
}
