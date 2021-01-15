import React from "react";
import { Badge } from "react-bootstrap";

const myBadge = (props) => {
  return (
    <Badge variant={props.color} className="d-flex align-items-center">
      {props.text}
    </Badge>
  );
};
export default myBadge;
