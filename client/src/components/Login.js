import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
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

    if(this.state.email.length === 0 || this.state.password.length === 0) {
      return;
    }

    try {
      const response = await axios.post('/user/login', {
        email: this.state.email,
        password: this.state.password
      });
      console.log('login response', response.data);
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
        <h3>Login</h3>
        <form onSubmit={this.onSubmit}>
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

export default Login;
