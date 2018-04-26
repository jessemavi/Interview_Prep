import React, { Component } from 'react';
import axios from 'axios';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: []
    }

    const getAllQuestionsAndAnswerChoices = async () => {
      try {
        const questionsAndAnswerChoices = await axios.post(`/game/questions/`,
        {
          category: this.props.match.params.category
        }, 
        {
          headers: {
            'Authorization': `JWT ${localStorage.getItem('token')}`
          }
        });
        // console.log(questionsAndAnswerChoices.data);
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
          questions: questions
        });
        // console.log('state after getAllQuestionsAndAnswerChoices:', this.state);
      } catch(err) {
        console.log(err);
      }
    };

    getAllQuestionsAndAnswerChoices();
  }

  onQuestionAnswerSelection = (questionIndex, answer) => {
    // console.log(questionIndex);
    // console.log(answer);
    const answerChoices = this.state.answers;
    answerChoices[questionIndex] = answer;
    this.setState({
      answers: answerChoices
    });
    console.log('state answers after selection', this.state.answers);
  }

  onQuestionsSubmit = async (event) => {
    event.preventDefault();
    // if number of answers don't match number of questions return and don't allow user to submit
    if(this.state.answers.length !== this.state.questions.length) {
      return;
    }
    // check selected answers with correct answers
    let score = 0;
    for(let i = 1; i < this.state.questions.length; i++) {
      if(!this.state.answers[i] && !this.state.questions[i]) {
        continue;
      }
      if(this.state.answers[i] === this.state.questions[i].correct_answer) {
        score++;
      }
    }

    // add to db
    try {
      console.log('making post request to add score');
      const addScoreResponse = await axios.post('/game/add-score', 
        {
          score: score,
          category: this.props.match.params.category,
          user_id: localStorage.getItem('user_id')
        },
        {
          headers: {
            'Authorization': `JWT ${localStorage.getItem('token')}`
          }
        }
      );
      console.log('addScoreResponse data', addScoreResponse.data);
      alert(`You answered ${addScoreResponse.data.score} questions correctly`);
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <h2>Questions</h2>
        {this.state.questions.length > 0 ? 
          <div>
            <form onSubmit={this.onQuestionsSubmit}>
                <ol>
                {this.state.questions.map((question, questionIndex) => {
                  return (
                    <li key={questionIndex}>
                      <p>{question.question}</p>
                      {question.answer_choices.map((answer_choice, answerChoiceIndex) => {
                        return (
                          <div key={answerChoiceIndex}>
                            <input 
                              type='radio' 
                              value={answer_choice} 
                              checked={answer_choice === this.state.answers[questionIndex]} 
                              onChange={this.onQuestionAnswerSelection.bind(this, questionIndex, answer_choice)} 
                            />
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
