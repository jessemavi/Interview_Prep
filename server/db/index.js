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

client.query(`
  drop table questions cascade;
  drop table question_choices;

  create table if not exists users (
    id serial primary key,
    username varchar unique not null,
    email varchar unique not null,
    password varchar not null,
    created_at timestamp default now() not null
  );

  create table if not exists questions (
    id serial primary key,
    content text unique not null,
    correct_answer text not null,
    category text not null
  );

  create table if not exists question_choices (
    id serial primary key,
    content text not null,
    question_id integer references questions(id) not null
  );

  create table if not exists game_scores (
    id serial primary key,
    score integer not null,
    user_id integer references users(id) not null
  );
`);

client.query(`
  insert into questions (content, correct_answer, category) values 
    ('What is the time complexity of merge sort?', 'O(n log n)', 'Sorting'),
    ('When doing graph search, which search method uses a queue data structure', 'Breadth First Search(BFS)', 'Graphs'),
    ('When traversing a tree, which traversal visits both node''s children before the parent?', 'Postorder traversal', 'Binary Trees');

  insert into question_choices(content, question_id) values
    ('O(1)', 1),
    ('O(n)', 1),
    ('O(log n)', 1),
    ('Depth First Search(DFS)', 2),
    ('Breadth First Search(BFS)', 2),
    ('Preorder traveral', 3),
    ('Inorder traversal', 3),
    ('Postorder traversal', 3);  
`);

module.exports = client;
