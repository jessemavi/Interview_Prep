import React, { Component } from 'react';
import axios from 'axios';

class UserDashboard extends Component {
  constructor() {
    super();
    this.state = {
      userScores: []
    };

    const getUserScores = async () => {
      try {
        const userScoresResponse = await axios.post('/game/user-dashboard',
          {
            user_id: localStorage.getItem('user_id')
          }, 
          {
            headers: {
              'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        });
        // console.log('userScores', userScoresResponse.data);
        this.setState({
          userScores: userScoresResponse.data
        });
        console.log(this.state.userScores);
      } catch(err) {
        console.log(err);
      }
    };

    getUserScores();

  }
  
  render() {
    return (
      <div>
        <h3>User Dashboard</h3>
      </div>
    );
  }
}

export default UserDashboard;
