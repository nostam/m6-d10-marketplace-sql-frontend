import React, { Component } from "react";
import { Row, Col, Card, CardColumns } from "react-bootstrap";
import { FaStarHalf, FaStar, FaRegStar } from "react-icons/fa";

export default class ProductDetails extends Component {
  state = { product: {} };
  url = process.env.REACT_APP_API_URL;
  getSingleProduct = async () => {
    try {
      const res = await fetch(
        `${this.url}/products/${this.props.match.params.id}`,
        { method: "GET", headers: { origin: process.env.ORIGIN } }
      );
      if (!res.ok) throw new Error(res);
      const data = res.json();
      // this.setState({ product });
    } catch (error) {
      console.log(error);
    }
  };
  handleStars = (rate) => {
    let stars = Array(5)
      .fill("")
      .map((rate) => <FaStar style={{ color: "#ffc107" }} />);
    for (let i = 0; i < 5 - Math.floor(rate / 2); i++) {
      stars.pop();
      stars.push(<FaRegStar style={{ color: "#grey" }} />);
    }
  };
  componentDidMount = () => {
    this.getSingleProduct();
  };
  render() {
    const { product } = this.state;
    return (
      <div>
        <Row>
          <Col md={4}>
            <img
              src={product.imageUrl}
              style={{ height: "300px", cover: "cover" }}
            />
          </Col>
          <Col md={8}>
            <h4>{product.name}</h4>
            <h5>{product.brand}</h5>
            <hr />
            <p>{product.descirption}</p>
            <p>{product.price}</p>
          </Col>
        </Row>
        <Row>
          <CardColumns>
            {product.reviews.map((review) => (
              <Card>
                <Card.Body>
                  <Card.Title>{review.rate} / 5</Card.Title>
                  <Card.Text>{review.comment}</Card.Text>
                  <Card.Text>
                    <small className="text-muted">
                      {new Date(review.createdAt).toDateString()}
                    </small>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </CardColumns>
        </Row>
      </div>
    );
  }
}
