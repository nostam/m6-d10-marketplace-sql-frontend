import React, { Component } from "react";
import { Form, Button, Modal } from "react-bootstrap";
export default class ReviewModal extends Component {
  state = { review: {} };
  url = process.env.REACT_APP_API_URL + "/products";
  handleSubmitReview = async (option) => {
    const method = option === "DELETE" ? "DELETE" : this.props.method;
    // assume userid=1
    if (isNaN(this.state.review.userId))
      this.setState({ review: { ...this.state.review, userId: 1 } });
    if (isNaN(this.state.review.productId))
      this.setState({
        review: { ...this.state.review, productId: this.props.product._id },
      });
    try {
      let res = await fetch(
        `${this.url}/${this.props.product._id}/reviews${
          method !== "POST" ? "/" + this.props.reviewId : ""
        }`,
        {
          method: method,
          headers: {
            "content-type": "application/json",
            origin: process.env.REACT_APP_ORIGIN,
          },
          body: JSON.stringify(this.state.review),
        }
      );
      if (!res.ok) throw new Error();
      this.props.onHide();
      this.props.refetch();
    } catch (error) {
      console.log(error);
    }
  };
  getReview = async () => {
    try {
      let res = await fetch(
        `${this.url}/${this.props.product._id}/reviews/${this.props.reviewId}`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      this.setState({ review: data });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  handleReview = (e) => {
    this.setState({
      review: { ...this.state.review, [e.target.name]: e.target.value },
    });
    console.log(this.state.review);
  };
  componentDidMount = () => {
    if (this.props.method === "PUT") this.getReview();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.reviewId !== this.props.reviewId) this.getReview();
  };
  render() {
    const { method, show, onHide, product } = this.props;
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton={show}>
          <Modal.Title>
            Review for {product.name} {this.props.reviewId}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                name="rating"
                value={this.state.review.rating}
                onChange={(e) => this.handleReview(e)}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                name="comment"
                value={this.state.review.comment}
                rows={3}
                onChange={(e) => this.handleReview(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant={method === "PUT" ? "danger" : "secondary"}
            onClick={
              method === "PUT"
                ? () => this.handleSubmitReview("DELETE")
                : onHide
            }
          >
            {method === "PUT" ? "DELETE" : "Close"}
          </Button>
          <Button
            variant={method === "POST" ? "primary" : "warning"}
            onClick={() => this.handleSubmitReview()}
          >
            {method === "POST" ? "Submit" : "Save changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
