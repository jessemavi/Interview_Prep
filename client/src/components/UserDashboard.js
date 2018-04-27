import React, { Component } from 'react';
import axios from 'axios';

class UserDashboard extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      userCategoryAverageScores: {}
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
          }
        );

        console.log('userScoresResponse', userScoresResponse.data);

        const userScoresForCategory = {};
        for(let i = 0; i < userScoresResponse.data.length; i++) {
          if(!userScoresForCategory[userScoresResponse.data[i]['category']]) {
            userScoresForCategory[userScoresResponse.data[i]['category']] = [userScoresResponse.data[i]['score']]
          } else {
            userScoresForCategory[userScoresResponse.data[i]['category']].push(userScoresResponse.data[i]['score']);
          }
        }

        const userAverageScores = {};
        for(let key in userScoresForCategory) {
          userAverageScores[key] = userScoresForCategory[key].reduce((a, b) => {
            return a + b; 
          }, 0) / userScoresForCategory[key].length;
        }

        console.log(userAverageScores);

        await this.setState({
          userInfo: {
            username: userScoresResponse.data[0]['username'],
            email: userScoresResponse.data[0]['email'],
            created_at: userScoresResponse.data[0]['created_at']
          },
          userCategoryAverageScores: userAverageScores
        });
        console.log('state in UserDashboard', this.state);
      } catch(err) {
        console.log(err);
      }
    };

    getUserScores();

  }
  
  render() {
    return (
      <div>
        <h3>User Profile</h3>
        <p>Username: {this.state.userInfo.username}</p>
        <p>Email: {this.state.userInfo.email}</p>
        <p>Joined: {this.state.userInfo.created_at}</p>

        <h3>Average Scores</h3>
        {Object.keys(this.state.userCategoryAverageScores).map((category) => {
          return (
            <p key={category}>{category} {this.state.userCategoryAverageScores[category]}</p>
          );
        })}

      </div>
    );
  }
}

export default UserDashboard;
