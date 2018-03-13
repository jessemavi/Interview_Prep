import React, { Component } from 'react';
import axios from 'axios';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: []
    }

    const getAllQuestionsAndAnswerChoices = async () => {
      try {
        const questionsAndAnswerChoices = await axios.get('/game/questions');
        console.log(questionsAndAnswerChoices.data);
        const questions = [];
        // go through questionsAndAnswerChoices and add data for each question in an object in the questions array
        questionsAndAnswerChoices.data.forEach((question) => {
          if(!questions[question.question_id]) {
            questions[question.question_id] = {question: question.question_content, answer_choices: [question.question_choice_content], correct_answer: question.correct_answer};
          } else {
            questions[question.question_id].answer_choices.push(question.question_choice_content);
          }
        });
        await this.setState({
          questions: questions
        });
        console.log(this.state);
      } catch(err) {
        console.log(err);
      }
    };

    getAllQuestionsAndAnswerChoices();
  }

  render() {
    return (
      <div>
        <h2>Questions</h2>
        {this.state.questions.map((question, index) => {
          return (
            <p key={index}>{question.question}</p>
          );
        })}
      </div>
    );
  }
}

export default Questions;
