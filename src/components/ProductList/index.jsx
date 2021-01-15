import React from "react";
import SingleProduct from "../../components/singleProduct";
import CommentArea from "../../components/CommentArea";
import { Row } from "react-bootstrap";
class BookList extends React.Component {
  state = {
    selectedID: null,
    books: [],
  };

  componentDidMount = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/books`);
    const jsonBooks = await response.json();
    this.setState({
      books: jsonBooks.slice(0, 12),
    });
  };

  render() {
    return (
      <>
        <Row className="m-5">
          {this.state.books.map((b) => (
            <singleProduct
              isSelected={false}
              book={b}
              onClick={() => this.setState({ selectedID: b.asin })}
              key={b.asin}
            />
          ))}
          {/* <CommentArea asin={this.state.selectedId} /> */}
        </Row>
      </>
    );
  }
}

export default BookList;
