import React from "react";
import { Container, Spinner, Row, Button } from "react-bootstrap";

// import MyJumbotron from "./MyJumbotron";
// import RandomShelf from "../../components/RandomShelf";
import CustomAlert from "../../components/CustomAlert";
import CustomPagination from "../../components/CustomPagination";
import SingleProduct from "../../components/SingleProduct";
import services from "../../services";

class Home extends React.Component {
  state = {
    loading: true,
    links: "",
    products: [],
    newPost: [],
    errMsg: "",
  };
  url = process.env.REACT_APP_API_URL;
  cartID = "1";
  // handleDropdownCategory = category => {
  //   this.setState({
  //     products: products[category].slice(0, 6),
  //     selectedCategory: category,
  //   });
  // };

  handleProducts = async () => {
    services.getProducts((res) => {
      if (res.message) {
        this.setState({ errMsg: res.message });
      } else {
        setTimeout(
          () =>
            this.setState({
              products: res.products,
              links: res.links,
              loading: false,
            }),
          500
        );
      }
    });

    // try {
    //   const res = await fetch(
    //     `${process.env.REACT_APP_API_URL}/products?limit=15`,
    //     {
    //       method: "GET",
    //       headers: { origin: process.env.ORIGIN },
    //     }
    //   );
    //   if (!res.ok) {
    //     const { errors } = await res.json();
    //     throw new Error(errors);
    //   }
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }

    // try {
    //   let response;

    //   if (id) {
    //     response = await fetch("http://localhost:3001/products" + id, {
    //       method: "PUT",
    //       body: JSON.stringify(),
    //       headers: new Headers({
    //         "Content-Type": "application/json",
    //       }),
    //     });
    //   } else {
    //     response = await fetch("http://localhost:3001/products", {
    //       method: "POST",
    //       body: JSON.stringify(),
    //       headers: new Headers({
    //         "Content-Type": "application/json",
    //       }),
    //     });
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };
  handlePagination = async (e) => {
    console.log(this.state.links);
    console.log(this.state);
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
      console.log(res);
      const data = await res.json();
      this.setState({ products: data.products, links: data.links });
    } catch (error) {
      console.log(error.message);
      this.setState({ errMsg: error.message });
    }
  };

  handleCarts = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };
  componentDidMount = () => {
    this.handleProducts();
    // this.handleCarts();
  };

  render() {
    const { products, errMsg, loading, links } = this.state;
    return (
      <>
        <Container>
          {errMsg.length !== 0 && (
            <CustomAlert variant="danger" text={errMsg} />
          )}
          {/* <RandomShelf products={this.state.products} /> */}
          {loading ? (
            <h1
              className="row align-items-center justify-content-center"
              style={{ height: "80vh" }}
            >
              <Spinner animation="border" className="mr-2" />
              Loading...
            </h1>
          ) : (
            <>
              <Row>
                {products.map((product) => (
                  <SingleProduct product={product} key={product._id} />
                ))}
              </Row>
              {Object.keys(links) !== 0 && (
                <CustomPagination
                  links={links}
                  handlePagination={(e) => this.handlePagination(e)}
                />
              )}
            </>
          )}
        </Container>
      </>
    );
  }
}
export default Home;
