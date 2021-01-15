import React, { Component } from "react";
import { Row, Button } from "react-bootstrap";
export default class CustomPagination extends Component {
  render() {
    return (
      <Row className="d-flex justify-content-center">
        <Button
          variant="outline-primary"
          size="sm"
          name="prev"
          onClick={this.props.handlePagination}
        >
          Prev
        </Button>
        <Button
          variant="outline-primary"
          size="sm"
          name="next"
          onClick={this.props.handlePagination}
        >
          Next
        </Button>
      </Row>
    );
  }
}
