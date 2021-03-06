const { Client } = require('pg');
const connectionString = 'postgresql://localhost:5432/interview_prep';

const client = new Client({
  connectionString: connectionString
});

const connectToDB = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL interview_prep db');
  } catch(err) {
    console.log(err);
  }
};

connectToDB();

const createDBTables = () => {
  try {
    client.query(`
      drop table if exists questions cascade;
      drop table if exists question_choices;

      create table if not exists users (
        id serial primary key,
        username varchar unique not null,
        email varchar unique not null,
        password varchar not null,
        created_at timestamp default now() not null
      );

      create table if not exists questions (
        id serial primary key,
        question_content text unique not null,
        correct_answer text not null,
        category text not null
      );

      create table if not exists question_choices (
        id serial primary key,
        question_choice_content text not null,
        question_id integer references questions(id) not null
      );

      create table if not exists game_scores (
        id serial primary key,
        score integer not null,
        category text not null,
        user_id integer references users(id) not null
      );
    `);
  } catch(err) {
    console.log(err);
  }
}

createDBTables();

const addQuestionsAndAnswerChoices = () => {
  try {
    client.query(`
      insert into questions (question_content, correct_answer, category) values 
        ('What is the time complexity of merge sort?', 'O(n log n)', 'algorithms-and-data-structures'),
        ('When doing graph search, which search method uses a queue data structure?', 'Breadth First Search(BFS)', 'algorithms-and-data-structures'),
        ('When traversing a tree, which traversal visits both node''s children before the parent?', 'Postorder traversal', 'algorithms-and-data-structures'),
        ('What front-end framework/library has lifecycle methods?', 'React', 'javascript');

      insert into question_choices(question_choice_content, question_id) values
        ('O(1)', 1),
        ('O(n)', 1),
        ('O(log n)', 1),
        ('O(n log n)', 1),
        ('O(n^2)', 1),
        ('O(2^n)', 1),
        ('Depth First Search(DFS)', 2),
        ('Breadth First Search(BFS)', 2),
        ('Preorder traveral', 3),
        ('Inorder traversal', 3),
        ('Postorder traversal', 3),
        ('Angular', 4),
        ('Ember', 4),
        ('Vue', 4),
        ('React', 4),
        ('Backbone', 4); 
    `);
  } catch(err) {
    console.log(err);
  }
}

addQuestionsAndAnswerChoices();

module.exports = client;
