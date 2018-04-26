import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: ''
    };
  }

  onUsernameChange = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  onEmailChange = (event) => {
    this.setState({
      email: event.target.value
    });
  }

  onPasswordChange = (event) => {
    this.setState({
      password: event.target.value
    });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    if(this.state.username.length === 0 || this.state.email.length || this.state.password.length === 0) {
      return;
    }

    try {
      const response = await axios.post('/user/add-user', {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      });

      console.log('signup response', response.data);

      if(response.data.user_id && response.data.token) {
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('token', response.data.token);
        
        this.props.history.push('/main');
      }
    } catch(err) {
      console.log(err);
    }

  }

  render() {
    return (
      <div>
        <h3>Signup</h3>
        <form onSubmit={this.onSubmit}>
          <label>
            Username:
            <input type='text' name='username' onChange={this.onUsernameChange} />
          </label>
          <label>
            Email:
            <input type='text' name='email' onChange={this.onEmailChange} />
          </label>
          <label>
            Password:
            <input type='password' name='password' onChange={this.onPasswordChange} />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

export default Signup;
