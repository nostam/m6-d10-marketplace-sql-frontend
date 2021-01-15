import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
// import CommentArea from "./CommentArea";
import MyBadge from "../MyBadge";

class SingleProduct extends React.Component {
  render() {
    const book = this.props.book;
    return (
      <>
        {/* <Col xs={12} md={4} lg={3} xl={2} className="my-4" key={book.asin}> */}
        <Card
          className="m-2"
          style={{
            width: "12rem",
            border: "0",
            boxShadow: "1px 1px 4px rgba(0,0,0,0.25)",
          }}
          key={book.asin}
        >
          <Card.Img
            variant="top"
            src={book.img}
            style={{ height: "300px", objectFit: "cover" }}
          />
          <Card.Body className="p-2">
            <h6
              style={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
            >
              {book.title}
            </h6>
          </Card.Body>
          <Card.Footer className="py-1 px-3">
            <Row className="d-flex justify-content-between px-2">
              <MyBadge size="sm" text={book.category} color="" />
              <Button
                size="sm"
                value={book.asin}
                variant="outline-primary"
                onClick={this.props.onClick}
              >
                Buy @ ${book.price}
              </Button>
            </Row>
          </Card.Footer>
        </Card>
        {/* </Col> */}
      </>
    );
  }
}
export default SingleProduct;
