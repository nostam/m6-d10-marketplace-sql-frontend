import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
import ModalForm from "../ModalForm";
import { Link } from "react-router-dom";

class ProductsTable extends Component {
  url = process.env.REACT_APP_API_URL;
  removeProduct = async (productId) => {
    try {
      const res = await fetch(`${this.url}/products/${productId}`, {
        method: "DELETE",
        headers: { origin: process.env.ORIGIN },
      });
      if (!res.ok) {
        const { errors } = await res.json();
        throw new Error(errors);
      }
      this.props.refetch();
    } catch (error) {
      console.log(error.message);
      this.setState({ errMsg: error.message });
    }
  };

  render() {
    return (
      <Table responsive className="p-5" size="sm">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Brand</th>
            <th>ProductImage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.products.map((product, index) => (
            <tr key={`product-table-${index}`}>
              <td>{product._id}</td>
              <td>
                <Link to={`/products/${product._id}`}>{product.name}</Link>
              </td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.brand}</td>
              <td>
                <img style={{ height: "100px" }} src={product.imageUrl} />
              </td>
              <td className="d-flex justify-content-around">
                <ModalForm
                  product={product}
                  productId={product._id}
                  refetch={this.props.refetch}
                  removeProduct={this.removeProduct}
                  handleAlert={this.props.handleAlert}
                />
                <Button
                  variant="outline-danger"
                  onClick={() => this.removeProduct()}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default ProductsTable;
