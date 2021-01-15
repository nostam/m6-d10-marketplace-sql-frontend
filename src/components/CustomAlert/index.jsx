import React from "react";
import { Alert } from "react-bootstrap";
const warning = (props) => {
  return (
    <Alert
      className="d-flex mx-auto justify-content-center"
      variant={props.variant}
    >
      {props.text}
    </Alert>
  );
};

export default warning;
