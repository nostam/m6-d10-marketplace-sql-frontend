import React, { Component } from "react";
import { Row, Col, Card, CardColumns, Button } from "react-bootstrap";
import {
  FaStarHalf,
  FaStar,
  FaRegStar,
  FaThermometerHalf,
} from "react-icons/fa";
import AddReview from "../../components/AddReview";
import ReviewModal from "../../components/ReviewModal";
export default class ProductDetails extends Component {
  state = { product: {}, showModal: false, reviewId: "" };
  url = process.env.REACT_APP_API_URL;
  productId = this.props.match.params.id;
  getSingleProduct = async () => {
    try {
      const res = await fetch(`${this.url}/products/${this.productId}`, {
        method: "GET",
        headers: { origin: process.env.ORIGIN },
      });
      if (!res.ok) throw new Error(res);
      const data = await res.json();
      this.setState({ product: data });
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
  showReviewModal = (e) => {
    this.setState({
      showModal: !this.state.showModal,
    });
    if (e) {
      this.setState({ method: e.target.name, reviewId: e.target.id });
    }
  };
  componentDidMount = () => {
    this.getSingleProduct();
  };
  render() {
    const { product, showModal, method, reviewId } = this.state;
    return (
      <div>
        {Object.keys(product).length !== 0 && (
          <Col lg={10} className="mx-auto my-5">
            <Row className="my-5">
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
              <ReviewModal
                reviewId={reviewId}
                method={method}
                show={showModal}
                onHide={() => this.showReviewModal()}
                product={product}
                refetch={() => this.getSingleProduct()}
              />
              <CardColumns>
                {product.reviews.map((review, index) => (
                  <Card key={`review-${index}`}>
                    <Card.Body>
                      <Card.Title>{review.rate} / 5</Card.Title>
                      <Card.Text>{review.comment}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex row justify-content-between mx-0 py-1 px-3">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        name="PUT"
                        id={review._id}
                        onClick={(e) => this.showReviewModal(e)}
                      >
                        Edit
                      </Button>
                      <div className="text-muted">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </Card.Footer>
                  </Card>
                ))}
              </CardColumns>
            </Row>
            <Col className="mx-auto">
              <Button
                variant="primary"
                name="POST"
                onClick={(e) => this.showReviewModal(e)}
              >
                Add review
              </Button>
            </Col>
          </Col>
        )}
      </div>
    );
  }
}
