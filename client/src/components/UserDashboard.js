import React, { Component } from 'react';
import axios from 'axios';

class UserDashboard extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      userCategoryAverageScores: {}
    };

    const getUserInfo = async () => {
      try {
        const userInfo = await axios.post('/game/user-info', 
          {
            user_id: localStorage.getItem('user_id')
          },
          {
            headers: {
              'Authorization': `JWT ${localStorage.getItem('token')}`
            }
          }
        );

        // console.log('userInfo', userInfo.data);
        this.setState({
          username: userInfo.data.username,
          email: userInfo.data.username,
          created_at: userInfo.data.created_at
        });
      } catch(err) {
        console.log(err);
      }
    };

    const getUserScores = async () => {
      try {
        const userScoresResponse = await axios.post('/game/user-scores',
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
          userCategoryAverageScores: userAverageScores
        });
        console.log('state in UserDashboard', this.state);
      } catch(err) {
        console.log(err);
      }
    };

    getUserInfo();
    getUserScores();

  }
  
  render() {
    return (
      <div>
        <h3>User Profile</h3>
        <p>Username: {this.state.username}</p>
        <p>Email: {this.state.email}</p>
        <p>Joined: {this.state.created_at}</p>

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
