import React from "react";

const today = new Date();
const time =
  today.getHours() +
  ":" +
  today.getMinutes() +
  ":" +
  today.getSeconds() +
  ":" +
  today.getMilliseconds();
const Footer = (props) => {
  return <p className="text-right">The page renders at {time}</p>;
};

export default Footer;
