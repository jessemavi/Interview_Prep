import React, { Component } from 'react';
import axios from 'axios';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      answers: []
    }

    const getAllQuestionsAndAnswerChoices = async () => {
      try {
        const questionsAndAnswerChoices = await axios.get('/game/questions');
        console.log(questionsAndAnswerChoices.data);
        const questions = [];
        // go through questionsAndAnswerChoices and add data for each question in an object in the questions array
        questionsAndAnswerChoices.data.forEach((question) => {
          if(!questions[question.question_id]) {
            questions[question.question_id] = {
              question: question.question_content, 
              answer_choices: [question.question_choice_content], 
              correct_answer: question.correct_answer};
          } else {
            questions[question.question_id].answer_choices.push(question.question_choice_content);
          }
        });
        await this.setState({
          questions: questions,
          currentQuestion: 1
        });
        console.log(this.state);
      } catch(err) {
        console.log(err);
      }
    };

    getAllQuestionsAndAnswerChoices();
  }

  onQuestionsSubmit = (event) => {
    event.preventDefault();
    console.log('questions submitted with answers:');
  }

  render() {
    return (
      <div>
        <h2>Questions</h2>
        {this.state.questions.length > 0 ? 
          <div>
            <form onSubmit={this.onQuestionsSubmit}>
                <ol>
                {this.state.questions.map((question, index) => {
                  return (
                    <li key={index}>
                      <p>{question.question}</p>
                      {question.answer_choices.map((answer_choice, index) => {
                        return (
                          <div key={index}>
                            <input type='radio' />
                            <label>{answer_choice}</label><br></br>
                          </div>
                        );
                      })}
                    </li>
                  );
                })}
              </ol>
              <input type='submit' />
            </form>
          </div>
        : null}
      </div>
    );
  }
}

export default Questions;
