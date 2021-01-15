import React from "react";
// componentDidMount = async (this.props.asin) => {
//   try {
//     let response = await fetch(
//       "https://striveschool-api.herokuapp.com/api/comments/" + asin,
//       {
//         methood: "GET",
//         headers: {
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NjI5ZDk4MzViMDAwMTc1ODRlZTUiLCJpYXQiOjE2MDU3ODgzMTcsImV4cCI6MTYwNjk5NzkxN30.oP4BYUhxzJrIcZ0PWD68xETCimnePC7kIrswf4xirag",
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     let comment = await response.json();
//     console.log(comment); //call commentArea here
//   } catch (e) {
//     console.log("error!", e);
//   }
// };
class commentArea extends React.Component {
  render() {
    const asin = this.props.asin;
    return console.log("test", asin);
  }
}

export default commentArea;
