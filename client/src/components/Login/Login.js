import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import "./Login.css";
// import request from 'request';
import axios from "axios";

 class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //makes sure something is entered in the form fields

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  //listens for any changes in the form fields

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.post('/api/login', {email: this.state.email, password: this.state.password}).then(function() {
      window.location.href = '/profile';
    });

  }

  // front end input elements for login

  render() {
    return (
      <div className="Login">
        <img className="Logo" alt="roamr logo" src={"https://github.com/zorporate/final-project/blob/master/client/src/ROAMR-logo.png?raw=true"}/>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
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
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
export default Login
