import React, { Component } from 'react';
import axios from 'axios';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: []
    }

    const getAllQuestions = async () => {
      try {
        const questions = await axios.get('/game/questions');
        console.log(questions);
        this.setState({
          questions: questions.data
        });
      } catch(err) {
        console.log(err);
      }
    };
    getAllQuestions();
  }

  render() {
    return (
      <div>
        <h2>Questions</h2>
        {this.state.questions.map((question, index) => {
          return (
            <p key={index}>{question.content}</p>
          );
        })}
      </div>
    );
  }
}

export default Questions;
