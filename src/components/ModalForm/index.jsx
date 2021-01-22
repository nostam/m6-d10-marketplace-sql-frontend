import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
class ModalForm extends Component {
  state = {
    showModal: false,
    productDetails: this.props.product ? this.props.product : {},
  };
  url = process.env.REACT_APP_API_URL;
  onChangeHandler = (e) => {
    this.setState({
      productDetails: {
        ...this.state.productDetails,
        [e.target.id]: e.currentTarget.value,
      },
    });
  };

  updateProduct = async () => {
    const url = this.props.productId
      ? `${this.url}/products/${this.props.productId}`
      : this.url;
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(this.state.productDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        this.setState({ showModal: false });
        this.props.handleAlert(true, true);
        this.props.refetch();
      } else {
        this.setState({ showModal: false });
        this.props.handleAlert(false, true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <>
          <Button
            variant="outline-primary"
            onClick={() => {
              this.setState({ showModal: true });
              this.props.handleAlert(undefined, false);
            }}
          >
            Edit
          </Button>

          <Modal
            show={this.state.showModal}
            onHide={() => this.setState({ showModal: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.productDetails.name}
                    placeholder="Enter name"
                    id="name"
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control
                    type="text"
                    id="description"
                    placeholder="Enter Description"
                    value={this.state.productDetails.description}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Product Brand</Form.Label>
                  <Form.Control
                    type="text"
                    id="brand"
                    value={this.state.productDetails.brand}
                    placeholder="Enter Brand"
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Product price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter price"
                    id="price"
                    value={this.state.productDetails.price}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Product Image url</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Enter image url"
                    id="imageUrl"
                    value={this.state.productDetails.imageUrl}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer className="row justify-content-between mx-1">
              <Button
                variant="danger"
                type="submit"
                onClick={this.props.removeProduct}
              >
                Delete
              </Button>
              <Button variant="warning" onClick={() => this.updateProduct()}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    );
  }
}

export default ModalForm;
