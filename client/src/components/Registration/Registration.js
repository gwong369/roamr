import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import "./Registration.css";
// import API from "../../Util/Api";
import axios from "axios";
// import postNewUser from "../../Util/Api";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstName: " ",
      lastName: " ",
      zipCode: " ",
      interests: " ",
      languages: " ",
      phoneNumber: " ",
      ambassador: false,
      errors: {}
    };
  }

  validateForm() {
    return this.state.email.length > 0 &&
    this.state.password.length > 0 &&
    this.state.firstName.length >0 &&
    this.state.lastName.length >0 &&
    this.state.zipCode.length >0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("clicked")
    const userData = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      zipCode: this.state.zipCode,
      interests: this.state.interests,
      languages: this.state.languages,
      phoneNumber: this.state.phoneNumber,
      ambassador: false,
      errors: {}
    }
      // log the user data entered
      console.log(userData);
      // post user data to database
      axios
        .post("/api/register", userData)
        //after posting, log the response
        .then(res => {
          // all the response information
          console.log(res);

          console.log(res.data);
          // window.location.href = '/profile';


        }).catch(function(err) {
          console.log(err)
          //console log if res data does not return
        });
        //redirects to the new user's profile on submit
        window.location.href = "/profile"
        //clears the registration form
        this.setState({
          email: '',
          firstName: '',
          lastName:'',
          password:'',
          phoneNumber:'',
          zipCode:'',
          interests:'',
          languages:''
        });
  }


  // front end elements rendered

  render() {
    return (
      <div className="Login">
        <img className="Logo" alt="roamr logo" src={"https://github.com/zorporate/final-project/blob/master/client/src/ROAMR-logo.png?raw=true"}/>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="firstName" bsSize="large">
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              autoFocus
              type="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="lastName" bsSize="large">
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              value={this.state.lastName}
              onChange={this.handleChange}
              type="lastName"
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="zipCode" bsSize="large">
            <ControlLabel>Zip Code</ControlLabel>
            <FormControl
              value={this.state.zipCode}
              onChange={this.handleChange}
              type="zipCode"
            />
          </FormGroup>
          <FormGroup controlId="interests" bsSize="large">
            <ControlLabel>Interests</ControlLabel>
            <FormControl
              value={this.state.interests}
              onChange={this.handleChange}
              type="interests"
            />
          </FormGroup>
          <FormGroup controlId="languages" bsSize="large">
            <ControlLabel>Languages</ControlLabel>
            <FormControl
              value={this.state.languages}
              onChange={this.handleChange}
              type="languages"
            />
          </FormGroup>
          <FormGroup controlId="phoneNumber" bsSize="large">
            <ControlLabel>Phone Number</ControlLabel>
            <FormControl
              value={this.state.phoneNumber}
              onChange={this.handleChange}
              type="phoneNumber"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
