import React, { Component } from "react";
import {
  Container,
  Form,
  FormControl,
  Alert,
  Col,
  Button,
  FormFile,
} from "react-bootstrap";

export default class Registration extends Component {
  state = { isValid: false, alert: false, alertMsg: "", info: {} };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ alert: false, alertMsg: "" });
    this.state.isValid
      ? this.setState({ alert: true, alertMsg: "You have been fooled!" })
      : this.setState({ alert: true, alertMsg: "Incorrect Input" });
  };
  handleChange = (e) => {
    console.log("here is your info", this.state.info);
    this.setState({
      info: { ...this.state.info, [e.target.name]: e.target.value },
    });
    e.target.name === "creditCard" &&
    e.target.value.length >= 16 &&
    !isNaN(e.target.value)
      ? this.setState({ isValid: true, alert: false, alertMsg: "" })
      : e.target.value.length > 12 &&
        e.target.name === "creditCard" &&
        isNaN(e.target.value)
      ? this.setState({
          isValid: false,
          alert: true,
          alertMsg: "Credit Card format incorrect",
        })
      : this.setState({ alert: false, alertMsg: "" });
  };
  render() {
    return (
      <>
        <Container>
          {this.state.alert && (
            <Alert variant="danger" className="text-truncate" dismissible>
              {this.state.alertMsg}
            </Alert>
          )}
          <Form className="w-100 mb-5 text-white" onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="6">
                <Form.Label htmlFor="firstName">First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="FirstName"
                  id="firstName"
                  placeholder="First Name"
                  required
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label htmlFor="lastName">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="LastName"
                  id="lastName"
                  placeholder="Last Name"
                  required
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Label htmlFor="formBasicEmail">Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                required
                value={this.state.email}
                onChange={this.handleChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlfor="formBasicPassword">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                required
                value={this.state.pwd}
                onChange={this.handleChange}
              />
              <Form.Text id="passwordHelpBlock" muted>
                Must be 8-20 characters long.
              </Form.Text>
            </Form.Group>
            {/* <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group> */}
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <FormControl
                type="date"
                name="dateOfBirth"
                required
                value={this.state.dateOfBirth}
                onChange={this.handleChange}
              ></FormControl>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} md="7">
                <Form.Label htmlFor="streeAddress">Street Address</Form.Label>
                <Form.Control
                  type="text"
                  name="StreetAddress"
                  id="streeAddress"
                  placeholder="Street Address"
                  required
                  value={this.state.streeAddress}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="3">
                <Form.Label htmlFor="validationCity">City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  required
                  id="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="2">
                <Form.Label htmlFor="validationZipCode">Post Code</Form.Label>
                <Form.Control
                  type="text"
                  name="postcode"
                  placeholder="Postcode"
                  required
                  id="postCode"
                  value={this.state.postcode}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form>
              <Form.Group>
                <Form.Label htmlFor="creditCard">Credit Card</Form.Label>
                <Form.Control
                  type="text"
                  name="creditCard"
                  id="creditCard"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={this.state.creditCard}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
            {Object.keys(this.state.info).length > 8 && (
              <Button variant="info" type="Submit">
                Submit
              </Button>
            )}
          </Form>
        </Container>
      </>
    );
  }
}
