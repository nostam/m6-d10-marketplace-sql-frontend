import React, { Component } from "react";
import { Spinner, Container } from "react-bootstrap";
import CustomAlert from "../../components/CustomAlert";
import CustomPagination from "../../components/CustomPagination";
import ProductsTable from "../../components/ProductTable";
import services from "../../services";

export default class BackOffice extends Component {
  state = {
    products: [],
    errMsg: "",
    loading: true,
    showAlert: false,
    links: "",
  };

  handleProducts = async () => {
    await services.getProducts((res) => {
      if (res.message) {
        this.setState({ errMsg: res.message });
      }
      setTimeout(
        () =>
          this.setState({
            products: res.products,
            links: res.links,
            loading: false,
          }),
        500
      );
    });
  };

  handlePagination = async (e) => {
    console.log(this.state.links);
    const suffix = this.state.links[e.target.name];
    //TODO reuse
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}${suffix}`, {
        method: "GET",
        headers: { origin: process.env.ORIGIN },
      });
      if (!res.ok) {
        const { errors } = await res.json();
        throw new Error(errors);
      }
      const data = await res.json();
      this.setState({ products: data.products, links: data.links });
    } catch (error) {
      console.log(error.message);
      this.setState({ errMsg: error.message });
    }
  };

  handleAlert = (res, show) => {
    this.setState({ showAlert: show });

    if (res) {
      this.setState({ success: true });
    } else {
      this.setState({ success: false });
    }
  };

  componentDidMount = () => {
    this.handleProducts();
  };

  render() {
    const { products, errMsg, loading, links } = this.state;
    return (
      <>
        {errMsg.length !== 0 && <CustomAlert variant="danger" text={errMsg} />}
        {loading ? (
          <h1
            className="row align-items-center justify-content-center"
            style={{ height: "80vh" }}
          >
            <Spinner animation="border" className="mr-2" />
            Loading...
          </h1>
        ) : (
          <Container className="my-5">
            <ProductsTable
              products={products}
              refetch={this.handleProducts()}
              handleAlert={this.handleAlert}
            />
            {Object.keys(links) !== 0 && (
              <CustomPagination
                links={links}
                handlePagination={(e) => this.handlePagination(e)}
              />
            )}
          </Container>
        )}
      </>
    );
  }
}
