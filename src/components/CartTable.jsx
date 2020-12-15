import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import ModalForm from "./ModalForm";

const url = "http://localhost:3001";

class CartTable extends Component {
  deleteProduct = async (id) => {
    try {
      let response = await fetch(
        `${this.url}carts/${this.cartID}/remove-to-cart/${_id}`,
        { method: "DELETE", "Content-Type": "application/json" }
      );
      if (response.ok) {
        // this.props.refetch();
      } else {
        alert("not ok");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Table striped bordered hover className="my-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Brand</th>
            <th>ImageUrl</th>
          </tr>
        </thead>
        <tbody>
          {this.props.products.map((product) => (
            <tr>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.brand}</td>
              <td>
                <img style={{ height: "50px" }} src={product.imageUrl} />
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => this.deleteProduct(product._id)}
                >
                  Delete
                </Button>
              </td>
              <td>
                {/* <ModalForm
                  product={product}
                  productId={product._id}
                  method={"PUT"}
                  handleAlert={this.props.handleAlert}
                /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default CartTable;
